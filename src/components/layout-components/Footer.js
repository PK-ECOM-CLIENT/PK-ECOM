import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div className=" footer_wrapper footer_footer color-white">
      <div>
        <div className="footer_footer__list footer_footer__list-first">
          <Link className="nav-link">Get to Know Us</Link>
          <Link className="nav-link">About Us</Link>
          <Link className="nav-link">Careers</Link>
          <Link className="nav-link">Press Releases</Link>
          <Link className="nav-link">Terms and Conditions</Link>
          <Link className="nav-link">Policy</Link>
        </div>
      </div>
      <div>
        <div className="footer_footer__list">
          <Link className="nav-link">Let Us Help You</Link>
          <Link className="nav-link">Your Account</Link>
          <Link className="nav-link">Delivery Rats and Policies</Link>
          <Link className="nav-link">Returns and Replacement</Link>
          <Link className="nav-link">Warranty</Link>
          <Link className="nav-link">Help Centre</Link>
        </div>
      </div>
      <div>
        <div className=" footer_footer__list  footer_footer__list-last">
          <Link className="nav-link">Make Money With Us</Link>
          <Link className="nav-link">Sell On PK-ECOM</Link>
          <Link className="nav-link">Advertise Your Products</Link>
        </div>
      </div>
    </div>
  );
};
