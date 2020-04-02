import React from "react"
import MapAccordion from "./MapAccordion.js"
import "../../CSS/ComponentStyle.css"


export default class ResultMoreInfoBody extends React.Component{
  render(){
    return(
      <div>
        <p>Organization URL: <a href={this.props.agency_website}>{this.props.agency_website}</a></p>
        <p>Phone: {this.props.phone_number}</p>
        <p>Email: {this.props.email}</p>
        <p>Address: {this.props.address}, {this.props.city}, {this.props.state} {this.props.zip_code}</p>
        <MapAccordion 
         agency_id={this.props.agency_id}/>
      </div>
    )
  }
}
