import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

function Payments() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const [couponCode, setCouponCode] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardDetails, setCardDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [paypalEmail, setPaypalEmail] = useState('');
  const [upiId, setUpiId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Total price calculation in INR
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCouponChange = (e) => setCouponCode(e.target.value);

  const applyCoupon = () => {
    if (couponCode === 'Santa_Dec25') {
      const newPrice = totalPrice - totalPrice * 0.3; // 30% discount
      setDiscountedPrice(newPrice);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaypalChange = (e) => setPaypalEmail(e.target.value);
  const handleUpiChange = (e) => setUpiId(e.target.value);

  const validateForm = () => {
    if (paymentMethod === 'Credit Card') {
      if (!cardDetails.cardName || !cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
        setErrorMessage('Please fill in all card details.');
        return false;
      }
    } else if (paymentMethod === 'PayPal') {
      if (!paypalEmail) {
        setErrorMessage('Please enter your PayPal email.');
        return false;
      }
    } else if (paymentMethod === 'UPI') {
      if (!upiId) {
        setErrorMessage('Please enter your UPI ID.');
        return false;
      }
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Payment Successful!');
      navigate('/order'); // Navigate to order tracking page
    }
  };

  useEffect(() => {
    setDiscountedPrice(totalPrice);
  }, [totalPrice]);

  return (
    <div className="payment-container">
      <h2>Payment Information</h2>
      <p className="coupon-notification">
        <strong>
          Use coupon code: <span style={{ color: 'green' }}>Santa_Dec25</span> to get 30% off on your first order. Welcome Bonus!
        </strong>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="total-price">
          <p>Total Price: ₹{totalPrice.toLocaleString('en-IN')}</p>
        </div>

        <label>
          Select Payment Method:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="UPI">UPI</option>
          </select>
        </label>

        {paymentMethod === 'Credit Card' && (
          <div>
            <label>Name on Card:</label>
            <input
              type="text"
              name="cardName"
              value={cardDetails.cardName}
              onChange={handleCardChange}
              placeholder="Enter name on card"
            />
            <label>Credit Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardChange}
              placeholder="Enter card number"
            />
            <label>Expiry Date:</label>
            <input
              type="text"
              name="expiryDate"
              value={cardDetails.expiryDate}
              onChange={handleCardChange}
              placeholder="MM/YY"
            />
            <label>CVV:</label>
            <input
              type="text"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleCardChange}
              placeholder="CVV"
            />
          </div>
        )}

        {paymentMethod === 'PayPal' && (
          <div>
            <label>PayPal Email:</label>
            <input
              type="email"
              value={paypalEmail}
              onChange={handlePaypalChange}
              placeholder="Enter PayPal email"
            />
          </div>
        )}

        {paymentMethod === 'UPI' && (
          <div>
            <label>UPI ID:</label>
            <input
              type="text"
              value={upiId}
              onChange={handleUpiChange}
              placeholder="Enter UPI ID"
            />
          </div>
        )}

        <label>Enter Coupon Code:</label>
        <input
          type="text"
          value={couponCode}
          onChange={handleCouponChange}
          placeholder="Enter coupon code"
        />

        <button
          type="button"
          onClick={applyCoupon}
          disabled={discountedPrice < totalPrice}
        >
          Apply Coupon
        </button>

        {discountedPrice < totalPrice && (
          <div className="discounted-price">
            <p>Discounted Price: ₹{discountedPrice.toLocaleString('en-IN')}</p>
          </div>
        )}

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit">Complete Payment</button>
      </form>
    </div>
  );
}

export default Payments;
