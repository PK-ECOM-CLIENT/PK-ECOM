import React from "react";
import { AppLayOut } from "../../components/layout/AppLayOut";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInputFields } from "../../components/custom-components/CustomInputFields";
import { Link } from "react-router-dom";
const inputFields = [
  {
    label: "OTP",
    name: "otp",
    type: "text",
    Placeholder: "87987",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    Placeholder: "********",
    required: true,
  },
  {
    label: "Confirm password",
    name: "confirmPassword",
    type: "password",
    Placeholder: "********",
    required: true,
  },
];
const ProvideOTPPage = () => {
  return (
    <div>
      <AppLayOut>
        <div className="provideotp">
          <Form className="login_form -util-form">
            <Button className="-util-btnback">
              <Link className="nav-link" to="/forgotpassword">
                <i class="fa-solid fa-angle-left -util-backicon"></i> Back
              </Link>
            </Button>
            <h5 className="text-center">Reset Password</h5>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {inputFields.map((item, i) => (
                <CustomInputFields {...item}></CustomInputFields>
              ))}
            </Form.Group>
            <div className="d-grid">
              <Button className="btn-positive">Update Password</Button>
            </div>
          </Form>
        </div>
      </AppLayOut>
    </div>
  );
};
export default ProvideOTPPage;
