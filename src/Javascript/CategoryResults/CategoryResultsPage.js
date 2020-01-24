import React from 'react';
// import { Jumbotron } from 'react-bootstrap';
import SurveyResult from './SurveyResult';
import PrintSaveShare from "./PrintSaveShare";
import '../../CSS/ComponentStyle.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';



export default class CategoryResultsPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        name: this.props.match.params.name,
        taxonomies: [],
    }
  }
    componentDidMount() {
      this.props.database('taxonomy').select({
        filterByFormula: '{parent_id} = ""',
        view: "Grid view",
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
  render(){
    return (
      <div>
        <div className="jumbotron">
          <h4>{this.state.name} Results: </h4>
          <div id="printSaveShare">
            <PrintSaveShare />
          </div>
        </div>
        {this.state.taxonomies.length > 0 ? (
          this.state.taxonomies.map((taxonomy, index) =>
            <div>
              <SurveyResult />
              <br />
            </div>
          )
          ):("")
        }
      </div>
    );
  }
}
