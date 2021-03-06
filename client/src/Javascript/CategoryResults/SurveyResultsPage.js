import React from 'react';
import { Jumbotron } from 'react-bootstrap'
import SurveyResultSection from './SurveyResultSection.js'
import '../../CSS/ComponentStyle.css'
import PrintButton from '../../components/PrintButton'



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
