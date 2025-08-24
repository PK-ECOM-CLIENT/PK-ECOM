import React, { useEffect, useState } from "react";
import "./successfulPayment.css";
import { Link, useLocation } from "react-router-dom";

const SuccessfulPayment = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("order"); // e.g., /success?order=12345

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      className={`success ${isVisible ? "is-visible" : ""}`}
      aria-live="polite"
    >
      <section
        className="success__card"
        role="status"
        aria-label="Payment successful"
      >
        {/* Animated badge */}
        <div className="success__badge" aria-hidden="true">
          <div className="success__pulse success__pulse--1" />
          <div className="success__pulse success__pulse--2" />
          <div className="success__circle">
            <svg className="success__tick" viewBox="0 0 24 24">
              <path className="success__tick-path" d="M5 12l5 5L20 7" />
            </svg>
          </div>
        </div>

        {/* Text content */}
        <h1 className="success__title">Payment successful</h1>
        <p className="success__subtitle">
          Thanks for your purchase! We’re preparing your order.
        </p>

        {orderId && (
          <div className="success__order">
            <span className="success__order-label">Order #</span>
            <span className="success__order-value">{orderId}</span>
          </div>
        )}

        {/* Actions */}
        <div className="success__actions">
          <Link
            to={process.env.REACT_APP_ROOTURL}
            className="success__btn success__btn--primary"
          >
            Continue shopping
          </Link>

          <Link to="/purchases" className="success__btn success__btn--ghost">
            View orders
          </Link>
        </div>
      </section>

      {/* Subtle confetti sparkles (non-intrusive) */}
      <div className="success__sparkles" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className={`spark spark--${(i % 5) + 1}`} />
        ))}
      </div>
    </main>
  );
};

export default SuccessfulPayment;
