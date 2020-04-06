import React from "react"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import "../../CSS/ComponentStyle.css"
import ResultMoreInfoBody from './ResultMoreInfoBody'

var showWhat = "Show More";
function CustomToggle({ children, eventKey, agency_name, thisClass}) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    if (showWhat === "Show More"){
      showWhat = "Show Less";
    } else {
      showWhat = "Show More";
    }
    console.log(showWhat);

    thisClass.setState({
      showWhat: showWhat
    })
  });

  return (
    <div class='alignCenter'>
      <div>
        <h5 class='orgText'>{agency_name}</h5>
      </div>
      <div>
        <Button
          type="button"
          variant="dark"
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
      showWhat: "Show More"
    }
  }

  componentDidMount() {
    this.props.database('phones').find(this.state.phone_number, (err, phone) => {
      console.log(phone);
      if(phone.fields['number'] !== "undefined"){
        this.setState(previousState => ({
          phone_number: phone.fields['number'],
        }));
      }
      else{
        console.log("Undefined phone")
        this.setState(previousState => ({
          phone_number: "undefined",
        }));
      }

    });
    console.log(showWhat);
  }



  render () {
      return (
        <div class='accordionDiv'>
          <Accordion>
            <Card>
              <Card.Header>
                <CustomToggle eventKey="0"
                onClick={event => this.myFunction(event)}
                agency_name = {this.props.agency_name}
                thisClass = {this}>
                  {this.state.showWhat}
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <ResultMoreInfoBody
                    agency_id={this.props.agency_id}
                    phone_number={this.state.phone_number}
                    agency_website = {this.props.agency_website}
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
