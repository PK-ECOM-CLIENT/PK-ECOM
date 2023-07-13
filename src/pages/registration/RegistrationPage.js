import React, { useState } from "react";
import "./registrationPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { CustomInputFields } from "../../components/custom-components/CustomInputFields";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
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
    city: "",
    state: "",
    postCode: "",
  },
};
const RegistrationPage = () => {
  const [form, setForm] = useState(initialState);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "streetAddress" ||
      name === "city" ||
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
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
                <i class="fa-solid fa-angle-left -util-backicon"></i> Back
              </Link>
            </Button>
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
                      <Form.Label>Street Address</Form.Label>
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
                        name="city"
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
                      <Form.Select name="state" onChange={handleOnChange}>
                        <option value="nsw">NSW</option>
                        <option value="act">ACT</option>
                        <option value="nt">NT</option>
                        <option value="sa">SA</option>
                        <option value="wa">WA</option>
                        <option value="victoria">Victoria</option>
                        <option value="queensland">Queensland</option>
                        <option value="tasmania">Tasmania</option>
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
            <div className="d-grid">
              <Button className="btn-positive" type="submit">
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
