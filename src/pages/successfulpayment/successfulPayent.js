import React, { useEffect, useState } from "react";
import "./successfulPayment.css";
import { Link } from "react-router-dom";

const TickMark = () => {
  const [isTickVisible, setTickVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTickVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="content">
        <div className="circle-container">
          <div className="circle completed">
            <svg
              className="tick"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path className="tick-path" d="M5 12l5 5L20 7" />
            </svg>
          </div>
        </div>
        <Link to={process.env.REACT_APP_API_ENDPOINT_FRONTEND} className="continue-text">
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default TickMark;
