import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { setModalShow } from "../../slices/system/systemSlice";
import { useSelector, useDispatch } from "react-redux";

export const CustomModal = () => {
  const dispatch = useDispatch();

  const { modalShow } = useSelector((state) => state.system);
  return (
    <Modal
      show={modalShow}
      onHide={() => dispatch(setModalShow())}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Notice!!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        For a better experience, consider selecting categories or products with
       the star, as not all categories or products have been assigned the items.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(setModalShow())}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
