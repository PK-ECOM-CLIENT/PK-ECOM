import React from "react";
import { Button, Modal } from "react-bootstrap";

const CustomModall = () => {
  return (
    <Modal
      show={true}
      onHide={"change the status of showing modal to false"}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        body of modal
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={"make it disappear"}>Close if necessary</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModall;
