import { Jumbotron } from "react-bootstrap";
import "../CSS/ComponentStyle.css";
import AgencyEditingFields from "./AgencyEditingFields";
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import SaveChangesButton from "./SaveChangesButton.js";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"


export default class AgencyEditPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			organization: [],
			organizationName: "",
			organizationDescription: "",
			organizationEmail: "",
			organizationURL: "",

			org_update: false,
			notListed: "NOT LISTED",

			phoneRecords: [],
			phoneNumbers: [],
			phoneDescriptions: [],

			serviceRecords: [],
			serviceNames: [],
			serviceDescriptions: [],
			serviceTaxonomies: [],
			serviceAltNames: [],
			serviceLocations: [],
			serviceURLs: [],
			serviceEmails: [],

			taxonomyRecords: [[], []],
			taxonomyIDValues: [[], []],




		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNumberChange = this.handleNumberChange.bind(this);
		this.deleteEntry = this.deleteEntry.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.createPhoneRecord = this.createPhoneRecord.bind(this);
		this.handleServiceNameChange = this.handleServiceNameChange.bind(this);
		this.handleServiceDescriptionChange = this.handleServiceDescriptionChange.bind(this);
		this.handleServiceTaxonomy = this.handleServiceTaxonomy.bind(this);
		this.deleteTaxonomy = this.deleteTaxonomy.bind(this);
	}

	componentDidMount() {

		//RETRIEVING ORGANIZATION RECORD
		this.props.database('organizations').find('recgRmL5hpzXrhUHI', (err, record) => {
		    if (err) { console.error(err); return; }
		    //console.log('Retrieved', record.id);
				this.setState({
					organization: record,
					serviceTaxonomies: [[record, record], [record, record]] //TAXONOMY PLACEHOLDER TO AVOID GLITCHES
				})
		});

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


		//RETRIEVING THE PHONE RECORD(S)
		setTimeout(() => {
			console.log("ID GOING IN IS: " + this.state.organization.fields.name);
			var phonesArray = [];
			this.props.database('phones').select({
					filterByFormula: '{organizations} = "' + this.state.organization.fields.name +'"',
			    view: 'Grid view',
			}).firstPage((err, records) => {
			    if (err) { console.error(err); return; }
			    records.forEach((record) => {
			        console.log('Retrieved Phone: ', record.get('number'));
							phonesArray.push(record);
			    });
			});

			setTimeout(() => {
				console.log("Phones array" + phonesArray);
				this.setState({
					phoneRecords: phonesArray,
				})
			}, 2000);
		}, 1000);
		//END OF GETTING PHONE RECORDS ////////////////////////////////////////////

		//RETRIEVE SERVICE RECORDS: //////////////////////////////////////////////
		setTimeout(() => {
			//console.log("ID GOING IN IS: " + this.state.organization.fields.name);
			var servicesArray = [];
			this.props.database('services').select({
					filterByFormula: '{organization} = "' + this.state.organization.fields.name +'"',
					view: 'Grid view',
			}).firstPage((err, records) => {
					if (err) { console.error(err); return; }
					records.forEach((record) => {
							console.log('Retrieved service', record.get('Name'));
							servicesArray.push(record);
					});
			});

			setTimeout(() => {
				console.log(servicesArray);
				this.setState({
					serviceRecords: servicesArray, ///FIXME: ARE WE KEEPING RECORDS OR ID NUMBERS??????
				})
			}, 2000);
		}, 2000);

		//Retrieve Service Taxonomies /////////////////////////////////////////////
		setTimeout(() => {
			console.log("Even accessing the service stuff?");
			var allTax = [];
			var taxonomyArray = [];
			for (let i = 0; i < this.state.serviceRecords.length; i++){
				console.log(this.state.serviceRecords[i].fields.Name + " at index " + i)
				allTax.push([]);
				taxonomyArray = [];
				console.log("Taxonomy Array at iteration " + i);
				console.log(allTax);
				this.props.database('taxonomy').select({
						filterByFormula: '{services 2} = "' + this.state.serviceRecords[i].fields.id +'"',
						view: 'Grid view',
				}).firstPage((err, records) => {
						if (err) { console.error(err); return; }
						records.forEach((record) => {
								console.log('Retrieved taxonomy', record.get('name'), 'at ' + i);
								allTax[i].push(record);
						});
						//allTax.push(taxonomyArray);
				});
			}
			setTimeout(() => {
				console.log("Alltax here");
				console.log(allTax);
				this.setState({
					serviceTaxonomies: allTax
				})
			}, 1000);
		}, 5000);





		//CHECK FOR J-DOG /////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////
		if (this.props.isJordan) {
			this.setState({
				org_edit_name: this.props.match.params.org_edit_name,
				org_edit_id: this.props.match.params.org_edit_id
			});
		}
	}

	/*
  componentDidMount(){
    this.props.database('organizations').find('recgRmL5hpzXrhUHI', (err, record) => {
      if (err) { console.error(err); return; }
      console.log('Retrieved', record);
      this.setState(previousState => ({
        organization: record
      }));
    });
    console.log(this.state.organization);
  }
*/

	componentDidUpdate() {
		//console.log(this.state.organization);
		//console.log(this.state.phoneRecords);
		//console.log(this.state.organization.id);

		if (
			this.state.organization != [] &&
			!this.state.org_update &&
			this.state.phoneRecords.length > 0 &&
			this.state.serviceRecords.length > 0
		) {
			console.log("Reaching inside the didUpdate if")
			var phoneNumArray = [];
			var phoneDescArray = [];
			for (let i = 0; i < this.state.phoneRecords.length; i++){
				phoneNumArray[i] = this.state.phoneRecords[i].fields.number;
				phoneDescArray[i] = this.state.phoneRecords[i].fields.description;
			}
			var serviceNamesArray = [];
			var serviceDescriptionsArray = [];
			var serviceTaxonomiesArray = [];
			var serviceAltNamesArray = [];
			var serviceLocationsArray = [];
			var serviceEmailsArray = [];
			var serviceURLsArray = [];
			for (let i = 0; i < this.state.serviceRecords.length; i++){
				serviceNamesArray[i] = this.state.serviceRecords[i].fields.Name;
				serviceDescriptionsArray[i] = this.state.serviceRecords[i].fields.Description;
				serviceTaxonomiesArray[i] = this.state.serviceRecords[i].fields.taxonomy;
				serviceAltNamesArray[i] = this.state.serviceRecords[i].fields.Alternate_Name;
				serviceLocationsArray[i] = this.state.serviceRecords[i].fields.locations;
				serviceEmailsArray[i] = this.state.serviceRecords[i].fields.email;
				serviceURLsArray[i] = this.state.serviceRecords[i].fields.url;
			}

			/*setTimeout(() => {
				console.log(allTax);
			}, 2000);*/

			this.setState({
				org_update: true,
				organizationName: this.state.organization.fields["name"],
				organizationDescription: this.state.organization.fields[
					"description"
				],
				organizationEmail: this.state.organization.fields["email"],
				organizationURL: this.state.organization.fields["url"],
				phoneNumbers: phoneNumArray,
				phoneDescriptions: phoneDescArray,
				serviceNames: serviceNamesArray,
				serviceDescriptions: serviceDescriptionsArray,
				//serviceTaxonomies: taxonomyPlaceHolder,
				serviceAltNames: serviceAltNamesArray,
				serviceURLs: serviceURLsArray,
				serviceEmails: serviceEmailsArray,
			});
		} /*else if (
			this.state.organization.length > 0 &&
			!this.state.org_update &&
			this.state.phones.length == 0
		) {
			this.setState({
				organizationName: this.state.organization[0].fields["name"],
				organizationDescription: this.state.organization[0].fields[
					"description"
				],
				organizationEmail: this.state.organization[0].fields["email"],
				organizationURL: this.state.organization[0].fields["url"],
				org_update: true
			});
		}*/

		setTimeout(() => {
			//console.log(this.state.organizationName);
			//console.log(this.state.organizationEmail);
			//console.log(this.state.organizationURL);
			//console.log(this.state.organizationDescription);
			//console.log(this.state.phoneNumbers);
			//console.log(this.state.phoneDescriptions)

			//console.log(this.state.serviceNames);
			//console.log(this.state.serviceURLs);
			console.log(this.state.serviceTaxonomies);
		}, 1000);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		//console.log(e.target);
	}

	handleNumberChange(e, index) {
		var newHolder = this.state.phoneNumbers;
		newHolder[index] = e.target.value;
		this.setState({
			phoneNumber: newHolder
		})

		console.log(this.state.phoneNumbers);
	}

	handleDescriptionChange(e, index) {
		var newHolder = this.state.phoneDescriptions;
		newHolder[index] = e.target.value;
		this.setState({
			phoneDescriptions: newHolder
		})

		console.log(this.state.phoneDescriptions);
	}

	handleServiceNameChange(e, index){
		var newHolder = this.state.serviceNames;
		newHolder[index] = e.target.value;
		this.setState({
			serviceNames: newHolder
		})
		//console.log(this.state.serviceNames);
	}

	handleServiceDescriptionChange(e, index){
		var newHolder = this.state.serviceDescriptions;
		newHolder[index] = e.target.value;
		this.setState({
			serviceDescriptions: newHolder
		})
		console.log(this.state.serviceDescriptions);
	}

	/*handleServiceTaxonomy(e, serviceIndex, taxonomyIndex){
		console.log("Service Taxonomy Information: ")
		console.log(serviceIndex);
		console.log(taxonomyIndex);
		var taxonomyHolder = this.state.serviceTaxonomies;
		taxonomyHolder[serviceIndex][taxonomyIndex] = e.target.value;
		this.setState({
			serviceTaxonomies: taxonomyHolder
		});
		console.log("taxonomy layer 1" + this.state.serviceTaxonomies[serviceIndex][taxonomyIndex]);
	}*/

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
				if (newTaxonomyArray.length > 0){
					recordHolder.push(newTaxonomyArray);
				}
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



	deleteEntry(type, index){
		this.props.database(type).destroy([this.state.phoneRecords[index].id], function(err, deletedRecords) {
		  if (err) {
		    console.error(err);
		    return;
		  }
		  console.log('Deleted', deletedRecords.length, 'records');
		});
		//console.log(this.state.phoneRecords[index].id);
		setTimeout(function() {
			refreshPage();
		}, 100);
	}


	deleteTaxonomy(serviceIndex, taxonomyIndex){
		console.log("State of service taxonomies going into funciton vvv THE INDEXES: " + serviceIndex + taxonomyIndex);
		console.log(this.state.serviceTaxonomies);

		var holder = this.state.serviceTaxonomies;
		holder[serviceIndex].splice(taxonomyIndex, 1)
		console.log("what holder makes: ");
		console.log(holder);
		this.setState({
			serviceTaxonomies: holder
		})

	}




	///CREATIONS HERE ////////////////////////////////////////////////////////////////////////////////////////////
	//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
	createPhoneRecord(){
		this.props.database('phones').create([
			{
				"fields": {
					"number": this.state.notListed,
					"description": this.state.notListed,
					"organizations": [
						this.state.organization.id
					],
				}
			},
		], (err, records) => {
			if (err) {
				console.error(err);
				return;
			}
		});
		//console.log(this.state.phoneRecord.id);
		setTimeout(function() {
			refreshPage();
		}, 100);
	}




	handleSubmit(e) {
		this.props.database("organizations").update(
			[
				{
					id: this.state.organization.id,
					fields: {
						name: this.state.organizationName,
						description: this.state.organizationDescription,
						email: this.state.organizationEmail,
						url: this.state.organizationURL
					}
				}
			],
			function(err, records) {
				if (err) {
					console.error(err);
					return;
				}
				records.forEach(function(record) {
					//console.log(record.get('name'));
				});
			}
		);
		this.setState({
			org_update: false
		});


		if (this.state.phoneRecords.length > 0) {
			for (let i =0; i < this.state.phoneRecords.length; i++){
				console.log(this.state.phoneRecords);
				this.props.database("phones").update(
					[
						{
							id: this.state.phoneRecords[i].id,
							fields: {
								number: this.state.phoneNumbers[i],
								description: this.state.phoneDescriptions[i],
							}
						}
					],
					function(err, records) {
						if (err) {
							console.error(err);
							return;
						}
						records.forEach(function(record) {
							console.log(record.get("name"));
						});
					}
				);
			}
			this.setState({
				org_update: false
			});
		}
		/*
		if (this.state.services.length > 0) {
			this.props.database("services").update(
				[
					{
						id: this.state.services[0].id,
						fields: {
							Organization: ["recWEXDhZDpPr36Ek"],
							locations: ["rec1QUbpNJHrbd8nJ"],
							"Alternate Name": "Group",
							Description: this.state.serviceDescriptions[0],
							url: "https://andre.net",
							email: "Granville.Gottlieb@hotmail.com",
							phones: [this.state.organizationPhone],
							contacts: ["rec2tTrUmjaS5m9EU"],
							taxonomy: ["recPFDS4Fa62egAJN"],
							Name: this.state.serviceNames[0]
						}
					}
				],
				function(err, records) {
					if (err) {
						console.error(err);
						return;
					}
					records.forEach(function(record) {
						console.log(record.get("id"));
					});
				}
			);
		} */

		setTimeout(function() {
			refreshPage();
		}, 100);
	}

	render() {
		return (
			<div className ="outermost">
				<div className="container mt-3">
					<OrgEditFields
						{...this.state.organization.fields}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
					/>
				</div>
				<div className="container mt-3">
					{this.state.phoneRecords.length > 0
						? this.state.phoneRecords.map((phones, index) => (
								<div className="container mt-3" key={index}>
									<PhoneEditFields
										{...phones.fields}
										index = {index}
										handleNumberChange={this.handleNumberChange}
										handleDescriptionChange={this.handleDescriptionChange}
										handleSubmit={this.handleSubmit}
										deleteEntry={this.deleteEntry}
									/>
								</div>
							))
						: ""}
						<button
							onClick={event => this.createPhoneRecord()}
							className="btn btn-dark"
							type="button"
						>
							Create New Phone Record
						</button>
				</div>
				<div>
				{this.state.serviceRecords.length > 0
					? this.state.serviceRecords.map((services, index) => (
							<div className="container mt-3" key={index}>
								<ServiceEditFields
									{...services.fields}
									taxonomy = {this.state.serviceTaxonomies[index]}
									index = {index}
									handleServiceNameChange={this.handleServiceNameChange}
									handleServiceDescriptionChange={this.handleServiceDescriptionChange}
									handleSubmit={this.handleSubmit}
									deleteEntry={this.deleteEntry}
									taxonomyRecords={this.state.taxonomyRecords}
									deleteTaxonomy ={this.deleteTaxonomy}
									handleServiceTaxonomy={this.handleServiceTaxonomy}
								/>
							</div>
						))
					: ""}
					<SaveChangesButton
					 	theNumber = {4}
						deleteEntry ={this.deleteTaxonomy}
					/>
				</div>
				<button
					onClick={event => this.handleSubmit(event)}
					className="btn btn-dark"
					type="button"
				>
					Submit Changes
				</button>
			</div>
		);
	}
}

function refreshPage() {
	window.location.reload(true);
}

//class OrgEditFields extends Component = ({name, alternate_name, description, email, url, phones}) =>(
class OrgEditFields extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Form>
					<div className="ServiceEditingChunk1">
						<Form.Group controlId="organizationNameId">
							<Form.Label><h5>Organization Name</h5></Form.Label>
							<input
								type="organizationName"
								name="organizationName"
								placeholder={this.props.name}
								className="form-control"
								onChange={event => this.props.handleChange(event)}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Description</Form.Label>
							<textarea
								type="organizationDescription"
								name="organizationDescription"
								as="textarea"
								rows="3"
								placeholder={this.props.description}
								className="form-control"
								onChange={event => this.props.handleChange(event)}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email</Form.Label>
							<input
								type="organizationEmail"
								name="organizationEmail"
								placeholder={this.props.email}
								className="form-control"
								onChange={event => this.props.handleChange(event)}
							/>
						</Form.Group>

						<Form.Group controlId="formGridAddress1">
							<Form.Label>URL</Form.Label>
							<input
								type="organizationURL"
								name="organizationURL"
								placeholder={this.props.url}
								className="form-control"
								onChange={event => this.props.handleChange(event)}
							/>
						</Form.Group>
					</div>
				</Form>
			</div>
		);
	}
}

class PhoneEditFields extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		//console.log(this.props)
		return (
			<div className="ServiceEditingChunk1">
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label><h5>Phone {this.props.index + 1}</h5></Form.Label>
						<input
							type="organizationPhone"
							name="phoneNumbers"
							placeholder={this.props.number}
							className="form-control"
							onChange={event => this.props.handleNumberChange(event, this.props.index)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Phone Description</Form.Label>
						<textarea
							type="organizationPhoneDescription"
							name="organizationPhoneDescription"
							as="textarea"
							rows="3"
							placeholder={this.props.description}
							className="form-control"
							onChange={event => this.props.handleDescriptionChange(event, this.props.index)}
						/>
					</Form.Group>
				</Form>
				<button
					onClick={event => this.props.deleteEntry("phones", this.props.index)}
					className="btn btn-dark"
					type="button"
				>
					Delete Phone {this.props.index + 1}
				</button>
			</div>
		);
	}
}

class ServiceEditFields extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		console.log("HERE ARE PROPS");
		console.log(this.props.taxonomy);

		var taxonomyList = this.props.taxonomy;

		return (
			<div className="ServiceEditingChunk1">
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label><h5>Service {this.props.index + 1} Name: {this.props.Name}</h5></Form.Label>
						<input
							type="serviceNames"
							name="serviceNames"
							placeholder={this.props.Name}
							className="form-control"
							onChange={event => this.props.handleServiceNameChange(event, this.props.index)}
						/>
						<Form.Label>Service Description</Form.Label>
						<input
							type="serviceNames"
							name="serviceNames"
							placeholder={this.props.Description}
							as="textarea"
							rows="3"
							className="form-control"
							onChange={event => this.props.handleServiceDescriptionChange(event, this.props.index)}
						/>
						<Form.Label>Service Alt Name</Form.Label>
						<input
							type="serviceNames"
							name="serviceNames"
							placeholder={this.props.Alternate_Name}
							className="form-control"
							onChange={event => this.props.handleServiceAltNameChange(event, this.props.index)}
						/>
						<Form.Label>Service Location</Form.Label>
						<input
							type="serviceNames"
							name="serviceNames"
							placeholder={this.props.locations}
							className="form-control"
							onChange={event => this.props.handleServiceLocationChange(event, this.props.index)}
						/>
						<Form.Label>Service URL (if different from organization)</Form.Label>
						<input
							type="serviceNames"
							name="serviceNames"
							placeholder={this.props.url}
							className="form-control"
							onChange={event => this.props.handleServiceURLChange(event, this.props.index)}
						/>
						<Form.Label>Service Email (if different form Oranization)</Form.Label>
						<input
							type="serviceNames"
							name="serviceNames"
							placeholder={this.props.email}
							className="form-control"
							onChange={event => this.props.handleServiceEmailChange(event, this.props.index)}
						/>
						<Form.Label>{this.props.Name} Taxonomy / Taxonomies</Form.Label>
						{taxonomyList.length > 0
							? taxonomyList.map((taxonomy, index) => (
									<div key={index}>
									<Form.Label>Taxonomy {index + 1}</Form.Label>
										<h4>{taxonomy.fields.name}</h4>
										<button
											onClick={event => this.props.deleteTaxonomy(this.props.index, index)}
											className="btn btn-dark"
											type="button"
										>
											Delete Taxonomy {index + 1}
										</button>
									</div>
								))
							: ""}

							<p>If you would like to add another taxonomy, please narrow it down here: <br/> (continue until fields are no longer generated)</p>
							{(this.props.taxonomyRecords || []).map((recordSet, id) =>{
								return(
									<Form.Control key={id} as="select" name="serviceTaxonomyName" onChange={event => this.props.handleServiceTaxonomy(event)}>
										<option key={999} value={-1}>Please Select an Option</option>
										{(recordSet || []).map((record, key) => {
											return <option key={key} value={record.fields.id}>{record.fields.name}</option>;
										})}
									</Form.Control>
								)
							})}

					</Form.Group>
				</Form>
			</div>
		);
	}
}




//);
