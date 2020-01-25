import React from "react";
import $ from "jquery";

import { Navbar, Nav, Button, Image, Row } from "react-bootstrap";
import "../CSS/styles.css";
import * as BCSS from "bootstrap/dist/css/bootstrap.css";
import * as BJS from "bootstrap/dist/js/bootstrap.js";
import logo from "../Images/Logo.png";
import { toggleClass } from "dom-helpers";

export default class nav extends React.PureComponent {
	// 1/19/20 Added this pure component. It may make it only render once??
	constructor(props) {
		super(props);

		this.state = {
			active: false,
			organization_accounts: []
		};
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
				//console.log(organization_accounts);
				fetchNextPage();
			});
	}

	handleSubmit(e) {}

	showButtons() {
		if (document.getElementById("add-agency-button").hasAttribute("disabled")) {
			$("#add-agency-button").addClass("disabled");
			$("#edit-agency-button").addClass("disabled");
		} else {
			$("#add-agency-button").removeClass("disabled");
			$("#edit-agency-button").removeClass("disabled");
		}
		//document.getElementById("add-agency-button").removeAttribute("disabled");
		//document.getElementById("add-agency-button").setAttribute("active", "true");
	}

	render() {
		return (
			<Navbar expand="lg" id="navbackground">
				<script></script>
				<a
					//href="javascript:window.location.href=window.location.href"
					href="/"
					id="logo"
					className="Logo"
				>
					<button
						//onClick={e => this.handleSubmit()}
						className="btn"
						type="button"
					>
						<Image src={logo} alt="AIR ASUM Information and Referral" />
					</button>
				</a>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" height="20px">
					<Nav id="login-info" className="right">
						<Row>
							<div display="hidden">
								<button
									id="add-agency-button"
									href="./AddAgency"
									className="btn btn-outline-light btn-sm"
									type="button"
									disabled
								>
									Add Agency
								</button>
							</div>
							<div>
								<Button
									id="edit-agency-button"
									href="./EditAgency"
									variant="outline-light"
									size="sm"
									disabled
								>
									Edit Agency
								</Button>
							</div>
							{/* 	<div>
								<Button
									id="login-button"
									variant="outline-light"
									size="sm"
									onClick={this.showButtons}
								>
									Click to enable buttons
								</Button>
							</div> */}
							<div>
								<Button
									id="login-button"
									href="./login"
									variant="outline-light"
									size="sm"
								>
									Organization Login
								</Button>
							</div>
							<div>
								<Button
									id="logout-button"
									href="./login"
									variant="outline-light"
									size="sm"
									disabled="true"
								>
									Logout
								</Button>
							</div>
						</Row>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

function showButtons() {
	document.getElementById("add-agency-button").removeAttribute("disabled");
	document.getElementById("add-agency-button").setAttribute("active", "true");
}

//export default nav;
