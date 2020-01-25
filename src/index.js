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
import "bootstrap/dist/css/bootstrap.min.css";
import Airtable from "airtable";

const Notfound = () => <h1>Not found</h1>;
const base = new Airtable({ apiKey: "key68OVjXXeLKQuEl" }).base(
	"app6JuPyfzqD3RZiA"
);

const routing = (
	<Router history={history}>
		<div>
			<Route
				exact
				path="*"
				component={props => (
					<div>
						<Navbar {...props} database={base} />
					</div>
				)}
			/>
			<Switch>
				<Route
					exact
					path="/"
					component={props => (
						<div>
							<Homepage database={base} />
							<ExitButton />
						</div>
					)}
				/>
				<Route
					path="/login"
					component={() => (
						<div>
							<LoginPage database={base} />
						</div>
					)}
				/>
				<Route
					path="/ButtonResults/:parent_name/:parent_id"
					component={props => (
						<div>
							<ButtonResults {...props} database={base} />
							{/* <ExitButton /> */}
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
					path="/CategoryResults/:name"
					component={props => (
						<div>
							<CategoryResults {...props} database={base} />
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
					path="/EditAgency"
					component={() => (
						<div>
							<EditAgency />
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
							<Homepage {...props} database={base} />
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

ReactDOM.render(routing, document.getElementById("root"));
// ReactDOM.render(<div><Navbar /><Homepage /><ExitButton /> </div>, document.getElementById('root'));
