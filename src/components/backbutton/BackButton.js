import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./backButton.css";

const BackButton = ({ fallback = "/" }) => {
  const navigate = useNavigate();
  const prevUrl = useSelector((state) => state.system.prevUrl);

  const handleBack = () => {
    // Prefer browser history if available
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    // Fallback to Redux prevUrl
    if (prevUrl) {
      navigate(prevUrl, { replace: true });
      return;
    }
    // Final fallback
    navigate(fallback, { replace: true });
  };

  return (
    <Button
      variant="outline-secondary"
      size="sm"
      className="back-btn"
      onClick={handleBack}
    >
      <i className="fa-solid fa-angle-left"></i>Back
    </Button>
  );
};

export default BackButton;
