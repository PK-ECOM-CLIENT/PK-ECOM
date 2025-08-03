import { useState } from "react";

import styles from "./smallScreens.module.css";

import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const SmallScreens = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Breadcrumb icon in top-right corner */}
      {!show && (
        <div className="toggle-icon" onClick={handleShow}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </div>
      )}

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="top"
        className="fullscreen-offcanvas"
      >
        {/* Custom close icon in same position */}
        <div className="toggle-icon" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </div>

        <Offcanvas.Body>
          <ul className="offcanvas-list">
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
            <li>item 4</li>
            <li>item 5</li>
            <li>item 6</li>
            <li>item 7</li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SmallScreens;
