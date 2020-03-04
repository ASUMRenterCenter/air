import React from "react"
import Button from "react-bootstrap/Button"
import "../../CSS/ComponentStyle.css"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"


class MapAccordion extends React.Component{
  render(){
    var href_string = "/AgencyInfoPage/" + this.props.agency_id; 
    return(
      <div>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Click here to view on Map
              </Accordion.Toggle>
              <Button id='moreInfoButton' href={href_string} variant="dark"><p>View More Information</p></Button>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h1>Imagine there's a map here</h1>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    )
  }
}



export default MapAccordion
