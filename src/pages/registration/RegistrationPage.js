import React, { useState } from "react";
import "./registrationPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { CustomInputFields } from "../../components/custom-components/CustomInputFields";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Alert, Col, Row } from "react-bootstrap";
import { postUser } from "../../helpers/axiosHelper";
const inputFieldsFirst = [
  {
    label: "First Name",
    className: "-util-required",
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    required: true,
  },
  {
    label: "Last Name",
    className: "-util-required",
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    required: true,
  },
  {
    label: "Email",
    className: "-util-required",
    name: "email",
    type: "email",
    placeholder: "youremail@email.com",
    required: true,
  },
  {
    label: "Phone",
    className: "-util-required",
    name: "phone",
    type: "number",
    placeholder: "0452734634",
    required: false,
  },
  {
    label: "Date of Birth",
    name: "dob",
    type: "date",
    placeholder: "dd/mm/yy",
    required: false,
  },
];
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  address: {
    streetAddress: "",
    suburb: "",
    state: "",
    postCode: "",
  },
  password: "",
  confirmPassword: "",
};
const RegistrationPage = () => {
  const [form, setForm] = useState(initialState);
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "streetAddress" ||
      name === "suburb" ||
      name === "state" ||
      name === "postCode"
    ) {
      setForm((form) => ({
        ...form,
        address: {
          ...form.address,
          [name]: value,
        },
      }));
    } else {
      setForm((form) => ({
        ...form,
        [name]: value,
      }));
    }
    const { password } = form;
    if (name === "confirmPassword") {
      if (!password) {
        setError("Please fill up the password first!");
      } else if (password.length < 6) {
        setError("Password must be minimum of 6 characters long!");
      } else if (!/[A-Z]/.test(password)) {
        setError("Password must contain minimum of 1 capital letter!");
      } else if (!/[a-z]/.test(password)) {
        setError("Password must contain minimum of 1 small letter!");
      } else if (!/[0-9]/.test(password)) {
        setError("Password must contain minimum of 1 number!");
      } else if (!password.includes(value)) {
        setError("Password and confirm password must match!");
      } else {
        setError("");
      }
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return alert("password do not match");
    }
    const result = await postUser(rest);
    setResponse(result);
    console.log(rest);
  };
  return (
    <div>
      <AppLayOut>
        <div className="registration">
          <Form
            className="registration_form -util-form"
            onSubmit={handleOnSubmit}
          >
            <Button className="-util-btnback">
              <Link className="nav-link" to="/login">
                <i className="fa-solid fa-angle-left -util-backicon"></i> Back
              </Link>
            </Button>
            {response?.message && (
              <Alert
                variant={response?.status === "success" ? "success" : "danger"}
              >
                {response.message}
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {inputFieldsFirst.map((item, i) => (
                <CustomInputFields
                  {...item}
                  onChange={handleOnChange}
                  key={i}
                ></CustomInputFields>
              ))}
            </Form.Group>
            <div className="address">
              <div className="address_heading">Address</div>
              <div className="address_content">
                <Row>
                  <Col md={9} sm={9}>
                    <Form.Group>
                      <Form.Label className="-util-required">
                        Street Address
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="102/1-3 Clarence Street"
                        name="streetAddress"
                        required
                        onChange={handleOnChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label className="-util-required">City</Form.Label>
                      <Form.Control
                        onChange={handleOnChange}
                        type="text"
                        placeholder="City"
                        name="suburb"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={3}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="disabledSelect"
                        className="-util-required"
                      >
                        State
                      </Form.Label>
                      <Form.Select
                        name="state"
                        onChange={handleOnChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="NSW">NSW</option>
                        <option value="ACT">ACT</option>
                        <option value="NT">NT</option>
                        <option value="SA">SA</option>
                        <option value="WA">WA</option>
                        <option value="Victoria">Victoria</option>
                        <option value="Queensland">Queensland</option>
                        <option value="Tasmania">Tasmania</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={3}>
                    <CustomInputFields
                      className="-util-required"
                      label="Post Code"
                      name="postCode"
                      type="number"
                      placeholder="2135"
                      required
                      onChange={handleOnChange}
                    ></CustomInputFields>
                  </Col>
                </Row>
              </div>
            </div>
            <CustomInputFields
              className="-util-required"
              label="Password"
              name="password"
              type="string"
              placeholder="***********"
              required
              onChange={handleOnChange}
            ></CustomInputFields>
            <CustomInputFields
              className="-util-required"
              label="Confirm Password"
              name="confirmPassword"
              type="string"
              placeholder="***********"
              required
              onChange={handleOnChange}
            ></CustomInputFields>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="d-grid">
              <Button
                className="-util-btn-positive"
                type="submit"
                disabled={error}
              >
                Register
              </Button>
            </div>
          </Form>
        </div>
      </AppLayOut>
    </div>
  );
};

export default RegistrationPage;
