import React from 'react'
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { setNoticeModal } from '../../slices/system/systemSlice';

export const NoticeModal = () => {
    const dispatch = useDispatch();
      const { noticeModal } = useSelector((state) => state.system);
  return (
    <Modal
      show={noticeModal}
      onHide={() => dispatch(setNoticeModal())}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Notice!!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       Please click on categories marked with  "*" to view products that have items added. Not all categories contain items.
      </Modal.Body>
    </Modal>
  );
}
