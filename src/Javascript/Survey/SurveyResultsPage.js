import React from 'react';
// import { Jumbotron } from 'react-bootstrap';
import SurveyResult from './SurveyResult';
import '../../CSS/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import PrintButton from '../../components/PrintButton'
import Pdf from "react-to-pdf";
import Button from "react-bootstrap/Button"

const ref = React.createRef();
export default class SurveyResultsPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        tax_ids: [],
        tax_names: [],
        end_indices: [],
        services: [],
        check_point: false,
        organizations: [],
        addr_length: 0,
        size_of_addr: 0,
        addresses: [],
        isready: false,
        name_html: [],
        org_html: [],
        tax_html_done: false,
        org_indices: [],
        size_of_html: 0
    }
    // this.renderTaxonomy = this.renderTaxonomy.bind(this);
    this.renderOrganization = this.renderOrganization.bind(this);
  }
    org_array = [];
    organizations = [];
    componentDidMount() {
      var url = window.location.href;
      var index = url.lastIndexOf("/");
      url = url.slice(index + 1, url.length);
      var tax_ids = url.split('$taxid=');
      
      for(let i = 0; i < tax_ids.length; i ++){
        if(tax_ids[i] === ""){
          tax_ids.splice(i, 1)
        }
      }
      for(let i = 0; i < tax_ids.length; i ++){
        this.props.database('taxonomy').find(tax_ids[i], (err, record) => {
          // console.log("NAME: " + record.fields['name'])
            // if(i === (tax_ids.length - 1)){
            //   this.setState(previousState => ({
            //     tax_names: [...previousState.tax_names, record.fields['name']],
            //     tax_ids: tax_ids,
            //     check_point: true,
            //   }))
            // }
            // else{
            //   this.setState(previousState => ({
            //     tax_names: [...previousState.tax_names, record.fields['name']],
                
            //   }))
            // }
            if (err) { console.error(err); return; }
            var filter = "({taxonomy} = '" + record.fields['name'] + "')"
            // console.log("FILTER: " + filter)
            this.props.database('services').select({
              fields: ["id", "Organization", "address", "taxonomy"],
              filterByFormula: filter,
              view: "Grid view",
            }).eachPage((services, fetchNextPage) => {
              if(services.length === 0){
                // console.log(record.fields['name'])
                this.setState(previousState => ({
                  org_html: [...this.state.org_html,
                    <div className="jumbotron" key={record.id}>
                      <h4>{record.fields['name']} Results: </h4>
                    <div id="printSaveShare">
                      
                        <PrintButton id="printSaveShare"></PrintButton>
                        <Pdf targetRef={ref} filename="code-example.pdf">
                          {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
                        </Pdf>
                    </div>
                    </div>]
                }))
              }
              //for (let j = 0; j < services.length; j++){
              services.map((service, index) => {
                this.props.database('organizations').find(service.fields["Organization"], (err, organization) => {
                //this.props.database('organizations').find(services[j].fields["Organization"], (err, organization) => {
                  // console.log(index)
                  // let index = j.valueOf();
                  this.organizations.push(organization);
                })
                  this.props.database('address').find(service.fields["address"], (err, address) => {
                    console.log("Index: " + index)
                    console.log(this.organizations)
                    if(this.organizations[index] !== undefined){
                    this.org_array.push(<SurveyResult 
                                      key={this.organizations[index].id + index}
                                      database = {this.props.database}
                                      agency_id = {this.organizations[index].id}
                                      agency_name = {this.organizations[index].fields['name'] === undefined ? "Not available" : this.organizations[index].fields['name']} 
                                      agency_website = {this.organizations[index].fields['url'] === undefined ? "Website Not Available" : this.organizations[index].fields['url']}
                                      phone_number={this.organizations[index].fields['phones'] === undefined ? "Phone Number Not Available" : this.organizations[index].fields['phones']} 
                                      email={this.organizations[index].fields['email'] === undefined ? "Email Not Available" : this.organizations[index].fields['email']} 
                                      address={typeof address.fields['address_1'] === "undefined" ? "Street Not Available" :address.fields['address_1']} 
                                      city={typeof address.fields['city'] === "undefined" ? "City Not Available" :address.fields['city']} 
                                      state={typeof address.fields['State'] === "undefined" ? "State Not Available" :address.fields['State']} 
                                      zip_code={typeof address.fields['Zip Code'] === "undefined" ? "Zip Code Not Available" :address.fields['Zip Code']}
                                    />);
                    // console.log("j: " + j)
                    // console.log("ORG ARRAY for " + record.fields['name'] + " is " + this.org_array);
                    // this.renderOrganization(record.fields['name'], address, organization, j)
                    console.log("length of services: " + services.length)
                    if(index === services.length - 1){
                      
                      this.setState(previousState=>({
                        org_html: [...this.state.org_html, <div key={this.organizations[0].id}>
                                                              <div className="jumbotron">
                                                                <h4>{record.fields['name']} Results: </h4>
                                                                <div id="printSaveShare">
                                                                    <PrintButton id="printSaveShare"></PrintButton>
                                                                    <Pdf targetRef={ref} filename="code-example.pdf">
                                                                      {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
                                                                    </Pdf>
                                                                </div>
                                                                
                                                              </div>
                                                                {[...this.org_array]}
                                                          </div>
                                    ],
                        
                      }));
                      this.organizations = [];
                      this.org_array = []
                    }
                    else{
                      // this.setState(previousState=>({
                      //   org_html: [...this.state.org_html, 
                      //               <div key={organization.id + index}> 
                      //               <SurveyResult 
                      //                 database = {this.props.database}
                      //                 agency_id = {organization.id}
                      //                 agency_name = {organization.fields['name'] === undefined ? "Not available" : organization.fields['name']} 
                      //                 agency_website = {organization.fields['url'] === undefined ? "Website Not Available" : organization.fields['url']}
                      //                 phone_number={organization.fields['phones'] === undefined ? "Phone Number Not Available" : organization.fields['phones']} 
                      //                 email={organization.fields['email'] === undefined ? "Email Not Available" : organization.fields['email']} 
                      //                 address={typeof address.fields['address_1'] === "undefined" ? "Street Not Available" :address.fields['address_1']} 
                      //                 city={typeof address.fields['city'] === "undefined" ? "City Not Available" :address.fields['city']} 
                      //                 state={typeof address.fields['State'] === "undefined" ? "State Not Available" :address.fields['State']} 
                      //                 zip_code={typeof address.fields['Zip Code'] === "undefined" ? "Zip Code Not Available" :address.fields['Zip Code']}
                      //               /></div>],
                        
                      // }));
                    }
                    // this.setState(previousState => ({
                    //   addresses: [...this.state.addresses, address],
                    //   addr_length: this.state.addr_length + 1
                    // }));
                  }});

                  // this.setState(previousState => ({
                  //     organizations: [...this.state.organizations, organization],
                  //     org_length: this.state.org_length + 1
                  // }));

                // });
              //}
              })
              if(services.length > 0){
                // this.setState(previousState => ({
                //   services: [...this.state.services, ...services],
                // }));  
              }
              fetchNextPage();
            });
        });
      }

  }
  componentDidUpdate(){
    if(this.state.size_of_html !== this.state.org_html.length){
      console.log(this.state.org_html.length)
      this.setState(previousState => ({
        size_of_html: this.state.org_html.length
      }))
    }
    // if(this.state.size_of_addr !== this.state.addresses.length){
    //   this.setState(previousState => ({
    //     size_of_addr: this.state.addresses.length,
    //     isready: true,
    //     tax_html_done: false
    //   }));
    // }
    // if(this.state.check_point && (this.state.size_of_addr === this.state.addresses.length)){
    //   if(!this.state.tax_html_done){
    //     this.renderTaxonomy(this.state.tax_names, this.state.addresses, this.state.organizations)

    //   }
    //   if(!this.state.isready && this.state.tax_html_done){
    //     this.setState(previousState => ({
    //       isready: true
    //     }));
    //   }

    // }    
    
  }
  
  // renderTaxonomy(names, address, organization){
  //   let index = 0;
  //   for (let i = 0; i < names.length; i++){
  //     console.log("Length of dictionary: " + Object.keys(this.state.org_html).length);
  //     console.log("Name: " + names[i])
  //     let keys = Object.keys(this.state.org_html);
  //     console.log("KEYS: " + keys);
  //     for(let key = 0; key < keys.length; key++){
  //       console.log("GOT HERE");
  //       console.log("Key: " + keys[key])
  //       if(keys[key].includes(names[i])){
  //         console.log(this.state.org_html[keys[key]])
  //         org_array.push(this.state.org_html[keys[key]]);
  //       }
  //     }
  //     console.log("ORG ARRAY: " + org_array[0]);
  //     if(i === names.length - 1){
  //       this.setState(previousState => ({
  //         name_html: [...this.state.name_html, <div className="jumbotron" key={i + this.state.tax_ids[i]} id={names[i]}>
  //                             <h4>{names[i]} Results: </h4>
  //                             <div id="printSaveShare">
  //                                 <PrintButton id="printSaveShare"></PrintButton>
  //                                 <Pdf targetRef={ref} filename="code-example.pdf">
  //                                   {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
  //                                 </Pdf>
  //                             </div>
  //                             <div>
  //                               {[...org_array]}
  //                             </div>
  //                           </div>
  //         ],
  //         tax_html_done: true
  //       }));
  //     }
  //     else{
  //       this.setState(previousState => ({
  //         name_html: [...this.state.name_html, <div className="jumbotron" key={i + this.state.tax_ids[i]} id={names[i]}>
  //                             <h4>{names[i]} Results: </h4>
  //                             <div id="printSaveShare">
  //                                 <PrintButton id="printSaveShare"></PrintButton>
  //                                 <Pdf targetRef={ref} filename="code-example.pdf">
  //                                   {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
  //                                 </Pdf>
  //                             </div>
  //                             <div>
  //                               {[...org_array]}
  //                             </div>
  //                           </div>
  //         ]
  //       }));
  //     }  
  //   }
  // }

  renderOrganization(name, address, organization, index) {
    console.log("RAN AGAIN")
    if(index === 0){
      this.setState(previousState=>({
        org_html: [...this.state.org_html, <div key={organization.id + index}><div className="jumbotron">
                  <h4>{name} Results: </h4>
                  <div id="printSaveShare">
                      <PrintButton id="printSaveShare"></PrintButton>
                      <Pdf targetRef={ref} filename="code-example.pdf">
                        {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
                      </Pdf>
                  </div>
                  </div>
                    <div > 
                    <SurveyResult 
                      database = {this.props.database}
                      agency_id = {organization.id}
                      agency_name = {organization.fields['name'] === undefined ? "Not available" : organization.fields['name']} 
                      agency_website = {organization.fields['url'] === undefined ? "Website Not Available" : organization.fields['url']}
                      phone_number={organization.fields['phones'] === undefined ? "Phone Number Not Available" : organization.fields['phones']} 
                      email={organization.fields['email'] === undefined ? "Email Not Available" : organization.fields['email']} 
                      address={typeof address.fields['address_1'] === "undefined" ? "Street Not Available" :address.fields['address_1']} 
                      city={typeof address.fields['city'] === "undefined" ? "City Not Available" :address.fields['city']} 
                      state={typeof address.fields['State'] === "undefined" ? "State Not Available" :address.fields['State']} 
                      zip_code={typeof address.fields['Zip Code'] === "undefined" ? "Zip Code Not Available" :address.fields['Zip Code']}
                    /></div></div>],
        
      }));
    }
    else{
      this.setState(previousState=>({
        org_html: [...this.state.org_html, 
                    <div key={organization.id + index}> 
                    <SurveyResult 
                      database = {this.props.database}
                      agency_id = {organization.id}
                      agency_name = {organization.fields['name'] === undefined ? "Not available" : organization.fields['name']} 
                      agency_website = {organization.fields['url'] === undefined ? "Website Not Available" : organization.fields['url']}
                      phone_number={organization.fields['phones'] === undefined ? "Phone Number Not Available" : organization.fields['phones']} 
                      email={organization.fields['email'] === undefined ? "Email Not Available" : organization.fields['email']} 
                      address={typeof address.fields['address_1'] === "undefined" ? "Street Not Available" :address.fields['address_1']} 
                      city={typeof address.fields['city'] === "undefined" ? "City Not Available" :address.fields['city']} 
                      state={typeof address.fields['State'] === "undefined" ? "State Not Available" :address.fields['State']} 
                      zip_code={typeof address.fields['Zip Code'] === "undefined" ? "Zip Code Not Available" :address.fields['Zip Code']}
                    /></div>],
        
      }));
    }
    
  }

  render(){
    if(this.state.size_of_html !== this.state.org_html.length){
      return null
    }
    else{
      return (
        <div ref={ref}>
          {this.state.org_html}
         </div>
      );
    }
  }
}
