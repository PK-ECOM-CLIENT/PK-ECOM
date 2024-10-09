import React, { useState } from "react";
import "./updateAddress.css";
import { Col, Row, Form, Button } from "react-bootstrap";
import { updateUserAddressAction } from "../../slices/user/userAction";
import { useDispatch } from "react-redux";

const UpdateAddress = () => {
  const initialState = {
    streetAddress: "",
    suburb: "",
    state: "",
    postCode: "",
  };

  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const result = await dispatch(updateUserAddressAction(form));
    console.log(result);
  };

  return (
    <Form className="custom-address-form" onSubmit={handleOnSubmit}>
      <div className="custom-address-content">
        <Row className="custom-row">
          <Col md={9} className="custom-col custom-col-md-9">
            <Form.Group>
              <Form.Label className="custom-label">Street Address</Form.Label>
              <Form.Control
                className="custom-input"
                type="text"
                placeholder="102/1-3 Clarence Street"
                name="streetAddress"
                required
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="custom-row">
          <Col sm={6} className="custom-col custom-col-sm-6">
            <Form.Group>
              <Form.Label className="custom-label">City</Form.Label>
              <Form.Control
                className="custom-input"
                type="text"
                placeholder="City"
                name="suburb"
                required
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          <Col sm={3} className="custom-col custom-col-sm-3">
            <Form.Group>
              <Form.Label className="custom-label">State</Form.Label>
              <Form.Select
                className="custom-select"
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
                <option value="VIC">Victoria</option>
                <option value="QLD">Queensland</option>
                <option value="TAS">Tasmania</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={3} className="custom-col custom-col-sm-3">
            <Form.Group>
              <Form.Label className="custom-label">Post Code</Form.Label>
              <Form.Control
                className="custom-input"
                type="number"
                placeholder="2135"
                name="postCode"
                required
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button className="custom-button" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default UpdateAddress;
