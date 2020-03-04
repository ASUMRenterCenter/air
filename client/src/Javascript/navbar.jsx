import React from "react";
// import $ from "jquery";

import "../CSS/styles.css";
// import * as BCSS from "bootstrap/dist/css/bootstrap.css";
// import * as BJS from "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
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
		/* this.getData = this.getData.bind(this); */
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
		/* this.getData(); */
	}

	/* 	getData() {
		var xhr = new XMLHttpRequest();

		xhr.addEventListener("load", () => {
			// update the state of the component with the result here
			console.log(xhr.responseText);
			console.log("i'm here");
		});

		// open the request with the verb and the url

		xhr.open("GET", "https://dog.ceo/api/breeds/list/all");
		// send the request
		xhr.send();
	} */

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

	handleSubmit(action) {
		if (action === "main") {
			if (!this.state.loggedIn) {
				history.replace("/");
			} else if (this.state.loggedIn) {
				history.push(
					"/Organization_Home/" + this.state.orgName + "/" + this.state.orgId
				);
			}
		} else if (action === "login") {
			if (this.state.loggedIn && this.state.active) {
				alert("You're already logged in");
			} else {
				history.push("/login");
			}
		} else if (action === "logout") {
			if (!this.state.loggedIn && !this.state.active) {
				alert("Can't log out if you're not logged in");
			} else {
				history.replace("/");
			}
		} else if (action === "edit") {
			if (!this.state.loggedIn) {
				history.replace("/");
			} else if (this.state.loggedIn && this.state.active) {
				history.push(
					"/EditAgency/" + this.state.orgName + "/" + this.state.orgId
				);
			}
		} else if (action === "view") {
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
		} else if (action === "events") {
			history.push("/Events");
		}
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-md navbar-dark" id="navbackground">
					<button
						onClick={() => this.handleSubmit("main")}
						id="logo"
						className="btn Logo btn-link navbar-brand"
						type="button"
					>
						<img src={logo} alt="AIR ASUM Information and Referral" />
					</button>

					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#collapsibleNavbar"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="collapsibleNavbar">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<button
									id="local-events-button"
									onClick={() => this.handleSubmit("events")}
									className="btn btn-outline-light btn-sm"
									type="button"
								>
									View Local Events
								</button>
							</li>
							{this.state.loggedIn &&
							this.state.active &&
							this.state.isJordan ? (
								<li className="nav-item">
									<button
										id="add-agency-button"
										onClick={() => this.handleSubmit("view")}
										className="btn btn-outline-light btn-sm"
										type="button"
									>
										View Organizations
									</button>
								</li>
							) : null}
							{this.state.loggedIn &&
							this.state.active &&
							!this.state.isJordan ? (
								<li className="nav-item">
									<button
										id="edit-agency-button"
										className="btn-outline-light btn btn-sm"
										onClick={() => this.handleSubmit("edit")}
										type="button"
									>
										Edit Organization
									</button>
								</li>
							) : null}
							{!this.state.loggedIn && !this.state.active ? (
								<li className="nav-item">
									<button
										id="login-button"
										onClick={() => this.handleSubmit("login")}
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
										onClick={() => this.handleSubmit("logout")}
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

//export default nav;
