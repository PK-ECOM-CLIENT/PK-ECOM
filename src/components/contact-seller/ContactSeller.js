import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./contactSeller.css";

const ContactSeller = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    alert(`Form submitted successfully!\n\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <section className="contact">
      <Form onSubmit={handleSubmit} noValidate>
        {/* Row 1: name + phone (becomes single column on small screens) */}
        <div className="contact__row">
          <Form.Group controlId="formFullName" className="contact__col">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formContactNumber" className="contact__col">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="contactNumber"
              placeholder="Enter your contact number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              inputMode="tel"
            />
          </Form.Group>
        </div>

        {/* Row 2: email */}
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </Form.Group>

        {/* Row 3: message */}
        <Form.Group controlId="formMessage" className="mt-3">
          <div className="contact__labelrow">
            <Form.Label className="m-0">Message</Form.Label>
            <small className="contact__counter">
              {formData.message.length}/500
            </small>
          </div>
          <Form.Control
            as="textarea"
            name="message"
            rows={5}
            maxLength={500}
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="contact__actions">
          <Button type="submit" className="contact__submit -util-btn-positive">
            Submit
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default ContactSeller;
