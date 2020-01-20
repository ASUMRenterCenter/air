import React from "react";
import { Table, Button } from "react-bootstrap";
import "../CSS/survey.css";

export default class Survey extends React.Component {
	constructor(props) {
		super(props);
		this.state = { mode: "survey1" };

		this.survey1 = (
			<div id="table_parent">
				<Table>
					<thead>
						<tr>
							<th>Questions</th>
							<th>Please check the box if the question applies to you.</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Are you a United States Veteran?</td>
							<td>
								If Yes: <input type="checkbox" name="veteran" value="yes" />
							</td>
						</tr>
						<tr>
							<td>Do you have children?</td>
							<td>
								If Yes: <input type="checkbox" name="children" value="yes" />
							</td>
						</tr>
						<tr>
							<td>Are you married?</td>
							<td>
								If Yes: <input type="checkbox" name="married" value="yes" />
							</td>
						</tr>
						<tr>
							<td>Are you renting or do you currently own a home?</td>
							<td>
								If Yes:{" "}
								<input type="checkbox" name="renter/homeowner" value="yes" />
							</td>
						</tr>
						<tr>
							<td>Have you gone hungry more than 2 nights of the week?</td>
							<td>
								If Yes: <input type="checkbox" name="hungry" value="yes" />
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);

		this.survey2 = (
			<div id="table_parent">
				<Table>
					<thead>
						<tr>
							<th>Questions</th>
							<th>Please check the box if the question applies to you.</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Have you slept on the streets?</td>
							<td>
								If Yes: <input type="checkbox" name="housing" value="yes" />
							</td>
						</tr>
						<tr>
							<td>Have you had to skip a meal because you had to pay rent?</td>
							<td>
								If Yes: <input type="checkbox" name="housing" value="yes" />
							</td>
						</tr>
						<tr>
							<td>Do you have enough income for food?</td>
							<td>
								If Yes: <input type="checkbox" name="married" value="yes" />
							</td>
						</tr>
						<tr>
							<td>
								Do you have to reduce the amount of food that you eat because
								you cannot afford to eat more?
							</td>
							<td>
								If Yes:{" "}
								<input type="checkbox" name="renter/homeowner" value="yes" />
							</td>
						</tr>
						<tr>
							<td>
								Have you had to couch surf in order to keep a roof over your
								head?
							</td>
							<td>
								If Yes: <input type="checkbox" name="hungry" value="yes" />
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);

		this.handleContinue = this.handleContinue.bind(this);
		this.handlePrevious = this.handlePrevious.bind(this);
	}

	handleContinue() {
		this.setState({ mode: "survey2" });
	}

	handlePrevious() {
		this.setState({ mode: "survey1" });
	}

	renderSurvey() {
		if (this.state.mode === "survey1") {
			return this.survey1;
		} else {
			return this.survey2;
		}
	}

	renderButton() {
		if (this.state.mode === "survey1") {
			return (
				<div>
					<Button
						onClick={this.handleContinue}
						id="survey_button"
						id="continue_button"
						variant="dark"
					>
						Continue
					</Button>
				</div>
			);
		} else {
			return (
				<div id="prev_and_results_button">
					<Button
						onClick={this.handlePrevious}
						id="survey_button"
						id="previous_button"
						variant="dark"
					>
						Previous
					</Button>
					<Button
						href="/SurveyResults"
						id="survey_button"
						id="see_results_button"
						variant="dark"
					>
						See Results
					</Button>
				</div>
			);
		}
	}

	render() {
		return (
			<div id="main_component_survey">
				<h1 id="directions">
					{" "}
					Please take this quick survey so that we can assess what you may
					qualify for.
				</h1>
				<h2 id="notice">
					{" "}
					Notice: We will be saving yes or no answers to these questions in
					order to determine the effectiveness of this survey. No personal
					information will be saved.{" "}
				</h2>
				<div id="survey-parent">{this.renderSurvey()}</div>
				{this.renderButton()}
				<Button href="/" variant="dark" id="exit_button">
					Exit
				</Button>
			</div>
		);
	}
}
