import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./combo.css";

function ComboPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const [notifications, setNotifications] = useState({});

  const combos = [
    {
      name: "Mobile + Case + Screen Protector",
      images: ["/realme.jpg", "/case.jpg", "/screen.jpg"],
      discount: "15%",
      price: 27340,
      category: "Mobiles"
    },
    {
      name: "Asuz Laptop + Laptop Bag + Wireless Mouse",
      images: ["/azus.jpg", "/dyazo.jpg", "/mouse.jpg"],
      discount: "25%",
      price: 69000,
      category: "Laptops"
    },
    {
      name: "Rainy Protectors: 3-foldable umbrella + Raincoat + RainCap",
      images: ["/3fold.jpg", "/raincoat.jpg", "/cap.jpg"],
      discount: "20%",
      price: 600,
      category: "Rainwear"
    },
    {
      name: "Kitchen Set: Blender + Mixer + Juicer",
      images: ["/blender.jpg", "/mixer.jpg", "/juicer.jpg"],
      discount: "30%",
      price: 12000,
      category: "Kitchen"
    },
    {
      name: "Winter Non-Negotiables: Sweater + Muffler + Ear protectors",
      images: ["/sweater.jpg", "/muffler.jpg", "/protect.jpg"],
      discount: "35%",
      price: 350,
      category: "Winterwear"
    }
  ];

  const handleCardClick = (productCategory) => {
    navigate("/Category", { state: { scrollToCategory: productCategory } });
  };

  const handleAddToCart = (combo) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.name === combo.name);
      let updatedCart;
      if (existingItem) {
        updatedCart = prev.map(item => 
          item.name === combo.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prev, { ...combo, quantity: 1 }];
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });

    setNotifications(prev => ({
      ...prev,
      [combo.name]: `${combo.name} has been added to the cart!`
    }));

    setTimeout(() => {
      setNotifications(prev => ({
        ...prev,
        [combo.name]: null
      }));
    }, 2000);
  };

  return (
    <div className="combo-page-container">
      <h2>🎅 Unwrap Joy with These Irresistible Combos! 🎁</h2>
      <div className="combo-cards">
        {combos.map((combo, index) => (
          <div
            className="combo-card"
            key={index}
            style={{ cursor: "pointer" }}
          >
            <div className="combo-images" onClick={() => handleCardClick(combo.category)}>
              {combo.images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt={`${combo.name} - ${i}`}
                  className="combo-image"
                />
              ))}
            </div>
            <div className="discount-banner">{combo.discount} Off</div>
            <p>{combo.name}</p>
            <p className="price">₹{combo.price.toLocaleString("en-IN")}</p>
            <button 
              className="add-to-cart-btn" 
              onClick={() => handleAddToCart(combo)}
            >
              Add to Cart
            </button>
            {notifications[combo.name] && (
              <div className="notification">{notifications[combo.name]}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComboPage;
