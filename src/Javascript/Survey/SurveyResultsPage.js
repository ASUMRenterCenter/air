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
        size_of_html: 0,
        num_services: 0,
    }
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

            if (err) { console.error(err); return; }
            var filter = "({taxonomy} = '" + record.fields['name'] + "')"
            this.props.database('services').select({
              fields: ["id", "Organization", "address", "taxonomy"],
              filterByFormula: filter,
              view: "Grid view",
            }).eachPage((services, fetchNextPage) => {
              if(services.length === 0){
                this.setState(previousState => ({
                  services: [...this.state.services, record.fields['name']]
                  // org_html: [...this.state.org_html,
                  //   <div className="jumbotron" key={record.id}>
                  //     <h4>{record.fields['name']} Results: </h4>
                  //   <div id="printSaveShare">
                      
                  //       <PrintButton id="printSaveShare"></PrintButton>
                  //       <Pdf targetRef={ref} filename="code-example.pdf">
                  //         {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
                  //       </Pdf>
                  //   </div>
                  //   </div>]
                }))
              }
              services.map((service, index) => {
                this.props.database('organizations').find(service.fields["Organization"], (err, organization) => {
                  this.props.database('address').find(service.fields["address"], (err, address) => {
                    if(organization.id !== undefined){
                      this.setState(previousState => ({
                        num_services: tax_ids.length,
                        services: [...this.state.services, record.fields['name']],
                        addresses: [...this.state.addresses, {[address]:service}],
                        organizations: [...this.state.organizations, {[organization]:service}]
                      }))
                    }
                  // this.organizations.push(organization);
                    
                });
                })
                  // this.props.database('address').find(service.fields["address"], (err, address) => {
                  //   this.setState(previousState => ({
                  //     addresses: [...this.previousState, {address:service}]
                  //   }))
                  //   console.log("Index: " + index)
                  //   if(this.organizations[index] !== undefined){
                  //   this.org_array.push(<SurveyResult 
                  //                     key={this.organizations[index].id + index}
                  //                     database = {this.props.database}
                  //                     agency_id = {this.organizations[index].id}
                  //                     agency_name = {this.organizations[index].fields['name'] === undefined ? "Not available" : this.organizations[index].fields['name']} 
                  //                     agency_website = {this.organizations[index].fields['url'] === undefined ? "Website Not Available" : this.organizations[index].fields['url']}
                  //                     phone_number={this.organizations[index].fields['phones'] === undefined ? "Phone Number Not Available" : this.organizations[index].fields['phones']} 
                  //                     email={this.organizations[index].fields['email'] === undefined ? "Email Not Available" : this.organizations[index].fields['email']} 
                  //                     address={typeof address.fields['address_1'] === "undefined" ? "Street Not Available" :address.fields['address_1']} 
                  //                     city={typeof address.fields['city'] === "undefined" ? "City Not Available" :address.fields['city']} 
                  //                     state={typeof address.fields['State'] === "undefined" ? "State Not Available" :address.fields['State']} 
                  //                     zip_code={typeof address.fields['Zip Code'] === "undefined" ? "Zip Code Not Available" :address.fields['Zip Code']}
                  //   />);
                  //   console.log(this.org_array)
                  //   if(index === services.length - 1){
                      
                  //     this.setState(previousState=>({
                  //       org_html: [...this.state.org_html, <div key={this.organizations[0].id}>
                  //                                             <div className="jumbotron">
                  //                                               <h4>{record.fields['name']} Results: </h4>
                  //                                               <div id="printSaveShare">
                  //                                                   <PrintButton id="printSaveShare"></PrintButton>
                  //                                                   <Pdf targetRef={ref} filename="code-example.pdf">
                  //                                                     {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
                  //                                                   </Pdf>
                  //                                               </div>
                                                                
                  //                                             </div>
                  //                                               {[...this.org_array]}
                  //                                         </div>
                  //                   ],
                  //     }));
                  //     this.organizations = [];
                  //     this.org_array = []
                  //   }

                  // }
                // });

              })
              fetchNextPage();
            });
        });
      }

  }
  componentDidUpdate(prevProps, prevState){
    if(this.state.services.length > 0 && ((this.state.services.length === this.state.num_services) && !this.state.isready)){
      console.log("GOT HERE")
      console.log(this.state.num_services)
      console.log(this.state.services)
        this.state.services.map((service, index) => {
          var temp_array = [];
          var init = -1;
          for(let i = 0; i < this.state.organizations.length; i++){
            console.log(Object.keys(this.state.organizations[i])[0])
            if(Object.values(this.state.organizations[i]).includes(service)){
              var org_key = Object.keys(this.state.organizations[i])[0]
              var addr_key = Object.keys(this.state.addresses[i])[0]
              console.log(this.state.organizations[i][org_key].id)
              console.log(org_key)
              console.log(addr_key)
              temp_array.push(<SurveyResult 
                                key={this.state.organizations[i][org_key].id + index}
                                database = {this.props.database}
                                agency_id = {this.state.organizations[i][org_key].id}
                                agency_name = {this.state.organizations[i][org_key].fields['name'] === undefined ? "Not available" : this.state.organizations[i][org_key].fields['name']} 
                                agency_website = {this.state.organizations[i][org_key].fields['url'] === undefined ? "Website Not Available" : this.state.organizations[i][org_key].fields['url']}
                                phone_number={this.state.organizations[i][org_key].fields['phones'] === undefined ? "Phone Number Not Available" : this.state.organizations[i][org_key].fields['phones']} 
                                email={this.state.organizations[i][org_key].fields['email'] === undefined ? "Email Not Available" : this.state.organizations[i][org_key].fields['email']} 
                                address={typeof this.state.addresses[i][addr_key].fields['address_1'] === "undefined" ? "Street Not Available" :this.state.addresses[i][addr_key].fields['address_1']} 
                                city={typeof this.state.addresses[i][addr_key].fields['city'] === "undefined" ? "City Not Available" :this.state.addresses[i][addr_key].fields['city']} 
                                state={typeof this.state.addresses[i][addr_key].fields['State'] === "undefined" ? "State Not Available" :this.state.addresses[i][addr_key].fields['State']} 
                                zip_code={typeof this.state.addresses[i][addr_key].fields['Zip Code'] === "undefined" ? "Zip Code Not Available" :this.state.addresses[i][addr_key].fields['Zip Code']}
              />);
              // temp_org_array.push(Object.keys(this.state.organizations[0])[0]);
              // temp_addr_array.push(Object.keys(this.state.addresses[0])[0]);
            }
            if ((i === (this.state.organizations.length - 1)) && temp_array.length === 0){
              console.log("Got Here")
              this.setState(previousState => ({
                org_html: [...previousState.org_html, <div className="jumbotron" key={i}>
                                                    <h4>{service} Results: </h4>
                                                    <div id="printSaveShare">
                                                            
                                                      <PrintButton id="printSaveShare"></PrintButton>
                                                        <Pdf targetRef={ref} filename="code-example.pdf">
                                                        {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
                                                        </Pdf>
                                                    </div>
                                                  </div>]
              }))
            }
            if(i === this.state.organizations.length - 1){
              this.setState(previousState => ({
                org_html: [...previousState.org_html, <div className="jumbotron" key={i}>
                                                    <h4>{service} Results: </h4>
                                                    <div id="printSaveShare">
                                                            
                                                      <PrintButton id="printSaveShare"></PrintButton>
                                                        <Pdf targetRef={ref} filename="code-example.pdf">
                                                        {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
                                                        </Pdf>
                                                    </div>
                                                    <div>
                                                      {[...temp_array]}
                                                    </div>
                                                  </div>]
              }))
              
            }
          }
          if(index === this.state.services.length - 1){
            this.setState(previousState => ({
              isready: true
            }))
          }
          else {
  
          }
          
        });
  
      }
      // if(this.state.size_of_html !== this.state.org_html.length){
      //   console.log(this.state.org_html.length)
      //   this.setState(previousState => ({
      //     size_of_html: this.state.org_html.length
      //   }))
      // }
  
      
  }

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
    // if(this.state.size_of_html !== this.state.org_html.length){
    //   return null
    // }
    // else{
    //   return (
    //     <div ref={ref}>
    //       {this.state.org_html}
    //      </div>
    //   );
    // }
    if(!this.state.isready){
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
