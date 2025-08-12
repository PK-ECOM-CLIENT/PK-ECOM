import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./leaveReview.css";

const LeaveReview = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleStarClick = (value) => setRating(value);
  const handleTextChange = (e) => setReviewText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Rating:", rating);
    console.log("Submitted Review:", reviewText);
    alert(`Rating: ${rating}\nReview: ${reviewText}`);
    setRating(0);
    setReviewText("");
  };

  return (
    <section className="review">
      <h4 className="review__title">Submit Your Review</h4>

      {/* Star rating */}
      <div className="review__stars">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`review__star ${value <= rating ? "selected" : ""}`}
            onClick={() => handleStarClick(value)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review textarea */}
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group controlId="reviewTextArea">
          <div className="review__labelrow">
            <Form.Label className="m-0">Review</Form.Label>
            <small className="review__counter">
              {reviewText.length}/500
            </small>
          </div>
          <Form.Control
            as="textarea"
            rows={4}
            maxLength={500}
            value={reviewText}
            onChange={handleTextChange}
            placeholder="Type your review..."
            required
          />
        </Form.Group>

        <div className="review__actions">
          <Button type="submit" className="review__submit -util-btn-positive">
            Submit
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default LeaveReview;
