import React from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import SaveDropdown from "./SaveDropdown"

function SavePageButton() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Save
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How would you like to save the file?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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


export default SavePageButton
