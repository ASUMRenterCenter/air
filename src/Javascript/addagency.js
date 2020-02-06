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

export default class AddAgency extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="add-agency-page" class="scrollable">
				<div id="main-component-add-agency">
					<br></br>
					<Container id="add-agency" class="centered">
						<Row>
							<Col sm={8}>
								<h1>Edit Organization</h1>
							</Col>
							<Col sm={4}>
								<Button href="/createOrganization" variant="info" size="sm">
									Create New Organization
								</Button>
							</Col>
						</Row>
					</Container>
					<Container id="edit-org-table" class="centered">
						<Table striped bordered hover variant="dark" class="scrollable">
							<thead>
								<tr>
									<th>#</th>
									<th>Organization</th>
									<th>Username</th>
									<th>Edit/Unlist</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>Organization</td>
									<td>Organization Username</td>
									<td>
										<Row>
											<Col>
												<Form id="edit-unlist-org">
													{["checkbox"].map(type => (
														<div key={`default-${type}`} className="mb-3">
															<Form.Check
																type={type}
																id={`default-${type}`}
																label={`Unlist`}
															/>
														</div>
													))}
												</Form>
											</Col>
											<Col>
												<a href="/editagency">
													<h6>Edit</h6>
												</a>
											</Col>
										</Row>
									</td>
								</tr>
								<tr>
									<td>2</td>
									<td>Organization</td>
									<td>Organization Username</td>
									<td>
										<Row>
											<Col>
												<Form id="edit-unlist-org">
													{["checkbox"].map(type => (
														<div key={`default-${type}`} className="mb-3">
															<Form.Check
																type={type}
																id={`default-${type}`}
																label={`Unlist`}
															/>
														</div>
													))}
												</Form>
											</Col>
											<Col>
												<a href="/editagency">
													<h6>Edit</h6>
												</a>
											</Col>
										</Row>
									</td>
								</tr>

								<tr>
									<td>3</td>
									<td>Organization</td>
									<td>Organization Username</td>
									<td>
										<Row>
											<Col>
												<Form id="edit-unlist-org">
													{["checkbox"].map(type => (
														<div key={`default-${type}`} className="mb-3">
															<Form.Check
																type={type}
																id={`default-${type}`}
																label={`Unlist`}
															/>
														</div>
													))}
												</Form>
											</Col>
											<Col>
												<a href="/editagency">
													<h6>Edit</h6>
												</a>
											</Col>
										</Row>
									</td>
								</tr>
							</tbody>
						</Table>
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
						<Table striped bordered hover variant="dark" class="scrollable">
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
									<td class="centered">
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
									<td class="centered">
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
									<td class="centered">
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
