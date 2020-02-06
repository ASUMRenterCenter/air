import React from "react";
import { Table, Button } from "react-bootstrap";
import "../../CSS/styles.css";

export default class Survey extends React.Component {
	constructor(props) {
		super(props);
		// this.state = { mode: "survey1" };
		this.state = {
			initial: true,
			second: true,
			third: false,
			questions: [],
			questions2: [],
			taxonomies: [],
		}
		this.handleContinue = this.handleContinue.bind(this);
		this.handlePrevious = this.handlePrevious.bind(this);
	}

	componentDidMount (){
			this.props.database('survey_questions').select({
				filterByFormula: '{parent_id} = ""',
			}).eachPage((questions, fetchNextPage) => {
				this.setState(previousState => ({
					questions: questions,
				}));
			});
	}
	list_length = 0;
	componentDidUpdate (){
		console.log("Initial: " +this.state.initial);
		console.log("Second: " + this.state.second);
		if(this.state.taxonomies.length > 0 && this.state.second){
			let list = [];
			for(let i = 0; i < this.state.taxonomies.length; i++){
				var filter = '({parent_id} = ' + this.state.taxonomies[i] + ')';
				this.props.database('survey_questions').select({
					filterByFormula: filter
				}).eachPage((questions, fetchNextPage) => {
					for(let i = 0; i < questions.length; i++){
						if(typeof questions[i].id !== "undefined"){
							list.push(questions[i])
							this.list_length ++;
						}
					}
				})
			}
			this.setState(previousState => ({
				second: false,
				questions2: list,
			}));
		}
		// else if (!this.state.third){
		// 	console.log("Questions2: " + this.state.questions2)
		// 	this.setState(previousState => ({
		// 		third:true
		// 	}));
		// }
		if(this.list_length === 0 && typeof this.state.questions2 === "undefined"){
			console.log(this.list_length)
			this.forceUpdate();
		}

	}

	handleContinue () {
		var list = []
		var checks = document.forms['form-check'];
		for(let i = 0; i < checks.length; i++){
			if(checks[i].checked === true){
				list.push(checks[i].name);
			}
		}

		this.setState(previousState => ({
			initial: false,
			taxonomies: list
		}));
	}

	handlePrevious () {
		this.setState(previousState => ({
			initial: true
		}));
	}

	render(){
		return (<div id="table_parent">
					{this.state.initial? 
						(<form name='form-check'>
							<table className='table'>
							<thead>
								<tr>
									<th>Questions</th>
									<th>Please check the box if the question applies to you.</th>
								</tr>

							</thead>
							<tbody>
								{this.state.questions.map((question, index) => (
									<tr key={question.id}>
										<td>{question.fields['question']}</td>
										<td><label className='form-check-label'>If Yes: </label><input className='form-check-input' type="checkbox" name={question.fields["id"]} value={question.fields['taxonomy']}/></td>
									</tr>
								))
								}
								
							</tbody>
							</table>
							<button
								type='button'
								onClick={this.handleContinue}
								className="btn btn-dark"
								id="survey_button"
								id="continue_button"
							>
								Continue
							</button>
						
						{console.log(this.state.taxonomies)}
						</form>):
						(<form name='form-check'>
							{typeof this.state.questions2[0] !== "undefined"?(
								
								<div>
									{console.log("Got Here")}
									{console.log("Questions2: " + this.state.questions2)}
								<table className='table'>
								<thead>
									<tr>
										<th>Questions</th>
										<th>Please check the box if the question applies to you.</th>
									</tr>
		
								</thead>
								<tbody>
									{this.state.questions2.map((question, index) => (
										<tr key={question.id}>
											{console.log(question.id)}
											<td>{question.fields['question']}</td>
											<td><label className='form-check-label'>If Yes: </label><input className='form-check-input' type="checkbox" name={question.fields["id"]} value={question.fields['taxonomy']}/></td>
										</tr>
									))
									}
									
								</tbody>
								</table>
		
								<div>
									<button
										onClick={this.handlePrevious}
										type='button'
										className="btn btn-dark"
										id="survey_button"
										id="previous_button"
									>
										Previous
									</button>
									<button
										type="submit"
										// role='button'
										// href="/CategoryResultsPage"
										className="btn btn-dark"
										id="survey_button"
										id="see_results_button"
									>
										See Results
									</button>
								</div>
								</div>
							):(null)}
					</form>)
					}
				</div>);
	}

	// 	this.survey1 = (
	// 		<div id="table_parent">
	// 			<Table>
	// 				<thead>
	// 					<tr>
	// 						<th>Questions</th>
	// 						<th>Please check the box if the question applies to you.</th>
	// 					</tr>
	// 				</thead>
	// 				<tbody>
	// 					<tr>
	// 						<td>Are you a United States Veteran?</td>
	// 						<td>
	// 							If Yes: <input type="checkbox" name="veteran" value="yes" />
	// 						</td>
	// 					</tr>
	// 					<tr>
	// 						<td>Do you have children?</td>
	// 						<td>
	// 							If Yes: <input type="checkbox" name="children" value="yes" />
	// 						</td>
	// 					</tr>
	// 					<tr>
	// 						<td>Are you married?</td>
	// 						<td>
	// 							If Yes: <input type="checkbox" name="married" value="yes" />
	// 						</td>
	// 					</tr>
	// 					<tr>
	// 						<td>Are you renting or do you currently own a home?</td>
	// 						<td>
	// 							If Yes:{" "}
	// 							<input type="checkbox" name="renter/homeowner" value="yes" />
	// 						</td>
	// 					</tr>
	// 					<tr>
	// 						<td>Have you gone hungry more than 2 nights of the week?</td>
	// 						<td>
	// 							If Yes: <input type="checkbox" name="hungry" value="yes" />
	// 						</td>
	// 					</tr>
	// 				</tbody>
	// 			</Table>
	// 		</div>
	// 	);

	// 	this.survey2 = (
	// 		<div id="table_parent">
	// 			<Table>
	// 				<thead>
	// 					<tr>
	// 						<th>Questions</th>
	// 						<th>Please check the box if the question applies to you.</th>
	// 					</tr>
	// 				</thead>
	// 				<tbody>
	// 					<tr>
	// 						<td>Have you slept on the streets?</td>
	// 						<td>
	// 							If Yes: <input type="checkbox" name="housing" value="yes" />
	// 						</td>
	// 					</tr>
	// 					<tr>
	// 						<td>Have you had to skip a meal because you had to pay rent?</td>
	// 						<td>
	// 							If Yes: <input type="checkbox" name="housing" value="yes" />
	// 						</td>
	// 					</tr>
	// 					<tr>
	// 						<td>Do you have enough income for food?</td>
	// 						<td>
	// 							If Yes: <input type="checkbox" name="married" value="yes" />
	// 						</td>
	// 					</tr>
	// 					<tr>
	// 						<td>
	// 							Do you have to reduce the amount of food that you eat because
	// 							you cannot afford to eat more?
	// 						</td>
	// 						<td>
	// 							If Yes:{" "}
	// 							<input type="checkbox" name="renter/homeowner" value="yes" />
	// 						</td>
	// 					</tr>
	// 					<tr>
	// 						<td>
	// 							Have you had to couch surf in order to keep a roof over your
	// 							head?
	// 						</td>
	// 						<td>
	// 							If Yes: <input type="checkbox" name="hungry" value="yes" />
	// 						</td>
	// 					</tr>
	// 				</tbody>
	// 			</Table>
	// 		</div>
	// 	);

	// 	this.handleContinue = this.handleContinue.bind(this);
	// 	this.handlePrevious = this.handlePrevious.bind(this);
	// }

	// handleContinue() {
	// 	this.setState({ mode: "survey2" });
	// }

	// handlePrevious() {
	// 	this.setState({ mode: "survey1" });
	// }

	// renderSurvey() {
	// 	if (this.state.mode === "survey1") {
	// 		return this.survey1;
	// 	} else {
	// 		return this.survey2;
	// 	}
	// }

	// renderButton() {
	// 	if (this.state.mode === "survey1") {
	// 		return (
	// 			<div>
	// 				<Button
	// 					onClick={this.handleContinue}
	// 					id="survey_button"
	// 					id="continue_button"
	// 					variant="dark"
	// 				>
	// 					Continue
	// 				</Button>
	// 			</div>
	// 		);
	// 	} else {
	// 		return (
	// 			<div id="prev_and_results_button">
	// 				<Button
	// 					onClick={this.handlePrevious}
	// 					id="survey_button"
	// 					id="previous_button"
	// 					variant="dark"
	// 				>
	// 					Previous
	// 				</Button>
	// 				<Button
	// 					href="/SurveyResults"
	// 					id="survey_button"
	// 					id="see_results_button"
	// 					variant="dark"
	// 				>
	// 					See Results
	// 				</Button>
	// 			</div>
	// 		);
	// 	}
	// }

	// render() {
	// 	return (
	// 		<div id="main_component_survey">
	// 			<h1 id="directions">
	// 				{" "}
	// 				Please take this quick survey so that we can assess what you may
	// 				qualify for.
	// 			</h1>
	// 			<h2 id="notice">
	// 				{" "}
	// 				Notice: We will be saving yes or no answers to these questions in
	// 				order to determine the effectiveness of this survey. No personal
	// 				information will be saved.{" "}
	// 			</h2>
	// 			<div id="survey-parent">{this.renderSurvey()}</div>
	// 			{this.renderButton()}
	// 			<Button href="/" variant="dark" id="exit_button">
	// 				Exit
	// 			</Button>
	// 		</div>
	// 	);
	// }
}
