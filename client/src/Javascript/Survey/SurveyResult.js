import React from "react"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import "../../CSS/ComponentStyle.css"
import ResultMoreInfoBody from '../CategoryResults/ResultMoreInfoBody'

var showWhat = "Show More";
function CustomToggle({ children, eventKey, agency_name, agency_website, thisClass}) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    if (showWhat === "Show More"){
      showWhat = "Show Less";
    } else {
      showWhat = "Show More";
    }
    thisClass.setState({
      showWhat: showWhat
    })
  });

  return (
    <div>
      <div>
        <h5 style = {{float: "left"}}>{agency_name} : <a href={agency_website}>{agency_website}</a></h5>
      </div>
      <div>
        <Button
          type="button"
          variant="dark"
          style={{float: "right"}}
          onClick={decoratedOnClick}
        >
          {children}
        </Button>
      </div>
    </div>
  );
}

export default class SurveyResult extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      phone_number: this.props.phone_number,
      showWhat: "Show More",
    }
  }

  componentDidMount() {
    this.props.database('phones').find(this.state.phone_number, (err, phone) => {
      this.setState(previousState => ({
        phone_number: phone.fields['number'],
      }));
    });
  }

  render () {
      return (
        <div>
          <Accordion>
            <Card>
              <Card.Header>
                <CustomToggle eventKey="0"
                agency_name = {this.props.agency_name}
                agency_website = {this.props.agency_website}
                thisClass = {this}>
                  {this.state.showWhat}
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <ResultMoreInfoBody
                    agency_id={this.props.agency_id}
                    phone_number={this.state.phone_number}
                    email={this.props.email}
                    address={this.props.address}
                    city={this.props.city}
                    state={this.props.state}
                    zip_code={this.props.zip_code}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      );
    }
}
CustomToggle({ children, eventKey, agency_name, agency_website}) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    null,
  );

  return (
    <div>
      <div>
        <h5 style = {{float: "left"}}>{agency_name} : <a href={agency_website}>{agency_website}</a></h5>
      </div>
      <div>
        <Button
          type="button"
          variant="dark"
          style={{float: "right"}}
          onClick={decoratedOnClick}
        >
          {children}
        </Button>
      </div>
    </div>
  );
}