import React from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import SaveDropdown from "./SaveDropdown"

function SavePageButton() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Pdf targetRef={ref} filename="code-example.pdf">
    {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
  </Pdf>
  );
}


export default SavePageButton
