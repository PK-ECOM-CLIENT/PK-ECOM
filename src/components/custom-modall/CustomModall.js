import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./customModall.css";
import { useDispatch, useSelector } from "react-redux";
import { setApplicationModal } from "../../slices/system/systemSlice";
const CustomModall = ({ title, children }) => {
  const { applicationModal } = useSelector((state) => state.system);
  const dispatch=useDispatch()
  return (
    <Modal
      show={applicationModal}
      onHide={()=>dispatch(setApplicationModal())}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      backdropClassName="custom-backdrop"
      className="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={"make it disappear"}>Close if necessary</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default CustomModall;
