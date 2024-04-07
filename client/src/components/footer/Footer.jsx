import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="contact-us">
        <div>
          <img src="../../../img/contactNmessage.png" alt="" />
        </div>
        <div>
          <div className="contact-info">
          <p>Contact us at</p>
          <p className="contact-email">plutoconsulting@gmail.com</p>
          </div>
        </div>
      </div>
        <div className="services">
          <ul className="company">
            <h4>Company</h4>
            <li>Careers</li>
            <li>About Us</li>
            <li>Press</li>
          </ul>
          <ul className="product">
            <h4>Product</h4>
            <li>Features</li>
            <li>Pricing</li>
            <li>News</li>
          </ul>

          <ul className="legal">
            <h4>Legal</h4>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
          
        </div>
    </footer>
  );
}

export default Footer;
