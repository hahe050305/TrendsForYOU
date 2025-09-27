import React from 'react';
import './Order.css';

function OrderTracking() {
  const steps = [
    { label: 'Order Placed', status: 'completed' },
    { label: 'Processing', status: 'partial' },
    { label: 'Shipped', status: 'pending' },
    { label: 'Out for Delivery', status: 'pending' },
    { label: 'Delivered', status: 'pending' },
  ];

  return (
    <div className="order-tracking-container">
      <h2 className="heading">Order Tracking</h2>
      <div className="timeline">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`timeline-step ${step.status}`}
          >
            <div className="bullet"></div>
            <p>{step.label}</p>
          </div>
        ))}
      </div>
      <p className="message">
        We will notify the progress at every stages, Till then  KEEP TICKING YOUR CART.
      </p>
    </div>
  );
}

export default OrderTracking;
