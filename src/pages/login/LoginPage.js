import React, { useState } from "react";
import "./loginpage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInputFields } from "../../components/custom-components/CustomInputFields";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logInUserAction } from "../../slices/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { setPublicUrl } from "../../slices/system/systemSlice";
import { TypingEffect } from "../../components/typing-effect/TypingEffect";
import BackButton from "../../components/backbutton/BackButton";

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
  const { publicUrl } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const origin =
    (location.state && location.state.from && location.state.from.pathname) ||
    publicUrl ||
    "/";

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    if (name === "email") value = value.toLowerCase();
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(logInUserAction(form));
    if (result === "success") {
      navigate(origin);
      dispatch(setPublicUrl(""));
    }
  };

  return (
    <AppLayOut>
         <BackButton />
      <div className="login">
        <Form className="login_form -util-form" onSubmit={handleOnSubmit}>
          <div className="login_toprow">
            <Link className="btn-back" to="/">
              <i className="fa-solid fa-angle-left"></i>
              <span>Back</span>
            </Link>
            <h1 className="login_title">Welcome back</h1>
          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            {inputFields.map((item) => (
              <CustomInputFields
                key={item.name}
                {...item}
                onChange={handleOnChange}
              />
            ))}
          </Form.Group>

          <div className="d-grid">
            <Button className="-util-btn-positive" type="submit">
              Login
            </Button>
          </div>

          <div className="login_issues">
            <Link className="login_link" to="/forgotpassword">
              Forgotten Password?
            </Link>
            <Link className="login_link" to="/register">
              Not member yet?
            </Link>
          </div>

          <div
            className="sampleLogin"
            role="note"
            aria-label="Sample login details"
          >
            <div className="heading">
              <TypingEffect
                text="Sample login details:"
                charDelay={100}
                pauseDuration={1000}
                className="typingEffect"
              />
            </div>
            <div className="sampleLogin_email">
              Email: Pradeepdhital@gmail.com
            </div>
            <div className="sampleLogin_password">Password: Pradeep</div>
          </div>
        </Form>
      </div>
    </AppLayOut>
  );
};

export default LoginPage;
