import React from "react";
// import $ from "jquery";

import "../CSS/styles.css";
// import * as BCSS from "bootstrap/dist/css/bootstrap.css";
// import * as BJS from "bootstrap/dist/js/bootstrap.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../Images/Logo.png";
// import { toggleClass } from "dom-helpers";
import history from "./history";
// import PrintSaveShare from "./CategoryResults/PrintSaveShare";

export default class nav extends React.PureComponent {
	// 1/19/20 Added this pure component. It may make it only render once??
	constructor(props) {
		super(props);

		this.state = {
			active: false,
			organization_accounts: [],
			loggedIn: false,
			orgName: "",
			orgId: "",
			isJordan: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.editAgency = this.editAgency.bind(this);
		this.addAgency = this.addAgency.bind(this);
		this.orgLogin = this.orgLogin.bind(this);
		this.logOut = this.logOut.bind(this);
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
		}
		/*==============================*/
	}

	handleSubmit(e) {
		if (!this.state.loggedIn) {
			history.replace("/");
		} else if (this.state.loggedIn) {
			history.push(
				"/Organization_Home/" + this.state.orgName + "/" + this.state.orgId
			);
		}
	}

	orgLogin(e) {
		if (this.state.loggedIn && this.state.active) {
			alert("You're already logged in");
		} else {
			history.push("/login");
		}
	}

	logOut(e) {
		if (!this.state.loggedIn && !this.state.active) {
			alert("Can't log out if you're not logged in");
		} else {
			history.replace("/");
		}
	}

	editAgency(e) {
		if (!this.state.loggedIn) {
			history.replace("/");
		} else if (this.state.loggedIn && this.state.active) {
			history.push(
				"/EditAgency/" + this.state.orgName + "/" + this.state.orgId
			);
		}
	}

	addAgency(e) {
		if (!this.state.loggedIn) {
			history.replace("/");
		} else if (
			this.state.loggedIn &&
			this.state.active &&
			this.state.orgId === "1"
		) {
			history.push(
				"/AddAgency/" + this.state.orgName + "/" + this.state.orgId
			);
		}
	}

	render() {
		return (
			<div>
			<nav className="navbar navbar-expand-md navbar-dark" id="navbackground">
				<a
						id="logo"
						className="navbar-brand Logo"
					>
						<button onClick={this.handleSubmit} className="btn" type="button">
							<img src={logo} alt="AIR ASUM Information and Referral" />
						</button>
				</a>

				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="collapsibleNavbar">
					<ul className="navbar-nav ml-auto">
					{this.state.loggedIn && this.state.active && this.state.isJordan ? (
						<li className="nav-item">
							<button
								id="add-agency-button"
								onClick={this.addAgency}
								className="btn btn-outline-light btn-sm"
								type="button"
							>
								Add Agency
							</button>
						</li>
					) : null}
					{this.state.loggedIn && this.state.active ? (
						<li className="nav-item">
							<button
								id="edit-agency-button"
								className="btn-outline-light btn btn-sm"
								onClick={this.editAgency}
								type="button"
							>
								Edit Agency
							</button>
						</li>
					) : null}
					{!this.state.loggedIn && !this.state.active ? (
						<li className="nav-item">
							<button
								id="login-button"
								onClick={this.orgLogin}
								className="btn btn-outline-light btn-sm"
								type="button"
							>
								Organization Login
							</button>
						</li>
					) : null}
					{this.state.loggedIn && this.state.active ? (
						<li className="nav-item">
							<button
								id="logout-button"
								onClick={this.logOut}
								className="btn btn-outline-light btn-sm"
								type="button"
							>
								Logout
							</button>
						</li>
					) : null}
					</ul>
				</div>
				
			</nav>
		<div className="buttonpagesrow">
			{this.props.children}
			{this.props.Sidebar}
		</div>
		</div>
			
		);
	}
}

function showButtons() {
	document.getElementById("add-agency-button").removeAttribute("disabled");
	document.getElementById("add-agency-button").setAttribute("active", "true");
}

//export default nav;
