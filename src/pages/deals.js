import React from "react";
import { useNavigate } from "react-router-dom";
import "./deals.css";

// Helper to standardize category IDs
const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-").trim();

function DealsPage() {
  const navigate = useNavigate();

  const deals = [
    { name: "Apple Macbook Air Series-Z", image: "/deal1.jpg", category: "Laptops" },
    { name: "Realme Narzo 70-X Flash Series", image: "/realme.jpg", category: "Mobiles" },
    { name: "Boat Rockerz HeadPhones", image: "/boathead.jpg", category: "Airpods" },
    { name: "Sony Bravia O-LED Curved Display", image: "/sony.jpg", category: "Electronics" },
    { name: "Epson Natural Black Printer", image: "/epson.jpg", category: "Electronics" },
  ];

  const handleCardClick = (category) => {
    navigate("/category", { state: { scrollToCategory: slugify(category) } });
  };

  return (
    <div className="deals-page-container">
      <h2>Deals of the Day</h2>
      <div className="deal-cards">
        {deals.map((deal, index) => (
          <div
            className="deal-card"
            key={index}
            onClick={() => handleCardClick(deal.category)}
            style={{ cursor: "pointer" }}
          >
            <img src={deal.image} alt={deal.name} />
            <div className="discount-banner">20% Off</div>
            <p>{deal.name}</p>
            <p className="price">Grab it NOW!!!</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DealsPage;
