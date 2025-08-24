import React, { useEffect, useState } from "react";
import "./failedPayment.css";
import { Link, useLocation } from "react-router-dom";

const FailedPayment = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("order"); // e.g., /failed?order=12345

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      className={`failed ${isVisible ? "is-visible" : ""}`}
      aria-live="polite"
    >
      <section
        className="failed__card"
        role="alert"
        aria-label="Payment unsuccessful"
      >
        {/* Animated badge */}
        <div className="failed__badge" aria-hidden="true">
          <div className="failed__pulse failed__pulse--1" />
          <div className="failed__pulse failed__pulse--2" />
          <div className="failed__circle">
            <svg className="failed__icon" viewBox="0 0 24 24">
              {/* Exclamation mark */}
              <path className="failed__icon-path" d="M12 5v11m0 4h.01" />
            </svg>
          </div>
        </div>

        {/* Text content */}
        <h1 className="failed__title">Payment unsuccessful</h1>
        <p className="failed__subtitle">
          We couldn’t complete your payment. Please try again or check your card
          details.
        </p>

        {orderId && (
          <div className="failed__order">
            <span className="failed__order-label">Order #</span>
            <span className="failed__order-value">{orderId}</span>
          </div>
        )}

        {/* Actions */}
        <div className="failed__actions">
          <Link
            to={`${process.env.REACT_APP_ROOTURL || ""}/cart`}
            className="failed__btn failed__btn--primary"
          >
            Try again
          </Link>

          <Link
            to={process.env.REACT_APP_ROOTURL || "/"}
            className="failed__btn failed__btn--ghost"
          >
            Back to shopping
          </Link>
        </div>
      </section>

      {/* Subtle background sparkles (kept for visual parity) */}
      <div className="failed__sparkles" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className={`fspark fspark--${(i % 5) + 1}`} />
        ))}
      </div>
    </main>
  );
};

export default FailedPayment;
