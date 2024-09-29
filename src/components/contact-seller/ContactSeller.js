import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ContactSeller = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo function to show the submitted data
    console.log("Form Submitted: ", formData);
    alert(
      `Form submitted successfully!\n\n${JSON.stringify(formData, null, 2)}`
    );
  };

  return (
    <div>
      <h3>Contact the Seller</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFullName">
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

        <Form.Group controlId="formContactNumber" className="mt-3">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="text"
            name="contactNumber"
            placeholder="Enter your contact number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formMessage" className="mt-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows={5} // Big text box
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ContactSeller;
