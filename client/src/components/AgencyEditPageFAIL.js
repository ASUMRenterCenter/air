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

			orgUpdated: false,

			organizationRecord: [],
			phoneRecords: [],
			locationRecords: [],
			addressRecords: [],
			contactRecords: [],
			sericeRecords: [],

			organizationName: "",
			organizationDescription:"",
			organizationURL: "",
			organizationEmail: "",
			organizationID: "",

			phoneNumbers: [],
			phoneDescriptions: []

		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleIndexedChange = this.handleIndexedChange.bind(this);
	}

	componentDidMount() {
		this.props.database('organizations').find('recgRmL5hpzXrhUHI',(err, record) => {
	    if (err) { console.error(err); return; }
	    console.log('Retrieved', record.id);
			this.setState({
				organizationRecord: record
			});
		});

		setTimeout(() => {
			var phoneRecordArray = [];
			this.props.database('phones').select({
			    view: 'Grid view',
					filterByFormula: '{organizations} = "' + this.state.organizationRecord.fields.name + '"',
			}).firstPage((err, records) => {
			    if (err) { console.error(err); return; }
			    records.forEach(function(record) {
			        console.log('Retrieved', record.get('number'));
							phoneRecordArray.push(record);
			    });
					this.setState({
						phoneRecords: phoneRecordArray,
					});
			});
		}, 1000);

		if (this.props.isJordan) {
			this.setState({
				org_edit_name: this.props.match.params.org_edit_name,
				org_edit_id: this.props.match.params.org_edit_id
			});
		}
	}



	componentDidUpdate() {
		if (
			this.state.organizationRecord != [] &&
			!this.state.org_update &&
			this.state.phoneRecords.length > 0 &&
			this.state.phoneNumbers.length == 0 &&
			this.state.phoneDescriptions.length == 0 &&
			this.state.organizationName == ""
		) {
			console.log("reaching this code");
			this.setState({
				organizationName: this.state.organizationRecord.fields["name"],
				organizationDescription: this.state.organizationRecord.fields[
					"description"
				],
				organizationEmail: this.state.organizationRecord.fields["email"],
				organizationURL: this.state.organizationRecord.fields["url"],
				org_update: true
			});
			var phoneNumberArray = [];
			var phoneDescriptionArray = [];
			for (let i = 0; i < this.state.phoneRecords.length; i++){
				phoneNumberArray.push(this.state.phoneRecords[i].fields.number);
				phoneDescriptionArray.push(this.state.phoneRecords[i].fields.description);
			}
			this.setState({
				phoneNumbers: phoneNumberArray,
				phoneDescriptions: phoneDescriptionArray
			})
		};
		setTimeout(() => {
			console.log(phoneNumberArray);
			console.log(this.state.organizationRecord);
			//console.log(this.state.phoneRecords[0].fields.number);

		}, 1000);
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
		console.log("Record here: ")
		console.log(this.state.organizationRecord);
		return (
			<div>
				/*{this.state.services.length > 0
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
					: ""}*/
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
