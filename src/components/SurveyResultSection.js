import React from "react"
import SurveyResult from "./SurveyResult"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import "../CSS/ComponentStyle.css"


class SurveyResultSection extends React.Component{
  render(){
    return(
      <Card id="resultCard">
        <h3 class = "centered text-color">Assistance Category</h3>
        <SurveyResult />
        <SurveyResult />
        <SurveyResult />
        <SurveyResult />
        <Button id="viewAllButton" variant="dark">View all for this Category</Button>
      </Card>
    )
  }
}






export default SurveyResultSection
