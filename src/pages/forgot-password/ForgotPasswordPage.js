import React from "react";
import "./forgotpasswordpage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import BackButton from "../../components/backbutton/BackButton";
const ForgotPasswordPage = () => {
  return (
    <div>
      <AppLayOut>
           <BackButton />
        <div className="forgotpassword">
          <Form className=" forgotpassword_form -util-form">
            <Button className="-util-btnback">
              <Link className="nav-link" to="/login">
                <i class="fa-solid fa-angle-left -util-backicon"></i> Back
              </Link>
            </Button>
            <h5 className="text-center">Request OTP</h5>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
            <Button className="btn-positive" type="submit">
              Request OTP
            </Button>
          </Form>
        </div>
      </AppLayOut>
    </div>
  );
};

export default ForgotPasswordPage;
