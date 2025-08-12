import React from "react";
import { Modal } from "react-bootstrap";
import "./customModal.css";
import { useDispatch, useSelector } from "react-redux";
import { setApplicationModal } from "../../slices/system/systemSlice";

import PaymentDetails from "../Payment-details/PaymentDetails";
import ContactSeller from "../contact-seller/ContactSeller";
import ReportItem from "../report-item/ReportItem";
import LeaveReview from "../leave-review/LeaveReview";
import OrderDetails from "../order-details/OrderDetails";
import UpdateAddress from "../update-address/UpdateAddress";

export const CustomModal = () => {
  const { applicationModal } = useSelector((state) => state.system);
  const dispatch = useDispatch();

  const close = () =>
    dispatch(setApplicationModal({ title: "", body: "" }));

  return (
    <Modal
      show={applicationModal.state}
      onHide={close}
      size="lg"
      centered
      backdrop="static"
      /* Style hooks */
      dialogClassName="app-modal__dialog"
      contentClassName="app-modal__content"
      backdropClassName="app-modal__backdrop"
      /* Nice mobile sheet on phones */
      fullscreen="sm-down"
    >
      <Modal.Header closeButton className="app-modal__header">
        <Modal.Title as="h2" className="app-modal__title">
          {applicationModal.modalContent.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="app-modal__body">
        {applicationModal.modalContent.body === "payment-details" ? (
          <PaymentDetails />
        ) : applicationModal.modalContent.body === "contact-seller" ? (
          <ContactSeller />
        ) : applicationModal.modalContent.body === "report-item" ? (
          <ReportItem />
        ) : applicationModal.modalContent.body === "leave-review" ? (
          <LeaveReview />
        ) : applicationModal.modalContent.body === "order-details" ? (
          <OrderDetails />
        ) : applicationModal.modalContent.body === "update-address" ? (
          <UpdateAddress />
        ) : null}
      </Modal.Body>
    </Modal>
  );
};
