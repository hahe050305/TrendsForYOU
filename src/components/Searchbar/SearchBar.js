import React, { useState, useEffect } from "react";
import "./Searchbar.css";
import { useNavigate } from "react-router-dom";

// Helper to standardize category IDs
const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').trim();

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [placeholder, setPlaceholder] = useState("Search for products, categories...");

  const navigate = useNavigate();

  const placeholders = [
    "Search for mobiles, laptops, combo offers...",
    "Find the best deals on headphones and more...",
    "Explore trending fashion and accessories...",
    "Discover smartwatches and gadgets...",
    "Shop backpacks, sports gear, and essentials...",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholders[index]);
      index = (index + 1) % placeholders.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const productData = [
    { name: "Boat Rockerz Headphones", price: 1300, categories: ["Electronics"] },
    { name: "Asus Vivobook Series", price: 50000, categories: ["Electronics"] },
    { name: "Apple Macbook Air", price: 65000, categories: ["Electronics"] },
    { name: "Epson Natural Black Printer", price: 34000, categories: ["Electronics"] },
    { name: "Sony Bravia O-LED Curved Display", price: 55000, categories: ["Electronics"] },
    { name: "Nike Running Shoes", price: 1400, categories: ["Fashion"] },
    { name: "Levi’s Denim Jacket", price: 350, categories: ["Fashion"] },
    { name: "Roadster Blue Boys", price: 540, categories: ["Fashion"] },
    { name: "Here and How -Kids Edition", price: 450, categories: ["Fashion"] },
    { name: "Dyson V11 Vacuum Cleaner", price: 3400, categories: ["Home & Office"] },
    { name: "Instant Pot Duo", price: 2700, categories: ["Home & Office"] },
    { name: "Ikea Office Desk", price: 2500, categories: ["Home & Office"] },
    { name: "Trek Mountain Bike", price: 27000, categories: ["Sports"] },
    { name: "Wilson Tennis Racket", price: 2400, categories: ["Sports"] },
    { name: "MRF Cricket Bat - Genius Edition", price: 1800, categories: ["Sports"] },
    { name: "Boat Rockerz -650Hz Bass Boosted", price: 2200, categories: ["Earpods"] },
    { name: "Boat Purple Headphones -Ear Comforters", price: 1500, categories: ["Earpods"] },
    { name: "JBL tunes -Bass Boosted", price: 880, categories: ["Earpods"] },
    { name: "Asus Vivobook -16S", price: 45000, categories: ["Laptops"] },
    { name: "Apple Mackbook Air Series", price: 67000, categories: ["Laptops"] },
    { name: "Hp Student series", price: 47000, categories: ["Laptops"] },
    { name: "Apple Smartwatch -Waterproof", price: 3400, categories: ["SmartWatches"] },
    { name: "Apple Watch Series-9", price: 3200, categories: ["SmartWatches"] },
    { name: "NoiseFit Colourfit Pro-2", price: 2300, categories: ["SmartWatches"] },
    { name: "Addixon Black Bags", price: 880, categories: ["Backpacks"] },
    { name: "American Tourister Classic", price: 567, categories: ["Backpacks"] },
    { name: "Roadster Black Backbags", price: 800, categories: ["Backpacks"] },
  ];

  // Function to filter suggestions based on input, price, and category
  const filterSuggestions = (input = query, price = priceFilter, category = categoryFilter) => {
    if (!input && !price && !category) {
      setSuggestions([]);
      return;
    }

    const priceLimit = parseInt(price);
    const filtered = productData.filter(item => {
      return (
        (!input || item.name.toLowerCase().includes(input.toLowerCase())) &&
        (!price || item.price <= priceLimit) &&
        (!category || item.categories.includes(category))
      );
    });
    setSuggestions(filtered);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    filterSuggestions(input);
  };

  const handlePriceFilterChange = (e) => {
    const price = e.target.value;
    setPriceFilter(price);
    filterSuggestions(query, price);
  };

  const handleCategoryFilterChange = (e) => {
    const category = e.target.value;
    setCategoryFilter(category);
    filterSuggestions(query, priceFilter, category);
  };

  const handleSuggestionClick = (item) => {
    setSuggestions([]);
    const categoryId = slugify(item.categories[0]);
    navigate("/Category", { state: { scrollToCategory: categoryId } });
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
        />
        <select className="price-filter" value={priceFilter} onChange={handlePriceFilterChange}>
          <option value="">All Prices</option>
          <option value="500">Up to $500</option>
          <option value="1000">Up to $1000</option>
          <option value="2000">Up to $2000</option>
          <option value="3000">Up to $3000</option>
        </select>
        <select className="category-filter" value={categoryFilter} onChange={handleCategoryFilterChange}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Office">Home & Office</option>
          <option value="Sports">Sports</option>
          <option value="Beauty">Beauty</option>
          <option value="Laptops">Laptops</option>
          <option value="SmartWatches">SmartWatches</option>
          <option value="Earpods">Earpods</option>
          <option value="Backpacks">Backpacks</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {suggestions.length > 0 && (
        <ul className="dropdown">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSuggestionClick(item)}>
              <strong>{item.name}</strong>
              {item.price && ` - $${item.price}`}
              {item.categories && (
                <span className="category"> ({item.categories.join(" > ")})</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
