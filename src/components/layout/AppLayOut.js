import React, { useEffect, useState } from "react";
import { Header } from "../layout-components/Header";
import { Sidebar } from "../layout-components/Sidebar";
import { Footer } from "../layout-components/Footer";
import "./layout.css";
import { Col, Row } from "react-bootstrap";
export const AppLayOut = ({ children }) => {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleWindowResize() {
      setwindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);
  return (
    <div className="applayout">
      <div className="header">
        <Header></Header>
      </div>
      <div className="body">
        {windowWidth > 991 ? (
          <Row className="g-0">
            {" "}
            {/* 👈 add Row and remove column gutters */}
            <Col md={2} className="body_sidebar">
              <Sidebar />
            </Col>
            <Col md={10}>
              <div className="body_content">
                <div>{children}</div>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="g-0">
            <Col>
              <div className="body_content text-center font-20">{children}</div>
            </Col>
          </Row>
        )}
      </div>
      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
};
