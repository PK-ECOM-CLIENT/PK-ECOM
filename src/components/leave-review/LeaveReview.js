import React, { useState } from "react";
import { Button, Form } from "react-bootstrap"; // Import Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are included
import "./leaveReview.css"; // CSS for star ratings

const LeaveReview = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sample submission function
    console.log("Submitted Rating:", rating);
    console.log("Submitted Review:", reviewText);
    alert(`Rating: ${rating}\nReview: ${reviewText}`);

    // Clear the form after submission
    setRating(0);
    setReviewText("");
  };

  return (
    <div className="modal-content d-flex flex-column align-items-center justify-content-center">
      <h3>Submit Your Review</h3>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`star ${value <= rating ? "selected" : ""}`}
            onClick={() => handleStarClick(value)}
          >
            ★
          </span>
        ))}
      </div>

      <Form onSubmit={handleSubmit} className="w-100 mt-3">
        <Form.Group controlId="reviewTextArea">
          <Form.Label>Review:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={reviewText}
            onChange={handleTextChange}
            placeholder="Type your review..."
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

export default LeaveReview;
