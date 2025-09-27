import React, { useState, useEffect } from "react";
import "./Footer.css";

function Footer() {
  const [openModal, setOpenModal] = useState(null); // "privacy" | "terms" | "contact" | null
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const open = (e, name) => {
    e.preventDefault();
    setPrivacyChecked(false);
    setOpenModal(name);
    document.body.style.overflow = "hidden"; // lock background scroll
  };

  const close = () => {
    setOpenModal(null);
    document.body.style.overflow = "auto";
  };

  const handleAgree = () => {
    close(); // simply close when agreed
  };

  // 🔹 Auto-show Privacy Policy on every page reload
  useEffect(() => {
    setOpenModal("privacy");
    document.body.style.overflow = "hidden";
  }, []);

  // Minimal e-commerce style contents (replace with real content later)
  const privacyText = `
    * We collect basic order and shipping information to process orders..and to improve your shopping experience and to send order-related notifications. 

    * We do not sell your personal information. 
    * For returns and refunds, please keep invoices and follow our return policy. 
    * By agreeing you accept that your data will be used for order management and personalized recommendations.`;

  const termsText = `
    Welcome to Trends4You. By using our site you agree to our terms:

        1) You must be 18+ to place orders.
        2) Prices and availability may change and are subject to confirmation at checkout.
        3) Returns are processed per our returns policy.
      
    This page summarizes typical e-commerce terms; full legal terms may apply.`;

  const contactText = `
       Need help? Reach out to our support team:

            Email: support@trends4you.example
            Phone: +91 9876546789
            Support hours:  Mon–Sat, 8.00 A.M – 9:00 P.M (local time)

        You can also visit our Help Center for FAQs and order tracking.
  `;

  return (
    <>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Trends4You. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy" onClick={(e) => open(e, "privacy")}>
            Privacy Policy
          </a>
          <a href="/terms" onClick={(e) => open(e, "terms")}>
            Terms of Service
          </a>
          <a href="/contact" onClick={(e) => open(e, "contact")}>
            Contact Us
          </a>
        </div>
      </footer>

      {/* Overlay + Modal */}
      {openModal && (
        <div className="modal-overlay" onClick={close} aria-hidden>
          <div
            className="modal top-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${openModal}-title`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={close} aria-label="Close popup">
              &times;
            </button>

            <div className="modal-header">
              <h3 id={`${openModal}-title`}>
                {openModal === "privacy" && "Privacy Policy"}
                {openModal === "terms" && "Terms of Service"}
                {openModal === "contact" && "Contact Us"}
              </h3>
            </div>

            <div className="modal-content">
              <div className="modal-scroll">
                <p className="modal-body">
                  {openModal === "privacy" && privacyText}
                  {openModal === "terms" && termsText}
                  {openModal === "contact" && contactText}
                </p>
              </div>

              {openModal === "privacy" ? (
                <div className="modal-actions">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={privacyChecked}
                      onChange={(e) => setPrivacyChecked(e.target.checked)}
                    />
                    I have read and agree to the Privacy Policy
                  </label>
                  <div className="actions-row">
                    <button className="btn btn-secondary" onClick={close}>
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleAgree}
                      disabled={!privacyChecked}
                    >
                      Agree
                    </button>
                  </div>
                </div>
              ) : (
                <div className="modal-actions">
                  <div className="actions-row">
                    <button className="btn btn-primary" onClick={close}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
