import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import history from './Javascript/history';
import "./CSS/styles.css";
import Navbar from "./Javascript/navbar";
import ExitButton from "./Javascript/exitbutton";
import Homepage from "./Javascript/homepage";
import ButtonResults from "./Javascript/buttonresults";
import LoginPage from "./Javascript/loginpage";
import AddAgency from "./Javascript/addagency";
import EditAgency from "./components/AgencyEditPage";
import Survey from "./Javascript/survey";
import SurveyResults from "./components/SurveyResultsPage";
import CategoryResults from "./components/CategoryResultsPage";
import AgencyInfoPage from "./components/AgencyInfoPage";
import "bootstrap/dist/css/bootstrap.min.css";

const Notfound = () => <h1>Not found</h1>;

const routing = (
	<Router history={history}>
		<div>
			<Route
				exact
				path="*"
				component={() => (
					<div>
						<Navbar />
					</div>
				)}
			/>
			<Switch>
				<Route
					exact
					path="/"
					component={() => (
						<div>
							<Homepage />
							<ExitButton />
						</div>
					)}
				/>
				<Route
					path="/login"
					component={() => (
						<div>
							<LoginPage />
						</div>
					)}
				/>
				<Route
					path="/ButtonResults/:parent_id"
					component={(props) => (
						<div>
							<ButtonResults {...props} />
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
					path="/CategoryResults"
					component={() => (
						<div>
							<CategoryResults />
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
