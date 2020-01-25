import React from 'react';
// import { Jumbotron } from 'react-bootstrap';
import SurveyResult from './SurveyResult';
import PrintSaveShare from "./PrintSaveShare";
import '../../CSS/ComponentStyle.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';



export default class CategoryResultsPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        taxonomy_name: this.props.match.params.taxonomy_name,
        services: [],
        organizations: [],
    }
  }
    componentDidMount() {
      var services_array = []
      console.log(this.state.taxonomy_name)
      this.state.taxonomy_name = "Work"
      console.log(this.state.taxonomy_name)
      var filter = "({taxonomy} = '" + this.state.taxonomy_name + "')"
      console.log(filter)
      this.props.database('services').select({
        fields: ["Organization", "address"],
        filterByFormula: filter,
        view: "Grid view",
      }).eachPage((services, fetchNextPage) => {
        // console.log(services.fields['Organization'])
        this.setState({
          services
        });
        console.log(services)
        // services.forEach(function(service) {
        //   console.log('Retrieved', service.get('id'));
        // });
        fetchNextPage();
      }, function done(error) {
        console.log(error);
      });
      // console.log(this.state.services)
      // services_array.map((service, index) =>
      //   this.props.database("organizations").select({

      //   })

      // )
  }
  render(){
    return (
      <div>
        <div className="jumbotron">
          <h4>{this.state.taxonomy_name} Results: </h4>
          <div id="printSaveShare">
            <PrintSaveShare />
          </div>
        </div>
        {this.state.organizations.length > 0 ? (
          this.state.organizations.map((organization, index) =>
            <div>
              <SurveyResult 
                agency_name = {organization.fields['name']} 
                agency_website = {organization.fields['url']}
                phone_number={organization.fields['phones']} 
                email={organization.fields['email']} 
                temp={""/*---------------------------------------------------------------------*/}
                address={organization.fields['locations']} 
                city={this.props.city} 
                state={this.props.state} 
                zip_code={this.props.zip_code}
                temp2={""/*--------Will need to query the location table for the address-------*/}
              />
              <br />
            </div>
          )
          ):("")
        }
      </div>
    );
  }
}
