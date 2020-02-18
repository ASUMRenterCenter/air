import React from 'react';
// import { Jumbotron } from 'react-bootstrap';
import SurveyResult from './SurveyResult';
import PrintSaveShare from "../CategoryResults/PrintSaveShare";
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
        tax_html_done: false
        // last_indices: [],
        // 


        // names_checked: false,
        // taxonomies_html: [],
        // should_update: false,
        // finished: false
    }
    this.renderTaxonomy = this.renderTaxonomy.bind(this);
    this.renderOrganization = this.renderOrganization.bind(this);
  }
  
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
      // Set Taxonomy Names and set the tax_ids as well as ensuring that ids are set
      for(let i = 0; i < tax_ids.length; i ++){
        this.props.database('taxonomy').find(tax_ids[i], (err, record) => {
            if(i === (tax_ids.length - 1)){
              this.setState(previousState => ({
                tax_names: [...previousState.tax_names, record.fields['name']],
                // taxonomies_html: [...this.state.taxonomies_html, <div className="jumbotron" key={record.id} id={record.fields['name']}>
                //               <h4>{record.fields['name']} Results: </h4>
                //               <div id="printSaveShare">
                //                   <PrintButton id="printSaveShare"></PrintButton>
                //                   <Pdf targetRef={ref} filename="code-example.pdf">
                //                     {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
                //                   </Pdf>
                //               </div>
                //               <div id={record.fields['name']}>

                //               </div>
                //             </div>
                // ],
                tax_ids: tax_ids,
                check_point: true
              }))
            }
            else{
              this.setState(previousState => ({
                tax_names: [...previousState.tax_names, record.fields['name']],
                // taxonomies_html: [...this.state.taxonomies_html, <div className="jumbotron" key={record.id}>
                //               <h4>{record.fields['name']} Results: </h4>
                //               <div id="printSaveShare">
                //                   <PrintButton id="printSaveShare"></PrintButton>
                //                   <Pdf targetRef={ref} filename="code-example.pdf">
                //                     {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
                //                   </Pdf>
                //               </div>
                //               <div id={record.fields['name']}>

                //               </div>
                //             </div>
                // ],
              }))
            }
            if (err) { console.error(err); return; }
            var filter = "({taxonomy} = '" + this.state.tax_names[i] + "')"
            this.props.database('services').select({
              fields: ["id", "Organization", "address", "taxonomy"],
              filterByFormula: filter,
              view: "Grid view",
            }).eachPage((services, fetchNextPage) => {
              for (let j = 0; j < services.length; j++){
                this.props.database('organizations').find(services[j].fields["Organization"], (err, organization) => {
                  this.props.database('address').find(services[j].fields["address"], (err, address) => {
                    this.renderOrganization(record.fields['name'], address, organization)
                    this.setState(previousState => ({
                      addresses: [...this.state.addresses, address],
                      addr_length: this.state.addr_length + 1
                    }));
                  });

                  this.setState(previousState => ({
                      organizations: [...this.state.organizations, organization],
                      org_length: this.state.org_length + 1
                  }));

                });
              }
              if(services.length > 0){
                this.setState(previousState => ({
                  services: [...this.state.services, ...services],
                }));  
              }
              fetchNextPage();
            });
        });
      }


      
      // console.log("GOTHERE")
      // alert("GOTHERE")
      
      // for(let i=0; i < this.state.tax_names.length; i ++){
      //   console.log(i)
      //   var filter = "({taxonomy} = '" + this.state.tax_names[i] + "')"
      //   console.log(filter)
      //   this.props.database('services').select({
      //     fields: ["id", "Organization", "address"],
      //     filterByFormula: filter,
      //     view: "Grid view",
      //   }).eachPage((services, fetchNextPage) => {
      //     if(i === (this.state.tax_names.length -1)){
      //       console.log("Got Here")
            
      //       this.setState(previousState => ({
      //         services: [...this.state.services, ...services],
      //         services_set: true,
      //         check_point: "organizations"
      //       }));
      //     }
      //     else if(i !== (this.state.tax_names.length -1)){
      //       this.setState(previousState => ({
      //         services: [...this.state.services, ...services],
      //       }));
      //     }
      //     fetchNextPage();
      //   }, function done(error) {
      //   });
      // }
      
      // this.setState(prevState => ({
      //   tax_ids: tax_ids,
      //   ids_set: true
      // }));

      // for(let i = 0; i < tax_ids.length; i++){
      //   if(tax_ids[i] !== ""){
      //     // array_length += 1
      //     this.props.database('taxonomy').find(tax_ids[i], (err, record) => {
      //       if (err) { console.error(err); return; }
      //       console.log(this.state.names.length + "!==" + (tax_ids.length - 2))
      //       if(this.state.names.length !== (tax_ids.length - 2)){
      //         this.setState(previousState => ({
      //           names: [...previousState.names, record.fields['name']],
      //           // array_length: previousState.array_length + 1
      //         }));
      //         var filter = "({taxonomy} = '" + record.fields['name'] + "')"
      //         this.props.database('services').select({
      //           fields: ["id", "Organization", "address"],
      //           filterByFormula: filter,
      //           view: "Grid view",
      //         }).eachPage((services, fetchNextPage) => {
      //           this.setState(previousState => ({
      //             services: [...this.state.services, ...services]
      //           }));
      //           // this.forceUpdate()
      //           for (let i = 0; i < services.length; i++){
      //             console.log("Got Here")
      //             this.props.database('organizations').find(services[i].fields["Organization"], (err, organization) => {
      //               if (err) { 
      //                 console.error(err); 
      //                 return; 
      //               }
      //               else if (!err){
      //                 this.setState(previousState => ({
      //                     organizations: [...previousState.organizations, organization],
      //                 }));
      //                 if(typeof services[i].fields["address"] !== "undefined"){ 
      //                   if (err) { 
      //                     return; 
      //                   }
      //                   else {
      //                     this.props.database('address').find(services[i].fields["address"], (err, address) => {
      //                       var address_dict = {
      //                         address: address.fields["address_1"],
      //                         city: address.fields["city"],
      //                         state: address.fields["State"],
      //                         zip_code: address.fields["Zip Code"],
      //                       };
      //                       this.setState(previousState => ({
      //                         addresses: [...previousState.addresses, address_dict],
      //                         finished: true
      //                       }, (error) => {
      //                         alert(error);
      //                         this.setState(previousState => ({
      //                           finished: true,
      //                           addresses: [...previousState.addresses, address],
                                
      //                         }));
      //                       }));
      //                     });
      //                   }
      //                 }
      //                 else if(typeof services[i].fields["address"] !== "undefined") {
      //                   var address = {
      //                       address: "Not Available",
      //                       city: "Not Available",
      //                       state: "Not Available",
      //                       zip_code: "Not Available",
      //                   };
      //                   this.setState(previousState => ({
      //                     finished: true,
      //                     addresses: [...previousState.addresses, address],
                          
      //                   }, (error) => {
      //                     alert(error);
      //                     this.setState(previousState => ({
      //                       finished: true,
      //                       addresses: [...previousState.addresses, address],
                            
      //                     }));
      //                   }));
      //                 }
      //               }
      //             });
                  
      //           }

      //           fetchNextPage();
      //         }, function done(error) {
      //         });
      //       }
      //       else {
      //         this.setState(previousState => ({
      //           names: [...previousState.names, record.fields['name']],
      //           should_update: true
                
      //         }));
      //       }
      //   })
      //   }
      //   else{
      //   }
      // }
  }
  componentDidUpdate(){
    // if(this.state.ids_set && !this.state.services_set){
    if(this.state.size_of_addr !== this.state.addr_length){
      this.setState(previousState => ({
        size_of_addr: this.state.addr_length,
        isready: true,
        tax_html_done: false
      }));
    }
    if(this.state.check_point && (this.state.size_of_addr === this.state.addr_length)){
      if(!this.state.tax_html_done){
        this.renderTaxonomy(this.state.tax_names, this.state.addresses, this.state.organizations)

      }
      if(!this.state.isready && this.state.tax_html_done){
        this.setState(previousState => ({
          isready: true
        }));
      }

    }
    // let end_index = 0;
    // // console.log("Services: " + this.state.services[0])
    // console.log(this.state.organizations)
    // if(this.state.should_update){    
    //   if(!this.state.names_checked){

    //     this.renderTaxonomy(this.state.names, this.state.organizations, this.state.addresses);
    //     this.setState(previousState => ({
    //       names_checked: true
    //     }))
    //   }
    // }
    // if(this.state.addresses.length > 0){
    //   this.setState({
    //     finished: true,
    //   });
    // }
    
    
  }

  renderTaxonomy(names, address, organization){
    let index = 0;
    for (let i = 0; i < names.length; i++){
      console.log(i)
      let array = [];
      for(let j = 0; j < this.state.org_html; j++){
        if(this.state.org_html[j][names[i]] !== undefined){
          array.push(this.state.org_html[j][names[i]]);
          console.log("GOTHERE")
        }
        console.log("OTHER: " + this.state.org_html[j][names[i]])
        console.log(array)
      }
      if(i === names.length - 1){
        this.setState(previousState => ({
          name_html: [...this.state.name_html, <div className="jumbotron" key={i + this.state.tax_ids[i]} id={names[i]}>
                              <h4>{names[i]} Results: </h4>
                              <div id="printSaveShare">
                                  <PrintButton id="printSaveShare"></PrintButton>
                                  <Pdf targetRef={ref} filename="code-example.pdf">
                                    {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
                                  </Pdf>
                              </div>
                              <div>
                                {array}
                              </div>
                            </div>
          ],
          tax_html_done: true
        }));
      }
      else{
        this.setState(previousState => ({
          name_html: [...this.state.name_html, <div className="jumbotron" key={i + this.state.tax_ids[i]} id={names[i]}>
                              <h4>{names[i]} Results: </h4>
                              <div id="printSaveShare">
                                  <PrintButton id="printSaveShare"></PrintButton>
                                  <Pdf targetRef={ref} filename="code-example.pdf">
                                    {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
                                  </Pdf>
                              </div>
                              <div>
                                {array}
                              </div>
                            </div>
          ]
        }));
      }
      
    }
  }

  // taxonomies = []
  renderOrganization(name, address, organization) {
    console.log(organization.fields['id'])
    this.setState(previousState=>({
      org_html: [...this.state.org_html, {name: <div key={"organization_"+organization.fields['id']}>
                  {console.log("ID: " +organization.fields['id'] + " NAME of Tax: " + name)}
                  <SurveyResult 
                    database = {this.props.database}
                    agency_id = {organization.id}
                    agency_name = {organization.fields['name'] === undefined ? "Not available" : organization.fields['name']} 
                    agency_website = {organization.fields['url'] === undefined ? "Website Not Available" : organization.fields['url']}
                    phone_number={organization.fields['phones'] === undefined ? "Phone Number Not Available" : organization.fields['phones']} 
                    email={organization.fields['email'] === undefined ? "Email Not Available" : organization.fields['email']} 
                    address={typeof address.fields['address'] === "undefined" ? "Street Not Available" :address.fields['address']} 
                    city={typeof address.fields['city'] === "undefined" ? "City Not Available" :address.fields['city']} 
                    state={typeof address.fields['state'] === "undefined" ? "State Not Available" :address.fields['state']} 
                    zip_code={typeof address.fields['zip_code'] === "undefined" ? "Zip Code Not Available" :address.fields['zip_code']}
                  />
                  <br />
                </div>}]
    }));
                                                
    // {organizations.length > 0 ? (
    //   organizations.map((organization, index) =>
    //     <div key={organization.fields['id']}>
    //       {console.log("ID: " +organization.fields['id'])}
    //       <SurveyResult 
    //         database = {this.props.database}
    //         agency_id = {organization.id}
    //         agency_name = {organization.fields['name'] === undefined ? "Not available" : organization.fields['name']} 
    //         agency_website = {organization.fields['url'] === undefined ? "Website Not Available" : organization.fields['url']}
    //         phone_number={organization.fields['phones'] === undefined ? "Phone Number Not Available" : organization.fields['phones']} 
    //         email={organization.fields['email'] === undefined ? "Email Not Available" : organization.fields['email']} 
    //         address={typeof addresses[index] === "undefined" ? "Street Not Available" :addresses[index]['address']} 
    //         city={typeof addresses[index] === "undefined" ? "City Not Available" :addresses[index]['city']} 
    //         state={typeof addresses[index] === "undefined" ? "State Not Available" :addresses[index]['state']} 
    //         zip_code={typeof addresses[index] === "undefined" ? "Zip Code Not Available" :addresses[index]['zip_code']}
    //       />
    //       <br />
    //     </div>
    //   )
    //   ):(null)
    // }
  }
    
    
  // };

  render(){
    if(!this.state.isready){
      return null
    }
    else{
      return (
        <div ref={ref}>
          {this.state.name_html}
         </div>
      );
    }
  }
}
