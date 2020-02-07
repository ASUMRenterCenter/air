
import { Jumbotron } from 'react-bootstrap'
import '../CSS/ComponentStyle.css'
//import AgencyEditingFields from './AgencyEditingFields'
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

import {Col} from "react-bootstrap"
//import SaveChangesButton from "./SaveChangesButton.js"



export default class CreateOrganization extends Component { //FIXME should be agency creation
	constructor(props) {
		super(props);
		this.state = {
      organizationName: "",
      organizationDescription:"",
      organizationURL: "",
      organizationEmail: "",
      organizationID: "",
      organizationPhone: "",
      organizationRecord: [],

      organizationPhoneDescription: "",
      phoneRecord:[],


      contactName: "",
      contactTitle:"",
      contactDepartment:"",
      contactEmail: "",
      contactRecord: [],

      addressRecord: [],
      addressCity: "",
      addressRegion: "",
      addressState: "",
      addressZip: "",
      addressCountry: "",
      addressType: "Physical Address",
      address_1: "",
      addressLocations: [],

      serviceName:"",
      serviceAltName: "",
      serviceDescription: "",
      serviceAddress: "",
      serviceURL: "",
      serviceEmail: "",
      serviceTaxonomyName: "Emergency",
      serviceID: "90",

			locationRecord: [],
			locationName: "",
			locationID: "9999",
			locationAltName: "",
			locationDescription: "",
			locationTransportation: "",
			locationLatitude: "",
			locationLongitude: "",


			taxonomyRecords: [[], []],
			narrowing: [],
			testList: [1, 2, 3, 4, 5],
			taxonomyNames: [],


		}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.handleServiceTaxonomy = this.handleServiceTaxonomy.bind(this);
	}


  componentDidMount() {
		var taxonomyArray = [];
		this.props.database('taxonomy').select({
				filterByFormula: '{parent_id} = ""',
		    view: 'Grid view',
		}).firstPage((err, records) => {
		    if (err) { console.error(err); return; }
		    records.forEach((record) => {
		        console.log('Retrieved', record.get('name'));
						taxonomyArray.push(record);
		    });
		});
		var recordHolder = [[]];
		recordHolder[0] = taxonomyArray;
		//recordHolder[1] = taxonomyArray;

		setTimeout(() => {

			this.setState({
				taxonomyRecords: recordHolder,
			})
		}, 1000);
		setTimeout(() => {
			console.log(this.state.taxonomyRecords);
		}, 1500);
	}




  componentDidUpdate() {
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("taxonomy layer 1" + this.state.serviceTaxonomyName);
  }


	handleServiceTaxonomy(e){
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log("taxonomy layer 1" + this.state.serviceTaxonomyName);

		setTimeout(() =>{
			var newTaxonomyArray = [];
			this.props.database('taxonomy').select({
					filterByFormula: "({parent_id} = '" + this.state.serviceTaxonomyName + "')",
					view: 'Grid view',
			}).firstPage((err, records) => {
					if (err) { console.error(err); return; }
					records.forEach((record) => {
							console.log('Retrieved layer 2 ', record.get('name'));
							newTaxonomyArray.push(record);
					});
			});

			setTimeout(() => {
				var recordHolder = this.state.taxonomyRecords;
				console.log("Pre push the recordHolder =  " + recordHolder);
				recordHolder.push(newTaxonomyArray);
				console.log("post push the recordHolder =  " + recordHolder);
				console.log("Service Taxonomy ID: " + this.state.serviceTaxonomyName);

				this.setState({
					taxonomyRecords: recordHolder,
				})
				console.log(this.state.taxonomyRecords);
				console.log(recordHolder);
			}, 500);

		}, 100);

		setTimeout(() => {
			console.log(this.state.serviceTaxonomyName);
		}, 7000);

	}
//WARNING: ALWAYS USE ARROW => FUNCTIONS, or 'this' changes to UNDEFINED & STATE CANNOT BE ACCESSED
  handleSubmit(e) {

    this.props.database('organizations').create([
      {
        "fields": {
          "name": this.state.organizationName,
          "description": this.state.organizationDescription,
          "email": this.state.organizationEmail,
          "url": this.state.organizationURL,
        }
      },
    ],(err, records) => {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach((record) => {
        //console.log(record)
        this.setState({
          organizationRecord: record,
        })
      });
      console.log(this.state.organizationRecord.id);
    });


    //CREATING THE PHONES
    setTimeout(() => {
      this.props.database('phones').create([
        {
          "fields": {
            "number": this.state.organizationPhone,
            "description": this.state.organizationPhoneDescription,
            "organizations": [
              this.state.organizationRecord.id
            ],
          }
        },
      ], (err, records) => {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach((record) => {
          this.setState({
            phoneRecord: record
          })
        });
      });
      console.log(this.state.phoneRecord.id);
    }, 1000);


    //Creating the contact
    setTimeout(() => {
      this.props.database('contact').create([ //Note services must be done later
        {
          "fields": {
            "name": this.state.contactName,
            "organizations": [
              this.state.organizationRecord.id
            ],
            "title": this.state.contactTitle,
            "department": this.state.contactDepartment,
            "email": this.state.contactEmail,
            "phones": [
              this.state.phoneRecord.id
            ],
          }
        }
      ], (err, records) =>{
        if (err) {
          console.error(err);
          return;
        }
        records.forEach((record) => {
          this.setState({
            contactRecord: record
          })
        });
      });
      console.log(this.state.contactRecord.id);
    }, 2000);


    //Creating the address
    setTimeout(() => {
      this.props.database('address').create([ //Note services must be done later
        {
          "fields": {
            "address_1": this.state.address_1,
            "city": this.state.addressCity,
            "State": this.state.addressState,
            "Zip Code": this.state.addressZip,
            "region": this.state.addressRegion,
            "address_type-x": [
              this.state.addressType
            ]
          }
        }
      ], (err, records) =>{
        if (err) {
          console.error(err);
          return;
        }
        records.forEach((record) => {
          this.setState({
            addressRecord: record
          })
        });
      });
      console.log(this.state.addressRecord.id);
    }, 3000);

    //Creating the service entry
    //these if statements certain service info if its left blank
    setTimeout(() => {
      if(this.state.serviceURL == ""){
        this.setState({
          serviceAddress: this.state.organizationURL
        });
      }
      if(this.state.serviceEmail == ""){
        this.setState({
          serviceEmail: this.state.serviceEmail
        });
      }
      this.setState({
        serviceID: "90"
      })

      this.props.database('services').create([ ////FIXME: add taxonomy
        {
          "fields": {
            "Organization": [
              this.state.organizationRecord.id
            ],
            "Alternate Name": this.state.serviceAltName,
            "Description": this.state.serviceDescription,
            "url": this.state.serviceURL,
            "email": this.state.serviceEmail,
            "Name": this.state.serviceName,
            "id": this.state.serviceID,
            "phones": [
              this.state.phoneRecord.id
            ],
            "contacts": [
              this.state.contactRecord.id
            ]
          }
        }
      ], (err, records) =>{
        if (err) {
          console.error(err);
          return;
        }
        records.forEach((record) => {
          this.setState({
            serviceRecord: record
          })
        });
      });
      //console.log(this.state.serviceRecord.id);
    }, 4500);

		//Creating the location entry (needed to link service and address)
		setTimeout(() => {
			this.props.database('locations').create([
				{
				 "fields": {
					 "name": this.state.locationName,
					 "organization": [
						 this.state.organizationRecord.id
					 ],
					 "alternate_name": this.state.locationAltName,
					 "transportation": this.state.locationTransportation,
					 "latitude": this.state.locationLongitude,
					 "longitude": this.state.locationLongitude,
					 "description": this.state.locationDescription,
					 "services": [
						 this.state.serviceRecord.id
					 ],
					 "address": [
						 this.state.addressRecord.id
					 ],
					 "id": this.state.locationID
				 }
			 }
			], (err, records) =>{
				if (err) {
					console.error(err);
					return;
				}
				records.forEach((record) => {
					this.setState({
						locationRecord: record
					})
				});
			});
			//console.log(this.state.serviceRecord.id);
		}, 5000);

  }




  render() {
    return(
      <div className = "ServiceEditingChunk1">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Organization Name</Form.Label>
            <textarea
              type="organizationName"
              name="organizationName"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Organization Email</Form.Label>
            <textarea
              type="organizationEmail"
              name="organizationEmail"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Organization URL</Form.Label>
            <textarea
              type="organizationURL"
              name="organizationURL"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Organization Description</Form.Label>
            <textarea
              type="organizationDescription"
              name="organizationDescription"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Organization Phone</Form.Label>
            <textarea
              type="organizationPhone"
              name="organizationPhone"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Organization Phone Description</Form.Label>
            <textarea
              type="organizationPhoneDescription"
              name="organizationPhoneDescription"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Contact Name</Form.Label>
            <textarea
              type="contactName"
              name="contactName"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Contact Title</Form.Label>
            <textarea
              type="contactTitle"
              name="contactTitle"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Contact Department</Form.Label>
            <textarea
              type="contactDepartment"
              name="contactDepartment"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Contact Email</Form.Label>
            <textarea
              type="contactEmail"
              name="contactEmail"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Addrss Number and Street</Form.Label>
            <textarea
              type="address_1"
              name="address_1"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address City</Form.Label>
            <textarea
              type="addressCity"
              name="addressCity"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address Region</Form.Label>
            <textarea
              type="addressRegion"
              name="addressRegion"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address State</Form.Label>
            <textarea
              type="addressState"
              name="addressState"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address Zip</Form.Label>
            <textarea
              type="addressZip"
              name="addressZip"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address Country</Form.Label>
            <textarea
              type="addressCountry"
              name="addressCountry"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <label>
            Select Address Type --
            <select value={this.state.address} onChange={this.handleChange} name="addressType">
              <option value="Physical Address">Physical Address</option>
              <option value="Postal Address">Postal Address</option>
            </select>
          </label>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Service Name</Form.Label>
            <textarea
              type="serviceName"
              name="serviceName"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Service Alternate Name</Form.Label>
            <textarea
              type="serviceAltName"
              name="serviceAltName"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Service Description</Form.Label>
            <textarea
              type="serviceDescription"
              name="serviceDescription"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Service URL (if different from Organization)</Form.Label>
            <textarea
              type="serviceURL"
              name="serviceURL"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Service Email (if different from organization)</Form.Label>
            <textarea
              type="serviceEmail"
              name="serviceEmail"
              className="form-control"
              onChange={event => this.handleChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Please narrow down the taxonomy of the service</Form.Label>
						{(this.state.taxonomyRecords || []).map((recordSet, id) =>{
							return(
								<Form.Control key={id} as="select" name="serviceTaxonomyName" onChange={event => this.handleServiceTaxonomy(event)}>
									{(recordSet || []).map((record, key) => {
										return <option key={key} value={record.fields.id}>{record.fields.name}</option>;
									})}
								</Form.Control>
							)
						})}
          </Form.Group>
					<Form.Group controlId="exampleForm.ControlSelect1">
						<Form.Label>Select Location "Name"</Form.Label>
						<textarea
							type="locationName"
							name="locationName"
							className="form-control"
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Alternate Name</Form.Label>
						<textarea
							type="locationAltName"
							name="locationAltName"
							className="form-control"
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Description</Form.Label>
						<textarea
							type="locationDescription"
							name="locationDescription"
							className="form-control"
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Transportation</Form.Label>
						<textarea
							type="locationTransportation"
							name="locationTransportation"
							className="form-control"
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Latitude</Form.Label>
						<textarea
							type="locationLatitude"
							name="locationLatitude"
							className="form-control"
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Location Longitude</Form.Label>
						<textarea
							type="locationLongitude"
							name="locationLongitude"
							className="form-control"
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
        </Form>

        <button
          onClick={event => this.handleSubmit(event)}
          className="btn btn-dark"
          type="button"
        >
          Submit Info (Warning, Cannot be undone)
        </button>
      </div>
    )
	}

}

function refreshPage(){
  window.location.reload(true);
}
