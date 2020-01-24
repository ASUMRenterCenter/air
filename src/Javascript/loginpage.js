import React from "react";
import $ from "jquery";
import {
	Button,
	Container,
	Row,
	Col,
	Form,
	Modal,
	ButtonToolbar
} from "../../node_modules/react-bootstrap";
import "../CSS/loginpage.css";
import history from "./history";

class Loginpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			organization_accounts: [],
			username: "",
			password: "",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.props
			.database("organization_accounts")
			.select({
				fields: ["org_acc_id", "org_name", "username", "password"],
				sort: [{ field: "org_acc_id", direction: "asc" }]
			})
			.eachPage(
				(organization_accounts, fetchNextPage) => {
					this.setState({
						organization_accounts
					});
					console.log(organization_accounts);
					fetchNextPage();
				}
				/* function page(records, fetchNextPage) {
					records.forEach(function(record) {
						console.log("Retrieved", record.get("org_acc_id"));
					});
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
					} else {
						return;
					}
				} */
			);
	}

	showButtons() {
		$("#add-agency-button").removeClass("disabled");
		$("#edit-agency-button").removeClass("disabled");
		//document.getElementById("add-agency-button").removeAttribute("disabled");
		//document.getElementById("add-agency-button").setAttribute("active", "true");
	}

	handleSubmit(e) {
		/* this.state.organization_accounts.length > 0 ? (
			this.state.organization_accounts.map(function(org, index) {
				if (org.fields['username'] === this.state.username){
					if (org.fields['password'] === this.state.password){
						return history.push('/Organization_Home/' + org.fields['org_name'] + '/' + org.fields['org_acc_id']);
					}
				}
			}
			)
		):("") */
		e.preventDefault();
		if ((this.state.organization_accounts[0].fields['username'] === this.state.username) && (this.state.organization_accounts[0].fields['password'] === this.state.password)) {
			history.push('/Organization_Home/' + this.state.organization_accounts[0].fields['org_name'] + '/' + this.state.organization_accounts[0].fields['org_acc_id']);
		}

		
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(this.state.organization_accounts[0].fields['password']);
	}

	render() {
		return (
			<div id="login-page">
				<div id="main-component-login">
					<Container id="organization-login" class="centered">
						<Row>
							<Col>
								<h1 class="aligncenter">Organization Login</h1>
							</Col>
							<Col>
								<p class="alignright">
									Here by mistake?
									<br></br>
									<Button href="/" size="sm" variant="dark">
										Back
									</Button>
								</p>
							</Col>
						</Row>
					</Container>
				</div>
				<div id="login-form">
					<Container id="login-container" class="centered">
						<Row>
							<Col md={{ span: 4, offset: 1 }}>
								<form method="POST" action="">
									<Form.Group controlId="formBasicUsername">
										<label class="form-label" for="formBasicUsername">
											Enter Username
										</label>
										<input
											type="username"
											name="username"
											placeholder="Username"
											className="form-control"
											//value={this.state.username}
											onChange={event => this.handleChange(event)}
										/>
										<ForgotUsername />
									</Form.Group>

									<Form.Group controlId="formBasicPassword">
										<Form.Label>Password</Form.Label>
										<input
											type="password"
											name="password"
											placeholder="Password"
											className="form-control"
											//value={this.state.password}
											onChange={event => this.handleChange(event)}
										/>
										<ForgotPassword />
									</Form.Group>
									<button
										onClick={e => this.handleSubmit()}
										class="btn btn-dark"
										type="submit"
									>
										Submit
									</button>
								</form>
							</Col>
							<Col md={{ offset: 1 }}>
								<br></br>
								<h4>
									This login page is for Organizations ONLY. If you are part of
									an Organization and would like to make an account, please
									contact Jordan Lyons at contact@email.com.
								</h4>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}

function UsernameModal(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Username Recovery
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container id="username-recovery-modal">
					<Form>
						<Form.Group as={Row} controlId="form-username-recovery">
							<Form.Label column sm="2">
								Enter Email used for Organization
							</Form.Label>
							<Col sm="10">
								<br></br>
								<Form.Control type="email" placeholder="Email Address" />
							</Col>
						</Form.Group>
					</Form>
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-primary" href="/">
					Submit
				</Button>
				<Button variant="dark" onClick={props.onHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

function PasswordModal(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Password Recovery
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container id="password-recovery-modal">
					<Form>
						<Form.Group as={Row} controlId="form-password-recovery">
							<Form.Label column sm="2">
								Enter Organization's Username
							</Form.Label>
							<Col sm="10">
								<br></br>
								<Form.Control type="Username" placeholder="Username" />
							</Col>
						</Form.Group>
					</Form>
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-primary" href="/">
					Submit
				</Button>
				<Button variant="dark" onClick={props.onHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

function ForgotUsername() {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<ButtonToolbar>
			<Button
				variant="outline-info"
				size="sm"
				onClick={() => setModalShow(true)}
			>
				Forgot Username?
			</Button>

			<UsernameModal show={modalShow} onHide={() => setModalShow(false)} />
		</ButtonToolbar>
	);
}

function ForgotPassword() {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<ButtonToolbar>
			<Button
				variant="outline-info"
				size="sm"
				onClick={() => setModalShow(true)}
			>
				Forgot Password?
			</Button>

			<PasswordModal show={modalShow} onHide={() => setModalShow(false)} />
		</ButtonToolbar>
	);
}

export default Loginpage;
