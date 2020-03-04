import React from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import SaveDropdown from "./SaveDropdown"

function PrintSaveShare() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Print / Save / Share
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Print / Save / Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="dark">
            Print
          </Button>
          <SaveDropdown id="saveDropdownLoc" />
          <p>Copy link to share: https://FakeLinkIMadeUp.url.umt.mt.edu.gov.com</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default PrintSaveShare
