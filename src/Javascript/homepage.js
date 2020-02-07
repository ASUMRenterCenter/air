import React, { Component } from "react";

import history from "./history";
import "../CSS/styles.css";
import "./hotlinebar.js";
import survey from "../Images/ButtonImages/survey.png";

export default class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taxonomies: [],
			mobile: window.innerWidth <= 760
		};
		this.surveyClick = this.surveyClick.bind(this);
	}

	componentDidMount() {
		var taxonomy_array = []
		this.props.database('taxonomy').select({
			filterByFormula: '{parent_id} = ""',
			view: "Grid view",
		}).eachPage((taxonomies, fetchNextPage) => {
			if(!this.state.mobile){
				for(let i = 0; i < taxonomies.length -2; i+=3){
					var row = (<div className="row" key={i}>
									<div className="col" key={taxonomies[i].id}>
										<div className="card-deck taxonomy-btn-outline">
											<div className="card btn" id="taxonomy-btn-card">
												<button
													onClick={e =>
														this.handleClick(
															taxonomies[i].fields["name"],
															taxonomies[i].fields["id"],
															e
														)
													}
													type="button"
													className="btn btn-secondary"
													id="taxonomy-button"
													data-toggle="tooltip"
													data-placement="bottom"
													title={taxonomies[i].fields["x-description"]}
												>
													<TaxonomyCard {...taxonomies[i].fields} />
												</button>
											</div>
										</div>
									</div>
									<div className="col" key={taxonomies[i + 1].id}>
										<div className="card-deck taxonomy-btn-outline">
											<div className="card btn" id="taxonomy-btn-card">
												<button
													onClick={e =>
														this.handleClick(
															taxonomies[i + 1].fields["name"],
															taxonomies[i + 1].fields["id"],
															e
														)
													}
													type="button"
													className="btn btn-secondary"
													id="taxonomy-button"
													data-toggle="tooltip"
													data-placement="bottom"
													title={taxonomies[i + 1].fields["x-description"]}
												>
													<TaxonomyCard {...taxonomies[i + 1].fields} />
												</button>
											</div>
										</div>
									</div>
									<div className="col" key={taxonomies[i + 2].id}>
										<div className="card-deck taxonomy-btn-outline">
											<div className="card btn" id="taxonomy-btn-card">
												<button
													onClick={e =>
														this.handleClick(
															taxonomies[i + 2].fields["name"],
															taxonomies[i + 2].fields["id"],
															e
														)
													}
													type="button"
													className="btn btn-secondary"
													id="taxonomy-button"
													data-toggle="tooltip"
													data-placement="bottom"
													title={taxonomies[i + 2].fields["x-description"]}
												>
													<TaxonomyCard {...taxonomies[i + 2].fields} />
												</button>
											</div>
										</div>
									</div>
								</div>
							);
							taxonomy_array.push(row);
						}
					} else {
						for (let i = 0; i < taxonomies.length; i++) {
							var row = (
								<div className="row" key={i}>
									<div className="col" key={taxonomies[i].id}>
										<div className="card-deck taxonomy-btn-outline">
											<div className="card btn" id="taxonomy-btn-card">
												<button
													onClick={e =>
														this.handleClick(
															taxonomies[i].fields["name"],
															taxonomies[i].fields["id"],
															e
														)
													}
													type="button"
													className="btn btn-secondary"
													id="taxonomy-button"
													data-toggle="tooltip"
													data-placement="bottom"
													title={taxonomies[i].fields["x-description"]}
												>
													<TaxonomyCard {...taxonomies[i].fields} />
												</button>
											</div>
										</div>
									</div>
								</div>
							);
							taxonomy_array.push(row);
						}
					}
					this.setState(previousState => ({
						taxonomies: taxonomy_array
					}));
					// this.setState({
					// 	taxonomies
					// });
					console.log(taxonomies);
					fetchNextPage();
				},
				function done(error) {
					console.log("Will Return An Error:" + error);
				}
			);
	}

	handleClick(name, id, e) {
		{
			history.push("/ButtonResults/" + name + "/" + id);
		}
	}
	// openNav() {
	//     document.getElementById("mySidebar").style.width = "250px";
	//     document.getElementById("main").style.marginRight = "250px";
	// }

	surveyClick(e) {
		history.replace("/Survey");
	}

	render() {
		return (
			<div className="buttonpagescolumn width85">
				<h1>What resources can we help you find?</h1>
				<a
					role="button"
					className="btn btn-light Fixed right"
					href="#"
					onClick={this.surveyClick}
					id="gotosurveybutton"
				>
					<img src={survey} id="surveyimg" />
					<h1 id="btn-text">
						Need Help Choosing a Resource? Click here to take a quick survey.
					</h1>
				</a>
				<div className="container mt-3">
					{this.state.taxonomies.length > 0
						? this.state.taxonomies.map(row => row)
						: null}
				</div>

				{/* <div className ="container mt-3" >
					<div className="row card-container">
						{this.state.taxonomies.length > 0 ? (
							this.state.taxonomies.map((taxonomy, index) => 
								<div className="col">
									<div className="card-deck">
										<div className="card btn">
											<button onClick={(e) => this.handleClick(taxonomy.fields['name'], taxonomy.fields['id'], e)} type="button" className="btn btn-secondary taxonomy-button" data-toggle="tooltip" data-placement="bottom" title={taxonomy.fields['x-description']}>
												<TaxonomyCard {...taxonomy.fields} />
											</button>
										</div>
									</div>
								</div>
							)
						):("")
						}
					</div>
				</div> */}
				<div className="whitespace"></div>
			</div>
		);
	}

	// 		{taxonomy.fields['description']}
	// 	</div>
	// 	)
	// 	) : (
	// 	<p>Loading...</p>
	// 	)}

	// render() {
	// 	return (
	// 		<div id="parent">
	// 			<div id="main-component-home">
	// 				<h1 id="help_text">What resources can we help you find?</h1>
	// 				<Container id="button-grid" class="centered">
	// 					<Row>
	// 						<Col id="col">
	// 							<Button
	// 								size="lg"
	// 								href="./ButtonResults"
	// 								id="navbar-button"
	// 								variant="outline-dark"
	// 								font-size="100%"
	// 							>
	// 								<Image src={emergency} height="50%" width="50%" />
	// 								<h1 id="btn-text">Emergency</h1>
	// 							</Button>
	// 						</Col>
	// 						<Col id="col">
	// 							<Button
	// 								href="./ButtonResults"
	// 								id="navbar-button"
	// 								variant="outline-dark"
	// 							>
	// 								<Image src={food} height="50%" width="50%" />
	// 								<h1 id="btn-text">Food</h1>
	// 							</Button>
	// 						</Col>
	// 						<Col id="col">
	// 							<Button
	// 								href="./ButtonResults"
	// 								id="navbar-button"
	// 								variant="outline-dark"
	// 							>
	// 								<Image src={housing} height="50%" width="50%" />
	// 								<h1 id="btn-text">Housing</h1>
	// 							</Button>
	// 						</Col>
	// 					</Row>
	// 					<Row>
	// 						<Col id="col">
	// 							<Button
	// 								href="./ButtonrRsults"
	// 								id="navbar-button"
	// 								variant="outline-dark"
	// 							>
	// 								<Image src={goods} height="50%" width="50%" />
	// 								<h1 id="btn-text">Goods</h1>
	// 							</Button>
	// 						</Col>
	// 						<Col id="col">
	// 							<Button
	// 								href="./ButtonResults"
	// 								id="navbar-button"
	// 								variant="outline-dark"
	// 							>
	// 								<Image src={transit} height="50%" width="50%" />
	// 								<h1 id="btn-text">Transit</h1>
	// 							</Button>
	// 						</Col>
	// 						<Col id="col">
	// 							<Button
	// 								href="./ButtonResults"
	// 								id="navbar-button"
	// 								variant="outline-dark"
	// 							>
	// 								<Image src={health} height="50%" width="50%" />
	// 								<h1 id="btn-text">Health</h1>
	// 							</Button>
	// 						</Col>
	// 					</Row>
	// 					<Row>
	// 						<Col id="col">
	// 							<Button
	// 								href="./ButtonResults"
	// 								id="navbar-button"
	// 								variant="outline-dark"
	// 							>
	// 								<Image src={money} height="50%" width="50%" />
	// 								<h1 id="btn-text">Money</h1>
	// 							</Button>
	// 						</Col>
	// 						<Col id="col">
	// 							<Button
	// 								href="./ButtonResults"
	// 								id="navbar-button"
	// 								variant="outline-dark"
	// 							>
	// 								<Image src={care} height="50%" width="50%" />
	// 								<h1 id="btn-text">Care</h1>
	// 							</Button>
	// 						</Col>
	// 						<Col id="col">
	// 							<Button
	// 								href="./ButtonResults"
	// 								id="navbar-button"
	// 								variant="outline-dark"
	// 							>
	// 								<Image src={education} height="50%" width="50%" />
	// 								<h1 id="btn-text">Education</h1>
	// 							</Button>
	// 						</Col>
	// 					</Row>
	// 					<Row>
	// 						<Col id="col">
	// 							<Button
	// 								href="./ButtonResults"
	// 								id="navbar-button"
	// 								variant="outline-dark"
	// 							>
	// 								<Image src={work} height="40%" width="40%" />
	// 								<h1 id="btn-text">Work</h1>
	// 							</Button>
	// 						</Col>
	// 						<Col id="col">
	// 							<Button
	// 								href="./ButtonResults"
	// 								id="navbar-button"
	// 								variant="outline-dark"
	// 							>
	// 								<Image src={legal} height="40%" width="40%" />
	// 								<h1 id="btn-text">Legal</h1>
	// 							</Button>
	// 						</Col>
	// 					</Row>
	// 				</Container>
	// 				<Button
	// 					href="./Survey"
	// 					height="50%"
	// 					width="50%"
	// 					variant="outline-dark"
	// 					id="navbar-button-survey"
	// 				>
	// 					<Image src={survey} height="10%" width="10%" />
	// 					<h1 id="btn-text">Unsure? Click to take a survey.</h1>
	// 				</Button>

	// 				<div class="event-component">
	// 					<table id="event-table">
	// 						<tr>
	// 							<th id="events-heading">Events</th>
	// 						</tr>
	// 						<div id="scrollable">
	// 							<tr>
	// 								<td>November 21, 2019</td>
	// 							</tr>
	// 							<td>Hot Meal</td>
	// 							<tr>
	// 								<td>- Poverello Center</td>
	// 							</tr>
	// 							<tr>
	// 								<td>- Address:</td>
	// 							</tr>
	// 							<tr>
	// 								<td>1110 W Broadway</td>
	// 							</tr>
	// 							<tr>
	// 								<td>Missoula, MT 59802</td>
	// 							</tr>
	// 							<tr>
	// 								<td>- Phone Number:</td>
	// 							</tr>
	// 							<tr>
	// 								<td>xxx-xxx-xxxx</td>
	// 							</tr>
	// 						</div>
	// 					</table>
	// 				</div>
	// 				<div id="white-space"></div>
	// 			</div>
	// 			<div id="hotline-component">
	// 				<div id="hotline-text">
	// 					<div id="wrapper">
	// 						<h1 class="hotline-titles">
	// 							<Image src={phone} height="30px" width="30px" />
	// 							Emergency
	// 						</h1>
	// 						<h2 class="hotline-numbers">911</h2>
	// 					</div>
	// 					<div id="wrapper">
	// 						<h1 class="hotline-titles">
	// 							<Image src={phone} height="30px" width="30px" />
	// 							Suicide Hotline
	// 						</h1>
	// 						<h2 class="hotline-numbers">1-800-273-8255</h2>
	// 					</div>
	// 					<div id="wrapper">
	// 						<h1 class="hotline-titles">
	// 							<Image src={phone} height="30px" width="30px" />
	// 							Domestic Violence Hotline
	// 						</h1>
	// 						<h2 class="hotline-numbers">1−800−799−7233</h2>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// }
}
// function handleClick(id, e) {
// 	console.log("Clicked")
// 	useHistory.push({ //browserHistory.push should also work here
// 		pathname: "./buttonresults",
// 		state: {parent_id: id}
// 	});
// }

const TaxonomyCard = ({ id, name, description, image }) => (
	<div className="card-div">
		{typeof image !== "undefined" ? (
			<img id="card-img" src={image[0].url} alt={name} />
		) : (
			<div id="img-rep"></div>
		)}
		<div className="card-body">
			<h5 id="card-title">{name}</h5>
		</div>
	</div>
);
