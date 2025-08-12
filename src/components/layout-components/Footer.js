import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__col">
            <h4 className="footer__heading">
              <i className="fa-solid fa-building-columns"></i>
              <span>Get to Know Us</span>
            </h4>
            <nav className="footer__links">
              <Link className="footer__link" to="/about">
                About Us
              </Link>
              <Link className="footer__link" to="/careers">
                Careers
              </Link>
              <Link className="footer__link" to="/press">
                Press Releases
              </Link>
              <Link className="footer__link" to="/terms">
                Terms & Conditions
              </Link>
              <Link className="footer__link" to="/policy">
                Policy
              </Link>
            </nav>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">
              <i className="fa-solid fa-hand-holding-heart"></i>
              <span>Let Us Help You</span>
            </h4>
            <nav className="footer__links">
              <Link className="footer__link" to="/account">
                Your Account
              </Link>
              <Link className="footer__link" to="/delivery">
                Delivery Rates & Policies
              </Link>
              <Link className="footer__link" to="/returns">
                Returns & Replacement
              </Link>
              <Link className="footer__link" to="/warranty">
                Warranty
              </Link>
              <Link className="footer__link" to="/help">
                Help Centre
              </Link>
            </nav>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">
              <i className="fa-solid fa-store"></i>
              <span>Make Money With Us</span>
            </h4>
            <nav className="footer__links">
              <Link className="footer__link" to="/sell">
                Sell on PK-ECOM
              </Link>
              <Link className="footer__link" to="/advertise">
                Advertise Your Products
              </Link>
              <Link className="footer__link" to="/partners">
                Partner With Us
              </Link>
            </nav>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">
              <i className="fa-solid fa-envelope-open-text"></i>
              <span>Stay in the Loop</span>
            </h4>
            <p className="footer__text">
              Get early access to deals, new drops, and curated picks.
            </p>
            <form
              className="footer__newsletter"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                className="footer__input"
                placeholder="Your email"
                aria-label="Email address"
                required
              />
              <button
                type="submit"
                className="footer__btn -util-btn-positive text-white"
              >
                Subscribe
              </button>
            </form>

            <div className="footer__socials" aria-label="Social media">
              <a className="footer__social" href="#" aria-label="Facebook">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a className="footer__social" href="#" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a className="footer__social" href="#" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="footer__hr" />

        <div className="footer__bottom">
          <div className="footer__copy">
            © {year} PK-ECOM. All rights reserved.
          </div>
          <div className="footer__legal">
            <Link className="footer__legal-link" to="/privacy">
              Privacy
            </Link>
            <span className="footer__dot">•</span>
            <Link className="footer__legal-link" to="/cookies">
              Cookies
            </Link>
            <span className="footer__dot">•</span>
            <Link className="footer__legal-link" to="/sitemap">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
