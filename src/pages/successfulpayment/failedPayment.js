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
      <p className="error-text">Payment failed!</p>
      <Link to={process.env.REACT_APP_ROOTURL + "/cart"} className="text">
        Go back
      </Link>
    </div>
  );
};
// lets see if the changes gets deployed on vercel automatically
export default FailedPayment;
