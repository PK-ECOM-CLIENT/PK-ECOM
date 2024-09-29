import React, { useState } from "react";
import { Button, Form } from "react-bootstrap"; // Import Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are included


const ReportItem = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Text:", text);
    alert(`Submitted Text: ${text}`);

    // Clear the text area after submission
    setText("");
  };

  return (
    <div className="modal-content d-flex align-items-center justify-content-center">
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group controlId="textAreaInput">
          <Form.Control
            as="textarea" // Change to textarea
            rows={5} // Adjust number of rows as needed
            value={text}
            onChange={handleChange}
            placeholder="Type your report..."
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ReportItem;
