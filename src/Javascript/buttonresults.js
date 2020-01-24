import React from "react";
import Airtable from 'airtable';
import history from './history';
import { Button, Image, Container, Row, Col} from '../../node_modules/react-bootstrap';
import "../CSS/buttonresults.css";
import community_garden from "../Images/ButtonImages/community_garden.png";
import food from "../Images/ButtonImages/food.png";
import emergency_food from "../Images/ButtonImages/emergency_food.png";
import food_delivery from "../Images/ButtonImages/food_delivery.png";
import benefit from "../Images/ButtonImages/benefit.png";
import nutrition from "../Images/ButtonImages/nutrition.png";
import money from "../Images/ButtonImages/money.png";
import see_all from "../Images/ButtonImages/see_all.png";
import phone from "../Images/ButtonImages/phone.png";

const base = new Airtable({ apiKey: 'key68OVjXXeLKQuEl' }).base('app6JuPyfzqD3RZiA');

export default class buttonresults extends React.Component{
   constructor(props) {
      super(props);
		this.state = {
         taxonomies: [],
         parent_id: this.props.match.params.parent_id,
		}
   }

   componentDidMount() {
      //this.find_ids()
      var filter = "({parent_id} = '" + this.state.parent_id + "')";
      // '{parent_id} = ""'
		base('taxonomy').select({
         filterByFormula: filter,
         view : "Grid view",
		}).eachPage((taxonomies, fetchNextPage) => {
			this.setState({
				taxonomies
			});
			console.log(taxonomies)
			fetchNextPage();
		}, function done(error) {
			console.log(error);
		});
	}

	handleClick(id, e){
		{history.push('/ButtonResults/' + id)} 
	}

   render (){
      return (
			<div className="outermost">
				{this.state.taxonomies.length > 0 ? (
               this.state.taxonomies.map((taxonomy, index) =>
               
					<div className ="container mt-3" key={taxonomy['id']}>
						<div className="row">
							<div className="col">
								<div className="card-deck">
									<div className="card btn">
										<button onClick={(e) => this.handleClick(taxonomy.fields['id'], e)} type="button" className="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title={taxonomy.fields['x-description']}>
											<TaxonomyCard {...taxonomy.fields} />
										</button>		
									</div>
								</div>
							</div>
						</div>
						</div>
					)
				):(<p>FIXME: If the button results taxonomies array is empty goto agency results page. Will modify buttonresults.js line 80 once the agency results page is setup.</p>)
				}
			</div>
		)
   }
   // mypath (){
   //    return (this.props)
   // }

   // render (){
   //    return (
   //       <div id="parent">
   //          <div id="main-component-btn-results">
   //             <h2 style={{color: 'white'}}>The ID: {this.state.id}</h2>
   //             <h1 id="help_text">You chose Food. Can we narrow the resources down further for you?</h1>
   //             <Container id="button-grid" className ="centered">
   //                <Row>
   //                   <Col id="col"><Button size="lg" href = '/CategoryResults' id="navbar-button" variant="outline-dark" font-size="100%"><Image src={community_garden} height="30%" width="20%" /><h1 id='btn-text'>Community Gardens</h1></Button></Col>
   //                   <Col id="col"><Button href = '/CategoryResults' id="navbar-button" variant="outline-dark"><Image src={emergency_food} height="30%" width="20%" /><h1 id='btn-text'>Emergency Food</h1></Button></Col>
   //                   <Col id="col"><Button href = '/CategoryResults' id="navbar-button" variant="outline-dark"><Image src={food_delivery} height="30%" width="20%" /><h1 id='btn-text'>Food Delivery</h1></Button></Col>
   //                </Row>
   //                <Row>
   //                   <Col id="col"><Button href = '/CategoryResults' id="navbar-button" variant="outline-dark"><Image src={food} height="30%" width="20%" /><h1 id='btn-text'>Food Pantry</h1></Button></Col>
   //                   <Col id="col"><Button href = '/CategoryResults' id="navbar-button" variant="outline-dark"><Image src={money} height="30%" width="20%" /><h1 id='btn-text'>Free Meals</h1></Button></Col>
   //                   <Col id="col"><Button href = '/CategoryResults' id="navbar-button" variant="outline-dark"><Image src={money} height="30%" width="20%" /><h1 id='btn-text'>Help Pay for Food</h1></Button></Col>
   //                </Row>
   //                <Row>
   //                   <Col id="col"><Button href = '/CategoryResults' id="navbar-button" variant="outline-dark"><Image src={benefit} height="30%" width="20%" /><h1 id='btn-text'>Food Benefits</h1></Button></Col>
   //                   <Col id="col"><Button href = '/CategoryResults' id="navbar-button" variant="outline-dark"><Image src={nutrition} height="30%" width="20%" /><h1 id='btn-text'>Nutrition</h1></Button></Col>
   //                </Row>
   //             </Container>
   //             <Button href = '/CategoryResults' height="50%" width="50%" variant="outline-dark" id="navbar-button-survey"><Image src={see_all} height="10%" width="10%" /><h1 id='btn-text'>See All Results</h1></Button>
   //             <Button href='./' id='br-back-button' variant='light'>Back</Button>
   //          </div>
   //          <div id="hotline-component">
   //             <div id="hotline-text">
   //                <div id="wrapper">
   //                   <h1 className="hotline-titles"><Image src={phone} height="30px" width="30px" />Emergency</h1>
   //                   <h2 className="hotline-numbers">911</h2>
   //                </div>
   //                <div id="wrapper">
   //                   <h1 className="hotline-titles"><Image src={phone} height="30px" width="30px" />Suicide Hotline</h1>
   //                   <h2 className="hotline-numbers">1-800-273-8255</h2>
   //                </div>
   //                <div id="wrapper">
   //                   <h1 className="hotline-titles"><Image src={phone} height="30px" width="30px" />Domestic Violence Hotline</h1>
   //                   <h2 className="hotline-numbers">1−800−799−7233</h2>
   //                </div>
   //             </div>
   //          </div>
   //       </div>
   //    );
   // }
};

const TaxonomyCard = ({id, name, description, image}) => (
	<div>
      {typeof image !== 'undefined'? <img className="card-img-top" src={image[0].url} alt={name} /> : null}
		<div className="card-body">
			<h5 className="card-title">{name}</h5>
		</div>
	</div>				

);