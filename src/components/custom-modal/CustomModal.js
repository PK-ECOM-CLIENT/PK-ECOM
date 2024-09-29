import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./customModal.css";
import { useDispatch, useSelector } from "react-redux";
import { setApplicationModal } from "../../slices/system/systemSlice";
import PaymentDetails from "../Payment-details/PaymentDetails";
import ContactSeller from "../contact-seller/ContactSeller";
import ReportItem from "../report-item/ReportItem";
import LeaveReview from "../leave-review/LeaveReview";
export const CustomModal = () => {
  const { applicationModal } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  return (
    <Modal
      show={applicationModal.state}
      onHide={() => dispatch(setApplicationModal({ title: "", body: "" }))}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      backdropClassName="custom-backdrop"
      className="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {applicationModal.modalContent.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {applicationModal.modalContent.body === "payment-details" ? (
          <PaymentDetails />
        ) : applicationModal.modalContent.body === "contact-seller" ? (
          <ContactSeller />
        ) : applicationModal.modalContent.body === "report-item" ? (
          <ReportItem />
        ) : applicationModal.modalContent.body === "leave-review" ? (
          <LeaveReview />
        ) : null}
      </Modal.Body>
    </Modal>
  );
};
