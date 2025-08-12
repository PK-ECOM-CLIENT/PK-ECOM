import React from "react";
import "./paymentDetails.css";
import { useSelector } from "react-redux";
import { convertToAESTWithTimeZone } from "../../helpers/functions/dateConversion";

const formatAUD = (n) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(
    Number(n || 0)
  );

const PaymentDetails = () => {
  const { selectedPurchase } = useSelector((state) => state.system) || {};

  const qty = Number(selectedPurchase?.itemCount || 0);
  const unit = Number(selectedPurchase?.itemPrice || 0);
  const subtotal = qty * unit;

  // If you later pass these from the API, just replace the constants
  const postage = 15;
  const voucher = 15;

  const totalPaid = subtotal + postage - voucher;

  return (
    <section className="pay">
      {/* Top line: card + holder + amount + timestamp */}
      <header className="pay__head">
        <div className="pay__card">
          {/* Simple Mastercard mark (kept from your code) */}
          <svg width="46" height="30" viewBox="0 0 50 32" aria-hidden="true">
            <path d="M20.303 8.113h9.395v15.55h-9.395V8.113Z" fill="#FF5F00" />
            <path d="M21.273 15.888A9.917 9.917 0 0 1 25 8.115 9.667 9.667 0 0 0 11.8 9.18c-3.453 3.789-3.453 9.63 0 13.419A9.667 9.667 0 0 0 25 23.664a9.912 9.912 0 0 1-3.727-7.776Z" fill="#EB001B"/>
            <path d="M40.79 15.888c0 3.786-2.134 7.24-5.494 8.895A9.654 9.654 0 0 1 25 23.663a9.936 9.936 0 0 0 3.728-7.775c0-3.034-1.374-5.9-3.728-7.774a9.654 9.654 0 0 1 10.294-1.12c3.36 1.655 5.494 5.107 5.494 8.893Z" fill="#F79E1B"/>
          </svg>

          <div className="pay__cardmeta">
            <div className="pay__cardline">
              Paid with <span className="pay__mask">•••• {selectedPurchase?.cardEnding || "—"}</span>
              <span className="pay__badge">Paid</span>
            </div>
            <div className="pay__holder">
              {selectedPurchase?.cardHolderName || ""}
            </div>
          </div>
        </div>

        <div className="pay__when">
          <div className="pay__amount">{formatAUD(totalPaid || subtotal)}</div>
          <div className="pay__time">
            {selectedPurchase?.createdAt
              ? convertToAESTWithTimeZone(selectedPurchase.createdAt)
              : ""}
          </div>
        </div>
      </header>

      {/* Receipt */}
      <div className="pay__receipt" role="table" aria-label="Payment breakdown">
        <div className="pay__row" role="row">
          <div className="pay__cell -l" role="cell">
            Items <span className="pay__muted">({qty} × {formatAUD(unit)})</span>
          </div>
          <div className="pay__cell -r" role="cell">{formatAUD(subtotal)}</div>
        </div>

        <div className="pay__row" role="row">
          <div className="pay__cell -l" role="cell">Postage</div>
          <div className="pay__cell -r" role="cell">{formatAUD(postage)}</div>
        </div>

        <div className="pay__row" role="row">
          <div className="pay__cell -l" role="cell">Voucher discount</div>
          <div className="pay__cell -r -neg" role="cell">−{formatAUD(voucher)}</div>
        </div>

        <hr className="pay__rule" />

        <div className="pay__row pay__row--strong" role="row">
          <div className="pay__cell -l" role="cell">Total paid</div>
          <div className="pay__cell -r" role="cell">{formatAUD(totalPaid || subtotal)}</div>
        </div>
      </div>
    </section>
  );
};

export default PaymentDetails;
