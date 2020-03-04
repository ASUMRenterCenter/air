import React from 'react';
import { Jumbotron } from 'react-bootstrap'
import '../CSS/ComponentStyle.css'
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
