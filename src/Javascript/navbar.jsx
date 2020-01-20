import React from "react";
import $ from "jquery";

import { Navbar, Nav, Button, Image, Row } from "react-bootstrap";
import "../CSS/styles.css";
import * as BCSS from "bootstrap/dist/css/bootstrap.css";
import * as BJS from "bootstrap/dist/js/bootstrap.js";
import logo from "../Images/Logo.png";
import { toggleClass } from "dom-helpers";

export default class nav extends React.PureComponent { // 1/19/20 Added this pure component. It may make it only render once??
	constructor(props) {
		super(props);

		this.state = {
			active: false
		};
	}

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
				<Navbar.Brand href="/" id="logo" bsPrefix="Logo">
					<Image src={logo} href="/" alt="AIR ASUM Information and Referral" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" height="20px">
					<Nav id="login-info" className="right">
						<Row>
							<div display="hidden">
								<Button
									id="add-agency-button"
									href="./AddAgency"
									variant="outline-light"
									size="sm"
									//disabled
								>
									Add Agency
								</Button>
							</div>
							<div>
								<Button
									id="edit-agency-button"
									href="./EditAgency"
									variant="outline-light"
									size="sm"
									//disabled
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
