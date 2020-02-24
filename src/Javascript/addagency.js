import React from "react";
import {
	Button,
	Container,
	Row,
	Col,
	Table,
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

	onUpdateItem = (index, value) => {
		const organizations = [...this.state.organizations];
		organizations[index].fields["isNotListed"] = value;
		this.setState(() => ({
			organizations: organizations
		}));
	};

	isChecked(value, action, id, org_index) {
		if (action === "default") {
			if (value === 0) {
				return false;
			} else if (value === 1) {
				return true;
			} else {
				return false;
			}
		} else if (action === "editChecked") {
			if (value === 1) {
				this.props.database("organizations").update([
					{
						id: id.id,
						fields: {
							isNotListed: 0
						}
					}
				]);
				this.onUpdateItem(org_index, 0);
			} else if (value === 0) {
				this.props.database("organizations").update([
					{
						id: id.id,
						fields: {
							isNotListed: 1
						}
					}
				]);
				this.onUpdateItem(org_index, 1);
			}
		}
	}

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
									id={organization.id}
									name={organization.id}
									onChange={() =>
										this.isChecked(
											this.state.organizations[index].fields["isNotListed"],
											"editChecked",
											organization,
											index
										)
									}
									defaultChecked={this.isChecked(
										this.state.organizations[index].fields["isNotListed"],
										"default",
										"none",
										index
									)}
								></input>
							</Col>
							<Col>
								<button
									type="button"
									className="btn btn-link"
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
						<div className="form-group row">
							<div className="col-md-6">
								<input
									className="form-control"
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
