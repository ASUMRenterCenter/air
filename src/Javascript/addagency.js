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
		};
		this.createNewOrg = this.createNewOrg.bind(this);
		this.renderTableData = this.renderTableData.bind(this);
		this.editOrg = this.editOrg.bind(this);
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
				})
				fetchNextPage();
			});
			console.log(this.state.organizations)
			alert("I'm here")
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
								<Form id="edit-unlist-org">
									{["checkbox"].map(type => (
										<div key={"default-${type}"} className="mb-3">
											<Form.Check
												type={type}
												id={"default-${type}"}
												label={"Unlist"}
											/>
										</div>
									))}
								</Form>
							</Col>
							<Col>
								<a
									onClick={() =>
										this.editOrg(
											organization.fields["id"],
											organization.fields["name"]
										)
									}
									// href="#"
								>
									<h6>Edit</h6>
								</a>
							</Col>
						</Row>
					</td>
				</tr>
			);
		});
	}

	render() {
		return (
			<div id="add-agency-page" class="scrollable">
				<div id="main-component-add-agency">
					<br></br>
					<Container id="add-agency" className="centered">
						<Row>
							<Col sm={8}>
								<h1>Edit Organization</h1>
							</Col>
							<Col sm={4}>
								<button
									onClick={this.createNewOrg}
									className="btn btn-info btn-sm"
									type="button"
								>
									Create New Organization
								</button>
							</Col>
						</Row>
					</Container>
					<Container id="edit-org-table" className="centered">
						<div className="table-wrapper-scroll-y custom-scrollbar">
							<table className="table table-striped table-bordered table-hover table-dark">
								<thead>
									<tr>
										<th>#</th>
										<th>Organization</th>
										<th>Email</th>
										<th>Edit/Unlist</th>
									</tr>
								</thead>
								<tbody>{this.renderTableData()}</tbody>
							</table>
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
