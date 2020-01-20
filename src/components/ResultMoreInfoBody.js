import React from "react"
import Button from "react-bootstrap/Button"
import MapAccordion from "./MapAccordion.js"
import "../CSS/ComponentStyle.css"


class ResultMoreInfoBody extends React.Component{
  render(){
    return(
      <div>
        <p>Phone: XXX-XXX-XXX</p>
        <p>Email: oranizationEmail@org.com</p>
        <p>Address: 123 Address Road, Missoula Mt</p>
        <MapAccordion />
      </div>
    )
  }
}



export default ResultMoreInfoBody
