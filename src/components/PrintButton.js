import React from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"


function PrintButton() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={() => window.print()}>
        Print
      </Button>
    </>
  );
}


export default PrintButton
