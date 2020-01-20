import React from 'react';
import { Navbar, Nav, Button } from '../../node_modules/react-bootstrap';
import "../CSS/exitbutton.css";

export default class exitbutton extends React.Component{
   render(){
      return (
         <Nav className="exit_button" id="flash-button">
         <Button id="flash-button" className ="center" href="https://www.google.com"><Navbar.Text id="button-exit-text">Exit Now</Navbar.Text><Navbar.Text id="button-description">If you are in an unsafe environment, click this button to quickly go to Google.com. Remember to clear your web history.</Navbar.Text></Button>
         </Nav>
      );
   }
};

//export default exitbutton;