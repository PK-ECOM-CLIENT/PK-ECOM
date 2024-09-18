import React, { useEffect, useState } from "react";
import "./failedPayment.css"; // Ensure this path is correct
import { Link } from "react-router-dom";

const FailedPayment = () => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="content">
      <div className="circle-container">
        <div className="circle completed">
          <svg
            className="exclamation"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path className="exclamation-path" d="M12 5v11m0 4h.01" />
          </svg>
        </div>
      </div>
      <p className="error-text">
        Couldn't process the payment! Please check your card details and try
        again.
      </p>
      <Link to={process.env.REACT_APP_API_ENDPOINT_FRONTEND +"/cart"} className="text">
        Go back
      </Link>
    </div>
  );
  console.log("API Endpoint:", process.env.REACT_APP_API_ENDPOINT_FRONTEND);
};
export default FailedPayment;
