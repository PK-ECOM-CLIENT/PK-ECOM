import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./ReportItem.css";

const ReportItem = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Text:", text);
    alert(`Submitted Text: ${text}`);
    setText(""); // Clear after submission
  };

  return (
    <section className="report">
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group controlId="reportTextarea">
          <div className="report__labelrow">
            <Form.Label className="m-0">Report Details</Form.Label>
            <small className="report__counter">{text.length}/500</small>
          </div>
          <Form.Control
            as="textarea"
            rows={5}
            maxLength={500}
            value={text}
            onChange={handleChange}
            placeholder="Type your report..."
            required
          />
        </Form.Group>

        <div className="report__actions">
          <Button type="submit" className="report__submit -util-btn-positive">
            Submit
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default ReportItem;
