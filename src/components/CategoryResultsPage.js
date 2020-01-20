import React from 'react';
import { Row, Col, Image, Button, Jumbotron } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import SurveyResultSection from './SurveyResultSection.js';
import SurveyResult from './SurveyResult';
import PrintSaveShare from "./PrintSaveShare";
import '../CSS/ComponentStyle.css';



function CategoryResultsPage() {
  return (
    <div>
      <Jumbotron>
        <h4>[Category] Results: </h4>
        <div id="printSaveShare">
          <PrintSaveShare />
        </div>
      </Jumbotron>
      <SurveyResult />
      <br />
      <SurveyResult />
      <br />
      <SurveyResult />
      <br />
      <SurveyResult />
      <br />
      <SurveyResult />
      <br />
      <SurveyResult />
      <br />
      <SurveyResult />
      <br />
      <SurveyResult />
      <br />
      <SurveyResult />
    </div>
  )
}

export default CategoryResultsPage;
