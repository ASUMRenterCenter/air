import React from "react";
import {
	Button,
	Container,
	Row,
	Col,
	Table,
	Form,
	Accordion,
	Card
} from "../../node_modules/react-bootstrap";
import "../CSS/addagency.css";
import history from "./history";
import $ from "jquery";

export default class AddAgency extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			organization_accounts: [],
			loggedIn: false,
			orgName: "",
			orgId: "",
			active: false,
			isJordan: false,
			organizations: [],
			updateOrg: []
		};
		this.createNewOrg = this.createNewOrg.bind(this);
		this.renderTableData = this.renderTableData.bind(this);
		this.editOrg = this.editOrg.bind(this);
		this.saveList = this.saveList.bind(this);
		this.isChecked = this.isChecked.bind(this);
	}

	componentDidMount() {
		this.props
			.database("organization_accounts")
			.select({
				fields: ["org_acc_id", "org_name", "username", "password"],
				sort: [{ field: "org_acc_id", direction: "asc" }]
			})
			.eachPage((organization_accounts, fetchNextPage) => {
				this.setState({
					organization_accounts
				});
				fetchNextPage();
			});
		if (this.props.loggedIn) {
			this.setState({
				loggedIn: true,
				orgName: this.props.match.params.org_name,
				orgId: this.props.match.params.org_acc_id
			});
		}
		this.props
			.database("organizations")
			.select({
				fields: ["name", "email", "id", "isNotListed"],
				sort: [{ field: "id", direction: "asc" }]
			})
			.eachPage((partialRecords, fetchNextPage) => {
				this.setState({
					organizations: [...this.state.organizations, ...partialRecords]
				});
				fetchNextPage();
			});
		/* ===================================
			The following is for the search
			bar to properly search the table
			==================================*/
		$(document).ready(function() {
			$("#myInput").on("keyup", function() {
				var value = $(this)
					.val()
					.toLowerCase();
				$("#myTable tr").filter(function() {
					$(this).toggle(
						$(this)
							.text()
							.toLowerCase()
							.indexOf(value) > -1
					);
				});
			});
		});
	}

	componentDidUpdate() {
		/*===============================
		Checks the url with information in database
		to decide if user is an authorized user. If not
		kicks them back to homepage and logs out.
		================================*/
		if (
			this.state.loggedIn &&
			!this.state.active &&
			this.state.organization_accounts.length > 0
		) {
			for (let i = 0; i <= this.state.organization_accounts.length; i++) {
				if (
					typeof this.state.organization_accounts[i] === "undefined" ||
					typeof this.state.organization_accounts[i].fields["org_name"] ===
						"undefined" ||
					typeof this.state.organization_accounts[i].fields === "undefined"
				) {
					if (i >= this.state.organization_accounts.length) {
						history.push("/");
						this.setState({
							active: false
						});
					}
					continue;
				} else if (
					this.state.organization_accounts[i].fields["org_name"][0] ===
						this.state.orgName &&
					this.state.organization_accounts[i].fields["org_acc_id"] ===
						this.state.orgId
				) {
					this.setState({
						active: true
					});
					if (
						this.state.organization_accounts[i].fields["org_acc_id"] === "1"
					) {
						this.setState({
							isJordan: true
						});
					}
					break;
				}
			}
			//console.log(this.state.organizations)
		}
		/*==============================*/
	}

	createNewOrg(e) {
		if (!this.state.loggedIn && !this.state.active) {
			history.replace("/");
		} else if (this.state.loggedIn && this.state.active) {
			history.push(
				"/" +
					"CreateOrganization/" +
					this.state.orgName +
					"/" +
					this.state.orgId
			);
		}
	}

	editOrg(orgID, orgName) {
		if (!this.state.isJordan) {
			alert("You don't have permission to edit.");
			history.replace("/");
		} else {
			history.push(
				"/" +
					"EditAgency/" +
					this.state.orgName +
					"/" +
					this.state.orgId +
					"/" +
					orgName +
					"/" +
					orgID
			);
		}
	}

	isChecked(value, action, id) {
		if (action === "default") {
			//console.log("inside default");
			if (value === 0) {
				return false;
			} else if (value === 1) {
				return true;
			} else {
				return false;
			}
		} else if (action === "update") {
			//console.log("inside update");
			this.props.database("organizations").update([
				{
					id: id,
					fields: {
						isNotListed: value
					}
				}
			]);
		}
	}

	justChecked(value) {}

	renderTableData() {
		return this.state.organizations.map((organization, index) => {
			// const { name, email, id } = organization;
			return (
				<tr key={organization.id}>
					<td>{organization.fields["id"]}</td>
					<td>{organization.fields["name"]}</td>
					<td>{organization.fields["email"]}</td>
					<td>
						<Row>
							<Col>
								{/* <form id="edit-unlist-org" name="checked"> */}
								{/* 	<CheckBoxContainer /> */}
								<label className="form-check-label" type="checkbox">
									Unlist
								</label>
								<input
									className="form-check-input"
									type="checkbox"
									name={this.state.organizations[index].id}
									defaultChecked={this.isChecked(
										this.state.organizations[index].fields["isNotListed"],
										"default",
										"none"
									)}
								></input>
							</Col>
							<Col>
								<button
									type="button"
									class="btn btn-link"
									onClick={() =>
										this.editOrg(
											organization.fields["id"],
											organization.fields["name"]
										)
									}
									// href="#"
								>
									<h6>Edit</h6>
								</button>
							</Col>
						</Row>
					</td>
				</tr>
			);
		});
	}

	saveList(e) {
		var org_id = [];
		var org_value = [];
		var did_update = [];
		var updates = 0;
		var org_update = [];
		var checks = document.forms["checked"];
		for (let i = 0; i < checks.length; i++) {
			//org_id.push(checks[i].name);
			if (
				checks[i].checked === true &&
				this.state.organizations[i].fields["isNotListed"] === 1
			) {
				//did_update.push(0);
			} else if (
				(checks[i].checked === true) &
				(this.state.organizations[i].fields["isNotListed"] === 0)
			) {
				org_id.push(checks[i].name);
				org_value.push(1);
				//did_update.push(1);
				updates += 1;
			} else if (
				(checks[i].checked === false) &
				(this.state.organizations[i].fields["isNotListed"] === 1)
			) {
				org_id.push(checks[i].name);
				org_value.push(0);
				//did_update.push(1);
				updates += 1;
			} else {
				//did_update.push(0);
			}
		}

		if (updates > 10 || updates <= 0) {
			alert("You can only update up to 10 records at once.");
		} else {
			for (let i = 0; i < did_update.length; i++) {
				if (did_update[i] === 1) {
					org_update.push(this.state.organizations[i].id);
				}
			}

			switch (updates) {
				default:
					alert("Could not update database");
					break;
				case 1:
					this.props.database("organizations").update([
						{
							id: org_id[updates - 1],
							fields: {
								isNotListed: org_value[updates - 1]
							}
						}
					]);
					break;
				case 2:
					this.props.database("organizations").update([
						{
							id: org_id[updates - 2],
							fields: {
								isNotListed: org_value[updates - 2]
							}
						},
						{
							id: org_id[updates - 1],
							fields: {
								isNotListed: org_value[updates - 1]
							}
						}
					]);
					break;
				case 3:
					this.props.database("organizations").update([
						{
							id: org_id[updates - 3],
							fields: {
								isNotListed: org_value[updates - 3]
							}
						},
						{
							id: org_id[updates - 2],
							fields: {
								isNotListed: org_value[updates - 2]
							}
						},
						{
							id: org_id[updates - 1],
							fields: {
								isNotListed: org_value[updates - 1]
							}
						}
					]);
					break;
				case 4:
					this.props.database("organizations").update([
						{
							id: org_id[updates - 4],
							fields: {
								isNotListed: org_value[updates - 4]
							}
						},
						{
							id: org_id[updates - 3],
							fields: {
								isNotListed: org_value[updates - 3]
							}
						},
						{
							id: org_id[updates - 2],
							fields: {
								isNotListed: org_value[updates - 2]
							}
						},
						{
							id: org_id[updates - 1],
							fields: {
								isNotListed: org_value[updates - 1]
							}
						}
					]);
					break;
				case 5:
					this.props.database("organizations").update([
						{
							id: org_id[updates - 5],
							fields: {
								isNotListed: org_value[updates - 5]
							}
						},
						{
							id: org_id[updates - 4],
							fields: {
								isNotListed: org_value[updates - 4]
							}
						},
						{
							id: org_id[updates - 3],
							fields: {
								isNotListed: org_value[updates - 3]
							}
						},
						{
							id: org_id[updates - 2],
							fields: {
								isNotListed: org_value[updates - 2]
							}
						},
						{
							id: org_id[updates - 1],
							fields: {
								isNotListed: org_value[updates - 1]
							}
						}
					]);
					break;
				case 6:
					this.props.database("organizations").update([
						{
							id: org_id[updates - 6],
							fields: {
								isNotListed: org_value[updates - 6]
							}
						},
						{
							id: org_id[updates - 5],
							fields: {
								isNotListed: org_value[updates - 5]
							}
						},
						{
							id: org_id[updates - 4],
							fields: {
								isNotListed: org_value[updates - 4]
							}
						},
						{
							id: org_id[updates - 3],
							fields: {
								isNotListed: org_value[updates - 3]
							}
						},
						{
							id: org_id[updates - 2],
							fields: {
								isNotListed: org_value[updates - 2]
							}
						},
						{
							id: org_id[updates - 1],
							fields: {
								isNotListed: org_value[updates - 1]
							}
						}
					]);
					break;
				case 7:
					this.props.database("organizations").update([
						{
							id: org_id[updates - 7],
							fields: {
								isNotListed: org_value[updates - 7]
							}
						},
						{
							id: org_id[updates - 6],
							fields: {
								isNotListed: org_value[updates - 6]
							}
						},
						{
							id: org_id[updates - 5],
							fields: {
								isNotListed: org_value[updates - 5]
							}
						},
						{
							id: org_id[updates - 4],
							fields: {
								isNotListed: org_value[updates - 4]
							}
						},
						{
							id: org_id[updates - 3],
							fields: {
								isNotListed: org_value[updates - 3]
							}
						},
						{
							id: org_id[updates - 2],
							fields: {
								isNotListed: org_value[updates - 2]
							}
						},
						{
							id: org_id[updates - 1],
							fields: {
								isNotListed: org_value[updates - 1]
							}
						}
					]);
					break;
				case 8:
					this.props.database("organizations").update([
						{
							id: org_id[updates - 8],
							fields: {
								isNotListed: org_value[updates - 8]
							}
						},
						{
							id: org_id[updates - 7],
							fields: {
								isNotListed: org_value[updates - 7]
							}
						},
						{
							id: org_id[updates - 6],
							fields: {
								isNotListed: org_value[updates - 6]
							}
						},
						{
							id: org_id[updates - 5],
							fields: {
								isNotListed: org_value[updates - 5]
							}
						},
						{
							id: org_id[updates - 4],
							fields: {
								isNotListed: org_value[updates - 4]
							}
						},
						{
							id: org_id[updates - 3],
							fields: {
								isNotListed: org_value[updates - 3]
							}
						},
						{
							id: org_id[updates - 2],
							fields: {
								isNotListed: org_value[updates - 2]
							}
						},
						{
							id: org_id[updates - 1],
							fields: {
								isNotListed: org_value[updates - 1]
							}
						}
					]);
					break;
				case 9:
					this.props.database("organizations").update([
						{
							id: org_id[updates - 9],
							fields: {
								isNotListed: org_value[updates - 9]
							}
						},
						{
							id: org_id[updates - 8],
							fields: {
								isNotListed: org_value[updates - 8]
							}
						},
						{
							id: org_id[updates - 7],
							fields: {
								isNotListed: org_value[updates - 7]
							}
						},
						{
							id: org_id[updates - 6],
							fields: {
								isNotListed: org_value[updates - 6]
							}
						},
						{
							id: org_id[updates - 5],
							fields: {
								isNotListed: org_value[updates - 5]
							}
						},
						{
							id: org_id[updates - 4],
							fields: {
								isNotListed: org_value[updates - 4]
							}
						},
						{
							id: org_id[updates - 3],
							fields: {
								isNotListed: org_value[updates - 3]
							}
						},
						{
							id: org_id[updates - 2],
							fields: {
								isNotListed: org_value[updates - 2]
							}
						},
						{
							id: org_id[updates - 1],
							fields: {
								isNotListed: org_value[updates - 1]
							}
						}
					]);
					break;
				case 10:
					this.props.database("organizations").update([
						{
							id: org_id[updates - 10],
							fields: {
								isNotListed: org_value[updates - 10]
							}
						},
						{
							id: org_id[updates - 9],
							fields: {
								isNotListed: org_value[updates - 9]
							}
						},
						{
							id: org_id[updates - 8],
							fields: {
								isNotListed: org_value[updates - 8]
							}
						},
						{
							id: org_id[updates - 7],
							fields: {
								isNotListed: org_value[updates - 7]
							}
						},
						{
							id: org_id[updates - 6],
							fields: {
								isNotListed: org_value[updates - 6]
							}
						},
						{
							id: org_id[updates - 5],
							fields: {
								isNotListed: org_value[updates - 5]
							}
						},
						{
							id: org_id[updates - 4],
							fields: {
								isNotListed: org_value[updates - 4]
							}
						},
						{
							id: org_id[updates - 3],
							fields: {
								isNotListed: org_value[updates - 3]
							}
						},
						{
							id: org_id[updates - 2],
							fields: {
								isNotListed: org_value[updates - 2]
							}
						},
						{
							id: org_id[updates - 1],
							fields: {
								isNotListed: org_value[updates - 1]
							}
						}
					]);
					break;
			}
		}
	}

	render() {
		return (
			<div id="add-agency-page" className="scrollable">
				<div id="main-component-add-agency">
					<br></br>
					<Container id="add-agency" className="centered">
						<Row>
							<Col sm={8}>
								<h1>Edit Organization</h1>
							</Col>
							<Col sm={4}>
								<button
									onClick={() => this.saveList()}
									className="btn btn-info btn-sm"
									type="button"
								>
									Create New Organization
								</button>
							</Col>
						</Row>
					</Container>
					<Container id="edit-org-table" className="centered">
						<div class="form-group row">
							<div class="col-md-6">
								<input
									class="form-control"
									id="myInput"
									type="text"
									placeholder="Search for organization..."
								></input>
							</div>
						</div>
						<div className="table-wrapper-scroll-y custom-scrollbar">
							<form id="edit-unlist-org" name="checked">
								<table className="table table-striped table-bordered table-hover table-dark">
									<thead>
										<tr>
											<th>#</th>
											<th>Organization</th>
											<th>Email</th>
											<th>Edit/Unlist</th>
										</tr>
									</thead>
									<tbody id="myTable">{this.renderTableData()}</tbody>
								</table>
							</form>
						</div>
						<div className="clearfix">
							<Row>
								<button
									onClick={this.saveList}
									className="btn btn-primary"
									type="button"
									style={{ marginLeft: "78%" }}
								>
									Save List/Unlist
								</button>
							</Row>
						</div>
					</Container>
					<br></br>
					<br></br>
					{/* ****************************************
					This next block is for pending comments
					*********************************************/}
					<Container id="comments-heading">
						<Row>
							<Col sm={8}>
								<h1>Pending Comments</h1>
							</Col>
						</Row>
					</Container>
					<Container id="pending-comments">
						<Table striped bordered hover variant="dark" className="scrollable">
							<thead>
								<tr>
									<th>#</th>
									<th>Comment</th>
									<th colSpan="2">Organization Name</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>
										<Accordion defaultActiveKey="0">
											<Card bg="dark">
												<Accordion.Toggle as={Card.Header} eventKey="0">
													Comment
												</Accordion.Toggle>
												<Accordion.Collapse eventKey="0">
													<Card.Body>I am a comment</Card.Body>
												</Accordion.Collapse>
											</Card>
										</Accordion>
									</td>
									<td>Organization</td>
									<td className="centered">
										<Col>
											<Button variant="success">Approve</Button>
										</Col>
										<br></br>
										<Col>
											<Button variant="secondary">Decline</Button>
										</Col>
									</td>
								</tr>
								<tr>
									<td>2</td>
									<td>
										<Accordion defaultActiveKey="0">
											<Card bg="dark">
												<Accordion.Toggle as={Card.Header} eventKey="0">
													Comment
												</Accordion.Toggle>
												<Accordion.Collapse eventKey="0">
													<Card.Body>I am a comment</Card.Body>
												</Accordion.Collapse>
											</Card>
										</Accordion>
									</td>
									<td>Organization</td>
									<td className="centered">
										<Col>
											<Button variant="success">Approve</Button>
										</Col>
										<br></br>
										<Col>
											<Button variant="secondary">Decline</Button>
										</Col>
									</td>
								</tr>
								<tr>
									<td>3</td>
									<td>
										<Accordion defaultActiveKey="0">
											<Card bg="dark">
												<Accordion.Toggle as={Card.Header} eventKey="0">
													Comment
												</Accordion.Toggle>
												<Accordion.Collapse eventKey="0">
													<Card.Body>I am a comment</Card.Body>
												</Accordion.Collapse>
											</Card>
										</Accordion>
									</td>
									<td>Organization</td>
									<td className="centered">
										<Col>
											<Button variant="success">Approve</Button>
										</Col>
										<br></br>
										<Col>
											<Button variant="secondary">Decline</Button>
										</Col>
									</td>
								</tr>
							</tbody>
						</Table>
					</Container>
				</div>
			</div>
		);
	}
}

/* class CheckBoxContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isChecked: false,
			org_id: ""
		};
	}

	handleChange = e =>
		this.setState({
			isChecked: e.target.isChecked
		});

	render() {
		return (
			<div>
				<label className="form-check-label" type="checkbox">
					Unlist
				</label>
				<Checkbox checked={this.state.isChecked} onChange={this.handleChange} />
			</div>
		);
	}
}

const CheckBox = props => (
	<input type="checkbox" className="form-check-input" {...props}></input>
);
 */
