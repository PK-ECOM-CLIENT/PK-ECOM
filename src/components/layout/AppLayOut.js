import React, { useEffect, useState } from "react";
import { Header } from "../layout-components/Header";
import { Sidebar } from "../layout-components/Sidebar";
import { Footer } from "../layout-components/Footer";
import "./layout.css";
import { Col } from "react-bootstrap";
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
  }, [ windowWidth]);
  return (
    <div className="applayout">
      <div className="header">
        <Header></Header>
      </div>
      <div className="body">
        {windowWidth > 991 ? (
          <>
            <Col md={2} className="body_sidebar">
              <Sidebar></Sidebar>
            </Col>
            <Col md={10}>
              <div className="body_content">
                <div>{children}</div>
              </div>
            </Col>
          </>
        ) : (
          <>
            <Col>
              <div className=" body_content text-center font-20">
                {children}
              </div>
            </Col>
          </>
        )}
      </div>
      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
};
