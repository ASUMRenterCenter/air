// import { Jumbotron } from "react-bootstrap";
import "../CSS/ComponentStyle.css";
// import AgencyEditingFields from "./AgencyEditingFields";
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import history from "./history"

// import { Col } from "react-bootstrap";
// import SaveChangesButton from "./SaveChangesButton.js";
// import Button from "react-bootstrap/Button"
// import Modal from "react-bootstrap/Modal"


export default class AddEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			organization: [],


			org_update: false,
			notListed: "NOT LISTED",

			errorOccurred:false,

			eventName: "",
			eventDescription: "",
			eventDateTime: [],
			eventLocationName: "",
			eventAddress: "",
			eventCity: "",
			eventState: "",
			eventZipCode: "",

			posted: false,
			buttonMessage: "Create Post",


		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkRequired = this.checkRequired.bind(this);
	}

	componentDidMount() {

		//RETRIEVING ORGANIZATION RECORD
		this.props.database('organizations').find(this.props.match.params.org_name, (err, record) => {
		    if (err) { console.error(err); return; }
		    console.log('Retrieved', record.id);
				this.setState({
					organization: record,
				})
		});

	}


	componentDidUpdate() {


		//console.log("H e r e   a r e   a l l   p r o p s :  ")
		//console.log(this.props);

		if (
			this.state.organization !== [] &&
			!this.state.org_update
		) {
			//console.log("R e a c h i n g   i n s i d e   t h e   d i d U p d a t e   i f ")
			this.setState({
				org_update: true,
			});
		}

		setTimeout(() => {
			//printstuffin here if needed
			//console.log(this.state.organization);
		}, 10000);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(e.target.value);
	}


		checkRequired(e){
			if (this.state.eventName === "" || this.state.eventDescription === ""|| this.state.eventDateTime === "" || this.state.eventCity === ""
					|| this.state.state === "" || this.state.eventZipCode === "" || this.state.eventLocationName === "" || this.state.eventAddress === ""){
				this.setState({
					buttonMessage: "Create Post (PLEASE FILL OUT REQUIRED FIELDS)"
				})
			} else {
				this.handleSubmit(e);
				this.setState({
					buttonMessage: "Submission Complete: Redirecting"
				});
			}
		}


	handleSubmit(e) {
		this.state.posted = true;
		this.state.buttonMessage = "Submission Complete: Redirecting....";
		this.props.database('bulletin_board').create([
			{
		    "fields": {
		      "id": 7,
		      "event_name": this.state.eventName,
		      "description": this.state.eventDescription,
		      "organization": [
		        this.state.organization.id
		      ],
		      "date": this.state.eventDateTime,
		      "location_name": this.state.eventLocationName,
		      "address": this.state.eventAddress,
		      "city": this.state.eventCity,
		      "state": this.state.eventState,
		      "zipcode": this.state.eventZipCode
		    }
		  },
		], function(err, records) {
		  if (err) {
		    console.error(err);
		    return;
		  }
		  records.forEach(function (record) {
		    console.log(record.getId());
		  });
		});
		setTimeout(() => {
			history.push(
				"/" +
					"Organization_Home/" +
					this.props.match.params.org_name +
					"/" +
					this.props.match.params.org_acc_id
			)
		}, 5500); // FIXME    STILL NEEDS TO BE TESTED
  }

	render() {

		if (this.state.organization.fields === [][0]){
			return (<h1>L O A D I N G</h1>);
		}
		return (
			<div>
				<br/>
				<div>
					<h1>Create Local Event Bulletin Post For {this.state.organization.fields.name}</h1>
				</div>

				<div className="rowChunk">
					<h3 className="rowHeadingPad">Name:</h3>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Name of Event <span className="redText">(REQUIRED)</span></Form.Label>
						<textarea
							type="eventName"
							name="eventName"
							className="form-control"
							required ={true}
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
					<h3 className="rowHeadingPad">Description</h3>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Event Description <span className="redText">(REQUIRED)</span></Form.Label>
						<textarea
							type="eventDescription"
							name="eventDescription"
							className="form-control"
							required ={true}
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<h3>Date</h3>
						<Form.Label>Event Date & Time <span className="redText">(REQUIRED)</span></Form.Label>
						<br/>
						<input type="datetime-local"
							id="meeting-time"
							name="eventDateTime"
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
					<h3 className="rowHeadingPad">Location:</h3>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Event Location Name: <span className="redText">(REQUIRED)</span></Form.Label>
						<textarea
							type="eventLocationName"
							name="eventLocationName"
							className="form-control"
							required ={true}
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
					<h3 className="rowHeadingPad">Address:</h3>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Street Address of Location: <span className="redText">(REQUIRED)</span></Form.Label>
						<textarea
							type="eventAddress"
							name="eventAddress"
							className="form-control"
							required ={true}
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
					<h3 className="rowHeadingPad">City:</h3>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>City of Location <span className="redText">(REQUIRED)</span></Form.Label>
						<textarea
							type="eventCity"
							name="eventCity"
							className="form-control"
							required ={true}
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
					<h3 className="rowHeadingPad">State:</h3>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>State of City <span className="redText">(REQUIRED)</span></Form.Label>
						<textarea
							type="eventState"
							name="eventState"
							className="form-control"
							required ={true}
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
					<h3 className="rowHeadingPad">Zip:</h3>
						<Form.Label>Zip Code <span className="redText">(REQUIRED)</span></Form.Label>
						<textarea
							type="eventZipCode"
							name="eventZipCode"
							className="form-control"
							required ={true}
							onChange={event => this.handleChange(event)}
						/>
					</Form.Group>
					<button

	          onClick={event => this.checkRequired(event)}
	          className="btn btn-dark space-below"
	          type="button"
	        >
	          {this.state.buttonMessage}
	        </button>
					<br/>
					<br/>
					<br/>
					<br/>
				</div>
				<br/>
				<br/>
			</div>

		);
	}
}

function refreshPage() {
	window.location.reload(true);
}
