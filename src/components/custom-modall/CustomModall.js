import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./customModall.css";
const CustomModall = ({ children }) => {
  return (
    <Modal
      show={true}
      onHide={"change the status of showing modal to false"}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      backdropClassName="custom-backdrop"
      className="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={"make it disappear"}>Close if necessary</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModall;
