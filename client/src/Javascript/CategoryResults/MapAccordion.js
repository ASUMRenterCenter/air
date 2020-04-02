import React from "react"
import Button from "react-bootstrap/Button"
import "../../CSS/ComponentStyle.css"
import Card from "react-bootstrap/Card"
import Accordion from "react-bootstrap/Accordion"


class MapAccordion extends React.Component{
  render(){
    var href_string = "/AgencyInfoPage/" + this.props.agency_id; 
    return(
      <div class='alignCenter'>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
              </Accordion.Toggle>
              <Button id='moreInfoButton' href={href_string} variant="dark"><p>View More Information</p></Button>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    )
  }
}



export default MapAccordion
