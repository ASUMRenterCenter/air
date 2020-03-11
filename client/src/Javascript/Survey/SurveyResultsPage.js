import React from 'react';
// import SurveyResult from './SurveyResult';
import '../../CSS/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import PrintButton from '../../components/PrintButton'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Pdf from "react-to-pdf";
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"
import axios from "axios";

const ref = React.createRef();

var showWhat = "Show More";
function CustomToggle({ children, eventKey, agency_name, agency_website, thisClass}) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    if (showWhat === "Show More"){
      showWhat = "Show Less";
    } else {
      showWhat = "Show More";
    }
    thisClass.setState(previousState=>({
      showWhat: showWhat
    }));
  });

  return (
    <div>
      <div>
        <h5 style = {{float: "left"}}>{agency_name} : <a href={agency_website}>{agency_website}</a></h5>
      </div>
      <div>
        <Button
          type="button"
          variant="dark"
          style={{float: "right"}}
          onClick={decoratedOnClick}
        >
          {children}
        </Button>
      </div>
    </div>
  );
}



// function CustomToggle({ children, eventKey, agency_name, agency_website}) {
//     const decoratedOnClick = useAccordionToggle(eventKey, () =>
//       null,
//     );
  
//     return (
//       <div>
//         <div>
//           <h5 style = {{float: "left"}}>{agency_name} : <a href={agency_website}>{agency_website}</a></h5>
//         </div>
//         <div>
//           <Button
//             type="button"
//             variant="dark"
//             style={{float: "right"}}
//             onClick={decoratedOnClick}
//           >
//             {children}
//           </Button>
//         </div>
//       </div>
//     );
//   }
export default class SurveyResultsPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            tax_ids: [],
            html: [],
            continue: false,
            showWhat: "Show More"
        }
        this.handleInformation = this.handleInformation.bind(this);
        this.processInformation = this.processInformation.bind(this);
        this.returnInformation = this.returnInformation.bind(this);
        // this.handleTaxonomies = this.handleTaxonomies.bind(this);
    }

    handleInformation = async () => {
        console.log("Got to getTaxonomyIds");
        var url = window.location.href;
        var index = url.lastIndexOf("/");
        url = url.slice(index + 1, url.length);
        var tax_ids = url.split('$taxid=');
        
        for(let i = 0; i < tax_ids.length; i ++){
          if(tax_ids[i] === ""){
            tax_ids.splice(i, 1);
          }
        }
        tax_ids = [...new Set(tax_ids)]; // Ensure that values are unique
        const res = await axios.post("/SurveyResults/*", tax_ids);
        console.log("Res: ", res);
        return res;
    }

    processInformation = async () => {
        const infoArray = await this.handleInformation();
        const taxons = infoArray.data[0];
        const orgs = infoArray.data[1];
        const phone_nums = infoArray.data[2];
        const addrs = infoArray.data[3];
        
        let html = [];
		for(let i = 0; i < taxons.length; i++){
			let taxonomy_name = taxons[i];
			let address_num = addrs[i];
			let phone = phone_nums[i];
            let html_inner = [];
            let promise2;
            if(orgs[i] === null){
                html_inner = [...html_inner, <Accordion key ={taxonomy_name + "_child"}>
                    <Card>
                        <Card.Header>
                            <h6>No Results</h6>
                        </Card.Header>
                    </Card>
                </Accordion>];
            }
            else{
                promise2 = await orgs[i].map(async (org, index)=>{
                    let addr = address_num[index];
                    
                    html_inner = [...html_inner, <Accordion key ={org.id}>
                                                    <Card>
                                                        <Card.Header>
                                                            <CustomToggle eventKey="0" agency_name = {org.fields['name']} agency_website = {org.fields['url']} thisClass = {this}>{this.state.showWhat}</CustomToggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="0">
                                                            <Card.Body>
                                                                <p>Phone: {phone[index]}</p>
                                                                <p>Email: {org.fields['email']}</p>
                                                                <p>Address: {addr.fields['address_1']}, {addr.fields['city']}, {addr.fields['state']} {addr.fields['Zip Code']}</p>
                                                                <Button id='moreInfoButton' href={"/AgencyInfoPage/" + org.id} variant="dark"><p>View More Information</p></Button>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>];
                    
                });
                Promise.all(promise2);
            }
			
			let html_piece = (<div ref ={ref} key={taxonomy_name}>
							<div className="jumbotron">
								<h4>{taxonomy_name} Results: </h4>
								{html_inner}
							</div>
							</div>);
			html = [...html, html_piece];

		}
        return html;
    }
    returnInformation = async () => {
        console.log("Got to returnInformation");
		const html = await this.processInformation();
		this.setState(prevState => ({
			html: html,
			continue: true
		}));
		return html;
    }
	componentDidMount() {
		if (!this.state.continue) {
			console.log("Component Did Update");
            let html = this.returnInformation();

		}
	}


    render(){
        if(!this.state.continue){
            return <h1>Please Wait While We Gather Events!</h1>
        }
        else{
            return (
            <div ref={ref}>
                <div id="printSaveShare">                                      
                    <PrintButton id="printSaveShare"></PrintButton>
                    <Pdf targetRef={ref} filename="code-example.pdf">
                    {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
                    </Pdf>
                </div>
                {/* {this.getInformation()} */}
                {this.state.html}
                
            </div>
            );
        }
    }
}