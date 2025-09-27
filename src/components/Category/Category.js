import React, { useEffect, useState } from 'react';
import './Category.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // For the cart icon

// Helper to standardize category IDs
const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').trim();

function CategoryPage({ onAddToCart }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [categoryNotifications, setCategoryNotifications] = useState({});
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

  // Original categories
  const categories = [
    {
      name: 'Electronics',
      products: [
        { id: 1, name: 'Boat Rockerz Headphones', price: 1300, image: '/boathead.jpg' },
        { id: 2, name: 'Asuz Vivobook Series', price: 50000, image: '/azuz.jpg' },
        { id: 3, name: 'Apple Macbook Air', price: 65000, image: '/deal1.jpg' },
        { id: 4, name: 'Epson Natural Black Printer', price: 34000, image: '/epson.jpg' },
        { id: 5, name: 'Sony Bravia O-LED Curved Display', price: 55000, image: '/sony.jpg' },
      ],
    },
    {
      name: 'Fashion',
      products: [
        { id: 6, name: 'Nike Running Shoes', price: 1400, image: '/nike.jpg' },
        { id: 7, name: 'Levi’s Denim Jacket', price: 350, image: '/levis.jpg' },
        { id: 8, name: 'Roadster Blue Boys', price: 540, image: '/roadster.jpg' },
        { id: 9, name: 'Here and How -Kids Edition', price: 450, image: '/here.jpg' },
      ],
    },
    {
      name: 'Home & Office',
      products: [
        { id: 10, name: 'Dyson V11 Vacuum Cleaner', price: 3400, image: '/vaccum.jpg' },
        { id: 11, name: 'Instant Pot Duo', price: 2700, image: '/pot.jpg' },
        { id: 12, name: 'Ikea Office Desk', price: 2500, image: '/ikea.jpg' },
      ],
    },
    {
      name: 'Sports',
      products: [
        { id: 13, name: 'Trek Mountain Bike', price: 27000, image: '/bike.jpg' },
        { id: 14, name: 'Wilson Tennis Racket', price: 2400, image: '/yonex.jpg' },
        { id: 16, name: 'MRF Cricket Bat - Genius Edition', price: 1800, image: '/mrf.jpg' },
      ],
    },
    {
      name: 'Airpods',
      products: [
        { id: 17, name: 'Boat Rockerz -650Hz Bass Boosted', price: 2200, image: '/boat.jpg' },
        { id: 18, name: 'Boat Purple Headphones -Ear Comforters', price: 1500, image: '/headphones.jpg' },
        { id: 19, name: 'JBL tunes -Bass Boosted', price: 880, image: '/jbltune.jpg' },
        { id: 20, name: 'Boat 220Hz Airpods -Black', price: 980, image: '/boats.jpg' },
      ],
    },
    {
      name: 'Laptops',
      products: [
        { id: 21, name: 'Asuz Vivobook -16S', price: 45000, image: '/azuz.jpg' },
        { id: 22, name: 'Apple Mackbook Air Series', price: 67000, image: '/deal1.jpg' },
        { id: 23, name: 'Hp Student series', price: 47000, image: '/hp.jpg' },
      ],
    },
    {
      name: 'SmartWatches',
      products: [
        { id: 24, name: 'Apple Smartwatch -Waterproof', price: 3400, image: '/water.jpg' },
        { id: 25, name: 'Apple Watch Series-9', price: 3200, image: '/apple.jpg' },
        { id: 26, name: 'NoiseFit Colourfit Pro-2', price: 2300, image: '/noise.jpg' },
      ],
    },
    {
      name: 'Backpacks',
      products: [
        { id: 27, name: 'Addixon Black Bags', price: 880, image: '/bag.jpg' },
        { id: 28, name: 'American Tourister Classic', price: 567, image: '/america.jpg' },
        { id: 29, name: 'Roadster Black Backbags', price: 800, image: '/roadsterbag.jpg' },
      ],
    },
    {
      name: 'Mobiles',
      products: [
        { id: 30, name: 'Motorola Edge -50 Fusion', price: 27000, image: '/motorola.jpg' },
        { id: 31, name: 'Realme Narzo -70X Flash Series', price: 27000, image: '/realme.jpg' },
        { id: 32, name: 'Redmi Note 14 Pro+', price: 34000, image: '/redmi.jpg' },
      ],
    },
    {
      name: 'Home -Essentials',
      products: [
        { id: 33, name: 'Philips -Electric Toothbrush', price: 27000, image: '/electric.jpg' },
        { id: 34, name: 'Ninja Airfryer Black -No Oil', price: 27000, image: '/airfryer.jpg' },
        { id: 35, name: 'Instant Icecream Maker -ServeIt', price: 34000, image: '/icecream.jpg' },
      ],
    },
    {
      name: 'Laptop Bags',
      products: [
        { id: 36, name: 'Dyazo -Blue Blast', price: 500, image: '/dyazo.jpg' },
        { id: 37, name: 'Safari bags -Spacious', price: 370, image: '/safaribag.jpg' },
        { id: 38, name: 'Bennett Casual Laptop Sleev', price: 480, image: '/bennett.jpg' },
      ],
    },

  ];

  // Scroll to the category if passed via state
  useEffect(() => {
    if (location.state?.scrollToCategory) {
      const categoryElement = document.getElementById(slugify(location.state.scrollToCategory));
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  const handleProductClick = (product) => {
    navigate('/productdetail', { state: { product } });
  };

  const handleAddToCart = (product, categoryName) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    setCategoryNotifications((prev) => ({
      ...prev,
      [categoryName]: `${product.name} has been added to the cart!`,
    }));

    setTimeout(() => {
      setCategoryNotifications((prev) => ({
        ...prev,
        [categoryName]: null,
      }));
    }, 3000);
  };

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Categories</h1>
        <button
          className="view-cart-btn"
          onClick={() => navigate('/cart', { state: { cartItems } })}
        >
          <FaShoppingCart /> View Cart
        </button>
      </div>

      {categories.map((category, index) => (
        <div key={index} className="category-section" id={slugify(category.name)}>
          <h2>{category.name}</h2>

          {categoryNotifications[category.name] && (
            <div className="notification">{categoryNotifications[category.name]}</div>
          )}

          <div className="category-cards">
            {category.products.map((product) => (
              <div className="category-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => handleProductClick(product)}
                />
                <h3>{product.name}</h3>
                <p>₹{product.price.toLocaleString('en-IN')}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product, category.name)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryPage;
