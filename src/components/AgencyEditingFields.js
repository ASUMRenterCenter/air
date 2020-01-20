import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../CSS/ComponentStyle.css'
import {Col} from "react-bootstrap"
import SaveChangesButton from "./SaveChangesButton.js"



function AgencyEditingFields() {
  return (
    <div>
      <Form>
        <div class="ServiceEditingChunk1">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Agency Name</Form.Label>
            <Form.Control type="email" placeholder="[Current Agency Name]" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="email" placeholder="406-XXX-XXXX" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="CurrentEmail@org.com" />
          </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control placeholder="Missoula" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control as="select">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>ZipCode</Form.Label>
                <Form.Control placeholder="59801" />
              </Form.Group>
            </Form.Row>
          </div>

          <div class="ServiceDescriptionField">
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Service 1</Form.Label>
              <Form.Control placeholder="Soup Time" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Service 1 Description</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="We have soup at this time" />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Service 2</Form.Label>
              <Form.Control placeholder="Soup Time" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Service 2 Description</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="We have soup at this time" />
            </Form.Group>
          </div>
          <div class="ServiceDescriptionField">
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Service 3</Form.Label>
            <Form.Control placeholder="Soup Time" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Service 3 Description</Form.Label>
            <Form.Control as="textarea" rows="3" placeholder="We have soup at this time" />
          </Form.Group>
          <SaveChangesButton />
          </div>
      </Form>

    </div>
  )
}

export default AgencyEditingFields;
