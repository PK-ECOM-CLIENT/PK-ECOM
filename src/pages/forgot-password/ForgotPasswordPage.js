import React from "react";
import "./forgotpasswordpage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import BackButton from "../../components/backbutton/BackButton";

const ForgotPasswordPage = () => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to your OTP request action if needed
  };

  return (
    <AppLayOut>
      <div className="forgot">
        <Form className="forgot_form -util-form" onSubmit={handleOnSubmit}>
          {/* Top row: Back + Title (consistent with login/registration) */}
          <div className="forgot_toprow">
            <div className="-util-back_btn_wraper">
              <BackButton></BackButton>
            </div>
            <h1 className="forgot_title">Request OTP</h1>
          </div>

          <Form.Group className="mb-3" controlId="forgotEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>

          <div className="d-grid">
            <Button className="-util-btn-positive" type="submit">
              Request OTP
            </Button>
          </div>

          <div className="forgot_footerlinks">
            <span>Remembered your password?</span>
            <Link className="forgot_link" to="/login">
              Login
            </Link>
          </div>
        </Form>
      </div>
    </AppLayOut>
  );
};

export default ForgotPasswordPage;
