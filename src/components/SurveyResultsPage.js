import React from 'react';
import { Row, Col, Image, Button, Jumbotron } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import SurveyResultSection from './SurveyResultSection.js';
import '../CSS/ComponentStyle.css';
import PrintSaveShare from './PrintSaveShare';
import PrintButton from './PrintButton';



function SurveyResultsPage() {
  return (
    <div>
      <Jumbotron>
        <h4>Need Assesment Survey Results: </h4>
        <h5>You may qualify for:</h5>
        <div id="printSaveShare">
          <PrintButton></PrintButton>
        </div>
      </Jumbotron>
      <SurveyResultSection />
      <br />
      <SurveyResultSection />
      <br />
      <SurveyResultSection />
    </div>
  )
}

export default SurveyResultsPage;
