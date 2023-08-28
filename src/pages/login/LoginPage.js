import React, { useEffect, useState } from "react";
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
// typing effect

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
    if (name === "email") {
      value = value.toLowerCase();
      setForm({ ...form, [name]: value });
    }
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
  useEffect(() => {
    if (window.ityped) {
      window.ityped.init(document.querySelector(".ityped"), {
        strings: ["Login Details", "Login Details", "Login Details"],
        loop: true,
      });
    }
  }, []);
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
              <div className="heading">
                {/* typing effect */}
                <TypingEffect
                  text="Sample login details"
                  charDelay={100} // Delay between characters in milliseconds
                  pauseDuration={1000} // Duration to pause after typing all characters in milliseconds
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
    </div>
  );
};

export default LoginPage;
