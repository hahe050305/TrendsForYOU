import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve previous cart items from localStorage if available
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setCartItems] = useState(location.state?.cartItems || storedCartItems);

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Total calculation in INR
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                {/* Only show image if item is not a combo */}
                {!item.type || item.type !== "combo" ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                ) : null}

                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price.toLocaleString('en-IN')}</p>
                  <div className="cart-quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>

                <button className="remove-item-btn" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total.toLocaleString('en-IN')}</h3>
        </div>
      )}

      <div className="cart-actions">
        <button className="continue-shopping-btn" onClick={() => navigate('/category')}>
          Continue Shopping
        </button>
        <button
          className="proceed-checkout-btn"
          onClick={() => navigate('/payment', { state: { cartItems } })}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
