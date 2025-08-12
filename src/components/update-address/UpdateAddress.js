import React, { useState } from "react";
import "./updateAddress.css";
import { Form, Button } from "react-bootstrap";
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
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateUserAddressAction(form));
    console.log(result);
  };

  return (
    <section className="addr">
      <Form onSubmit={handleOnSubmit} noValidate>
        {/* Street address – full width */}
        <Form.Group className="addr__group">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            name="streetAddress"
            placeholder="102/1-3 Clarence Street"
            value={form.streetAddress}
            onChange={handleOnChange}
            required
            autoComplete="address-line1"
          />
        </Form.Group>

        {/* City / State / Postcode – responsive grid */}
        <div className="addr__row">
          <Form.Group className="addr__group">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="suburb"
              placeholder="City"
              value={form.suburb}
              onChange={handleOnChange}
              required
              autoComplete="address-level2"
            />
          </Form.Group>

          <Form.Group className="addr__group">
            <Form.Label>State</Form.Label>
            <Form.Select
              name="state"
              value={form.state}
              onChange={handleOnChange}
              required
              autoComplete="address-level1"
            >
              <option value="">Select</option>
              <option value="NSW">NSW</option>
              <option value="ACT">ACT</option>
              <option value="NT">NT</option>
              <option value="SA">SA</option>
              <option value="WA">WA</option>
              <option value="VIC">VIC</option>
              <option value="QLD">QLD</option>
              <option value="TAS">TAS</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="addr__group">
            <Form.Label>Post Code</Form.Label>
            <Form.Control
              type="text"                 /* better for patterns than number */
              name="postCode"
              placeholder="2135"
              value={form.postCode}
              onChange={handleOnChange}
              required
              inputMode="numeric"
              pattern="^\d{4}$"
              autoComplete="postal-code"
            />
          </Form.Group>
        </div>

        <div className="addr__actions">
          <Button type="submit" className="addr__submit -util-btn-positive">
            Submit
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default UpdateAddress;
