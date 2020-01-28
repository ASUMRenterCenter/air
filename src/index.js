import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import history from "./Javascript/history";
import "./CSS/styles.css";
import Navbar from "./Javascript/navbar";
import ExitButton from "./Javascript/exitbutton";
import Homepage from "./Javascript/homepage";
import ButtonResults from "./Javascript/buttonresults";
import LoginPage from "./Javascript/loginpage";
import AddAgency from "./Javascript/addagency";
import EditAgency from "./components/AgencyEditPage";
import Survey from "./Javascript/survey";
import SurveyResults from "./Javascript/CategoryResults/SurveyResultsPage";
import CategoryResults from "./Javascript/CategoryResults/CategoryResultsPage";
import AgencyInfoPage from "./components/AgencyInfoPage";
import AgencyEditPage from "./components/AgencyEditPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Airtable from "airtable";

const Notfound = () => <h1>Not found</h1>;

const base = new Airtable({ apiKey: "key68OVjXXeLKQuEl" }).base(
	"app6JuPyfzqD3RZiA"
);

class Index extends React.Component {
	static loggedIn = false;
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			org_name: "",
			org_acc_id: ""
		};
		this.setLoggedIn = this.setLoggedIn.bind(this);
		this.setLoggedOut = this.setLoggedOut.bind(this);
		this.setOrgName = this.setOrgName.bind(this);
		this.setOrgAccId = this.setOrgAccId.bind(this);
	}

	setOrgName = name => {
		this.setState({ org_name: name });
		console.log(this.state.org_name);
	};

	setOrgAccId = id => {
		this.setState({ org_acc_id: id });
		console.log(this.state.org_acc_id);
	};

	setLoggedIn() {
		this.setState({ loggedIn: true });
	}

	setLoggedOut() {
		this.setState({ loggedIn: false });
	}

	componentDidMount() {}

	/* 	componentDidUpdate(prevProps, prevState) {
		if (prevState.loggedIn === this.state.loggedIn) {
			this.fetchData(this.state.loggedIn);
			alert("cont?");
			console.log("Logged in");
		}
	} */

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.loggedIn == nextState.loggedIn) {
			return false;
		}
	}

	routing = (
		<Router>
			<div>
				{/* <Route
					exact
					path="*"
					component={props => (
						<div>
							<Navbar database={base} children={<Homepage database={base}/>}/>
							<Navbar
								{...props}
								triggerLogOut={this.setLoggedOut}
								loggedIn={this.state.loggedIn}
								orgName={this.state.org_name}
								orgId={this.state.org_acc_id}
								database={base}
							/>
						</div>
					)}
				/> */}
				<Switch>
					<Route
						exact
						path="/"
						component={() => (
							<div>
								<Navbar
									database={base}
									children={<Homepage database={base} />}
								/>
								<ExitButton />
							</div>
						)}
					/>
					<Route
						path="/login"
						component={props => (
							<div>
								<Navbar
									database={base}
									children={
										<LoginPage
											{...props}
											database={base}
											rerender={this.rerenderCallback}
											setLogIn={this.setLoggedIn}
											setOrg={this.setOrgName}
											setOrgId={this.setOrgAccId}
											loggedIn={this.state.loggedIn}
											org={this.state.org_name}
											id={this.state.org_acc_id}
										/>
									}
								/>
								{/* <LoginPage {...props} database={base} /> */}
							</div>
						)}
					/>
					<Route
						path="/ButtonResults/:parent_name/:parent_id"
						component={props => (
							<div>
								<ButtonResults {...props} database={base} />
								<ExitButton />
							</div>
						)}
					/>
					<Route
						path="/Survey"
						component={() => (
							<div>
								<Survey />
								<ExitButton />
							</div>
						)}
					/>
					<Route
						path="/SurveyResults"
						component={() => (
							<div>
								<SurveyResults />
							</div>
						)}
					/>
					<Route
						path="/CategoryResults/:taxonomy_name"
						component={props => (
							<div>
								<Navbar database={base} children={<CategoryResults {...props} database={base}/>}/>
							</div>
						)}
					/>
					<Route
						path="/AddAgency"
						component={() => (
							<div>
								<AddAgency />
							</div>
						)}
					/>
					<Route
						path="/EditAgency/:org_name/:org_acc_id"
						component={(props) => (
							<div>
								<Navbar
									{...props}
									loggedIn={true}
									database={base}
									children={<EditAgency {...props} database={base} />}
								/>
							</div>
						)}
					/>
					<Route
						path="/AgencyInfoPage"
						component={() => (
							<div>
								<AgencyInfoPage />
							</div>
						)}
					/>
					<Route
						path="/Organization_Home/:org_name/:org_acc_id"
						component={props => (
							<div>
								<Navbar
									{...props}
									loggedIn={true}
									database={base}
									children={<Homepage {...props} database={base} />}
								/>
								<ExitButton />
							</div>
						)}
					/>
					{/* <Route
						exact
						path="*"
						component={() => (
							<div>
								<Homepage />
								<ExitButton />
							</div>
						)}
					/> */}

					<Route component={Notfound} />
				</Switch>
			</div>
		</Router>
	);

	render() {
		return this.routing;
	}
}

ReactDOM.render(<Index />, document.getElementById("root"));
// ReactDOM.render(<div><Navbar /><Homepage /><ExitButton /> </div>, document.getElementById('root'));
