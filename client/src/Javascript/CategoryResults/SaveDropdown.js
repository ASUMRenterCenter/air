import React from "react"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"


function SaveDropdown() {
  return (
    <div>
      <DropdownButton id="dropdown-basic-button" title="Save as: " variant="dark">
        <Dropdown.Item href="#/action-1">PDF</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Text</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
    </div>
  )
}


export default SaveDropdown
