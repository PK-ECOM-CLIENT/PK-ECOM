import React from "react";
import "./loginpage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInputFields } from "../../components/custom-components/CustomInputFields";
import { Link } from "react-router-dom";
const inputFields = [
  {
    label: "Email",
    name: "email",
    type: "email",
    Placeholder: "youremail@email.com",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    Placeholder: "********",
    required: true,
  },
];
const LoginPage = () => {
  return (
    <div>
      <AppLayOut>
        <div className="login">
          <Form className="login_form -util-form">
            <Button className="-util-btnback">
              <Link className="nav-link" to="/">
                <i class="fa-solid fa-angle-left -util-backicon"></i> Back
              </Link>
            </Button>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {inputFields.map((item, i) => (
                <CustomInputFields {...item}></CustomInputFields>
              ))}
            </Form.Group>
            <div className="d-grid">
              <Button className="btn-positive">Login</Button>
            </div>
            <div className="login_issues">
              <Link className="forgotten-password" to="/forgotpassword">
                Forgotten Password?
              </Link>
              <Link className="not-member-yet" to="/register">
                Not member yet?
              </Link>
            </div>
          </Form>
        </div>
      </AppLayOut>
    </div>
  );
};

export default LoginPage;
