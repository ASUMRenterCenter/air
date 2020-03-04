import { Jumbotron } from "react-bootstrap";
import "../CSS/ComponentStyle.css";
import AgencyEditingFields from "./AgencyEditingFields";
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import SaveChangesButton from "./SaveChangesButton.js";

export default class AgencyEditPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			organization: [],
			organizationName: "",
			organizationDescription: "",
			organizationEmail: "",
			organizationURL: "",
			org_updated: false,


			phones: [],
			organizationPhone: "",
			organizationPhoneDescription: "",


			services: [],
			serviceNames: [],
			serviceLocations: [],
			serviceDescriptions: [],

			org_edit_name: "",
			org_edit_id: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleIndexedChange = this.handleIndexedChange.bind(this);
	}

	componentDidMount() {
		var phonesArray;
		this.props
			.database("organizations")
			.find("recgRmL5hpzXrhUHI", (err, record, phonesArray) => {
				if (err) {
					console.error(err);
					return;
				}
				///BETWEEN THESE TWO MARKERS, YOU CAN USE 'RECORD' FREELY////
				//Phone info
				this.props
					.database("phones")
					.select({
						filterByFormula: '{organizations} = "' + record.fields.name + '"', //Your ord ID here
						view: "Grid view"
					})
					.eachPage(
						(phones, fetchNextPage, phonesArray) => {
							phonesArray.push(phones);
							this.setState({
								phones: phonesArray
							});
							//console.log(phones)
							fetchNextPage();
						},
						function done(error) {
							console.log("Will Return An Error:" + error);
						}
					);

				//organization info vvvs
				this.props
					.database("organizations")
					.select({
						filterByFormula: '{name} = "' + record.fields.name + '"', //Your ord ID here
						view: "Grid view"
					})
					.eachPage(
						(organization, fetchNextPage) => {
							this.setState({
								organization
							});
							//console.log(organization)
							fetchNextPage();
						},
						function done(error) {
							console.log("Will Return An Error:" + error);
						}
					);

				//console.log(record);
				//console.log(record.fields.services);

				//services info vvvs ====================================================
				this.props
					.database("services")
					.select({
						filterByFormula: '{organization} = "' + record.fields.name + '"', //Your ord ID here
						view: "Grid view"
					})
					.eachPage(
						(services, fetchNextPage) => {
							this.setState({
								services
							});
							console.log(services);
							fetchNextPage();
						},
						function done(error) {
							console.log("Will Return An Error:" + error);
						}
					);

				///BETWEEN THESE TWO MARKERS, YOU CAN USE 'RECORD' FREELY////
			});

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
		console.log(this.state.services);
		if (
			this.state.organization.length > 0 &&
			!this.state.org_update &&
			this.state.phones.length > 0 &&
			this.state.services.length > 0
		) {
			this.setState({
				organizationName: this.state.organization[0].fields["name"],
				organizationDescription: this.state.organization[0].fields[
					"description"
				],
				organizationEmail: this.state.organization[0].fields["email"],
				organizationURL: this.state.organization[0].fields["url"],
				organizationPhone: this.state.phones[0].fields["number"],
				organizationPhoneDescription: this.state.phones[0].fields[
					"description"
				],
				servicesNames: this.state.services[0].fields["Name"],
				org_update: true
			});
		} else if (
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
		}

		//console.log(this.state.organization[0]);
		//console.log(this.state.phones[0].fields);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(this.state.serviceNames[0]);
	}

	handleIndexedChange(e, index) {
		console.log(
			":LSKDJF:LKDSJF:LKSDFJ:DSLFKJSD:LFKJSD:LFKJSD:LKFJSD:LKFJS:DLKFj"
		);
	}

	handleSubmit(e) {
		this.props.database("organizations").update(
			[
				{
					id: this.state.organization[0].id,
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

		if (this.state.phones.length > 0) {
			this.props.database("phones").update(
				[
					{
						id: this.state.phones[0].id,
						fields: {
							number: this.state.organizationPhone,
							services: ["recGuyaiksm1v1oOE"],
							contacts: ["recS267DLT8PDmSRO"],
							description: this.state.organizationPhoneDescription,
							id: "0"
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
			this.setState({
				org_update: false
			});
		}

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
		}

		setTimeout(function() {
			refreshPage();
		}, 100);
	}

	render() {
		return (
			<div className="outermost">
				{this.state.organization.length > 0
					? this.state.organization.map((organizations, index) => (
							<div className="container mt-3" key={organizations.id}>
								<OrgEditFields
									{...organizations.fields}
									handleChange={this.handleChange}
									handleSubmit={this.handleSubmit}
								/>
							</div>
					  ))
					: ""}
				{this.state.phones.length > 0
					? this.state.phones.map((phones, index) => (
							<div className="container mt-3" key={phones.id}>
								<PhoneEditFields
									{...phones.fields}
									handleChange={this.handleChange}
									handleSubmit={this.handleSubmit}
								/>
							</div>
					  ))
					: ""}
				{this.state.services.length > 0
					? this.state.services.map((services, index) => (
							<div className="container mt-3" key={index}>
								<ServiceEditFields
									{...services.fields}
									index={index}
									handleIndexedChange={this.handleIndexedChange}
									handleSubmit={this.handleSubmit}
								/>
							</div>
					  ))
					: ""}
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
							<Form.Label>Organization Name</Form.Label>
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
		return (
			<div className="ServiceEditingChunk1">
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Phone</Form.Label>
						<input
							type="organizationPhone"
							name="organizationPhone"
							placeholder={this.props.number}
							className="form-control"
							onChange={event => this.props.handleChange(event)}
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
							onChange={event => this.props.handleChange(event)}
						/>
					</Form.Group>
				</Form>
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
		console.log(this.props);
		return (
			<div className="ServiceEditingChunk1">
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>{this.props.Name}</Form.Label>
						<input
							type="serviceNames"
							name="serviceNames"
							placeholder={this.props.Name}
							className="form-control"
							onChange={event => this.props.handleIndexedChange(event)}
						/>
					</Form.Group>
				</Form>
			</div>
		);
	}
}

//);
