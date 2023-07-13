import React from "react";
import { Form } from "react-bootstrap";
export const CustomInputFields = ({ className, label, ...rest }) => {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label className={className}>{label}</Form.Label>
        <Form.Control {...rest} />
      </Form.Group>
    </div>
  );
};
