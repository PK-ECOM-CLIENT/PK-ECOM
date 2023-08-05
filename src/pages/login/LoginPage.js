import React, { useState } from "react";
import "./loginpage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInputFields } from "../../components/custom-components/CustomInputFields";
import { Link, useNavigate } from "react-router-dom";
import { logInUserAction } from "../../slices/user/userAction";
import { useDispatch } from "react-redux";
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
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    if (name === "email") {
      value = value.toLowerCase();
      setForm({ ...form, [name]: value });
    }
    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = async(e) => {
    e.preventDefault();
    const result =  await dispatch(logInUserAction(form));
    result === "success" && navigate("/");
    console.log(result);
  };
  return (
    <div>
      <AppLayOut>
        <div className="login">
          <Form className="login_form -util-form" onSubmit={handleOnSubmit}>
            <Button className="-util-btnback">
              <Link className="nav-link" to="/">
                <i class="fa-solid fa-angle-left -util-backicon"></i> Back
              </Link>
            </Button>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {inputFields.map((item, i) => (
                <CustomInputFields
                  {...item}
                  onChange={handleOnChange}
                ></CustomInputFields>
              ))}
            </Form.Group>
            <div className="d-grid">
              <Button className="-util-btn-positive" type="submit">
                Login
              </Button>
            </div>
            <div className="login_issues">
              <Link className="forgotten-password" to="/forgotpassword">
                Forgotten Password?
              </Link>
              <Link className="not-member-yet" to="/register">
                Not member yet?
              </Link>
            </div>
            <div className="sampleLogin">
              <div className="heading">Sample login details</div>
              <div className="sampleLogin_email">
                Email: Pradeepdhital@gmail.com
              </div>
              <div className="sampleLogin_password">Password: Pradeep</div>
            </div>
          </Form>
        </div>
      </AppLayOut>
    </div>
  );
};

export default LoginPage;
