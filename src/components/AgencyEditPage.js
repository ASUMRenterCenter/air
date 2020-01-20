import React from 'react';
import { Row, Col, Image, Button, Jumbotron } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import SurveyResultSection from './SurveyResultSection.js'
import SurveyResult from './SurveyResult'
import '../CSS/ComponentStyle.css'
import PrintSaveShare from './PrintSaveShare'
import AgencyEditingFields from './AgencyEditingFields'



function AgencyEditPage() {
  return (
    <div>
      <Jumbotron>
        <h1>[Agency Name] Information</h1>
        <p>Click below to edit</p>
      </Jumbotron>
      <div>
        <AgencyEditingFields />
      </div>
    </div>
  )
}

export default AgencyEditPage;
