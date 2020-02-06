import React from "react"
import MapAccordion from "./MapAccordion.js"
import "../../CSS/ComponentStyle.css"


export default class ResultMoreInfoBody extends React.Component{
  constructor(props) {
		super(props);
	}
  render(){
    return(
      <div>
        <p>Phone: {this.props.phone_number}</p>
        <p>Email: {this.props.email}</p>
        <p>Address: {this.props.address}, {this.props.city} {this.props.state} {this.props.zip_code}</p>
        <MapAccordion 
         agency_id={this.props.agency_id}/>
      </div>
    )
  }
}
