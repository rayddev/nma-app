import "./HomePage.css";
import SearchIcon from "../assets/search.png";
import { useCart } from "../CartContext";
import { Link } from "react-router";

import React, { useMemo, useState } from "react";

const HomePage = () => {
  const { addToCart, cart } = useCart();
  const totalItems = cart.reduce((s, it) => s + (it.quantity || 1), 0);
  const [query, setQuery] = useState("");
  const [qtyOpen, setQtyOpen] = useState(null);
  const [qtyValues, setQtyValues] = useState({});
  const products = [
    { id: 1, name: "Flour", price: 25.5, image: "/src/assets/Flour.jpeg" },
    { id: 2, name: "Maize", price: 15.75, image: "/src/assets/Maize.jpeg" },
    { id: 3, name: "Rice", price: 30.0, image: "/src/assets/Rice.jpeg" },
    { id: 4, name: "Salt", price: 5.25, image: "/src/assets/Salt.jpeg" },
    { id: 5, name: "Sugar", price: 20.99, image: "/src/assets/Sugar.jpeg" },
    { id: 6, name: "Chips", price: 40.5, image: "/src/assets/Chips.jpeg" },
    { id: 7, name: "Flour", price: 12.75, image: "/src/assets/Flour.jpeg" },
    {
      id: 8,
      name: "Baked Beans",
      price: 18.25,
      image: "/src/assets/Baked Beans.jpeg",
    },
    { id: 9, name: "Water", price: 25.0, image: "/src/assets/Water.jpeg" },
    {
      id: 10,
      name: "Chocolate",
      price: 15.0,
      image: "/src/assets/Chocolate.jpeg",
    },
    { id: 11, name: "Coke", price: 15.0, image: "/src/assets/Coke.jpeg" },
    { id: 12, name: "Sardine", price: 25.0, image: "/src/assets/Sardine.jpeg" },
    { id: 13, name: "Tea", price: 25.0, image: "/src/assets/Tea.jpeg" },
    {
      id: 14,
      name: "Tomato Paste",
      price: 25.0,
      image: "/src/assets/Tomato Paste.jpeg",
    },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <div>
      <header className="header">
        <a href="/welcomepage" className="logo">
          Nma Provision Shop
        </a>
        <div className="search-container">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="search-bar"
            placeholder="Search products..."
          />
          <img src={SearchIcon} alt="Search Icon" className="search-icon" />
        </div>
        <Link to="/cartpage" className="cart-link">
          Cart
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </header>
      <main className="products-container">
        {filtered.map((product) => (
          <div key={product.id} className="product">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₵{product.price.toFixed(2)}</p>
            {cart.find((c) => c.id === product.id) ? (
              <button className="order-button ordered">
                Added ({cart.find((c) => c.id === product.id).quantity})
              </button>
            ) : (
              <>
                {qtyOpen === product.id ? (
                  <div className="qty-panel">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        setQtyValues((p) => ({
                          ...p,
                          [product.id]: Math.max(1, (p[product.id] || 1) - 1),
                        }))
                      }
                    >
                      -
                    </button>
                    <input
                      className="qty-input"
                      type="number"
                      min="1"
                      value={qtyValues[product.id] || 1}
                      onChange={(e) =>
                        setQtyValues((p) => ({
                          ...p,
                          [product.id]: Math.max(
                            1,
                            Number(e.target.value) || 1
                          ),
                        }))
                      }
                    />
                    <button
                      className="qty-btn"
                      onClick={() =>
                        setQtyValues((p) => ({
                          ...p,
                          [product.id]: (p[product.id] || 1) + 1,
                        }))
                      }
                    >
                      +
                    </button>
                    <button
                      className="order-button"
                      onClick={() => {
                        const qty = qtyValues[product.id] || 1;
                        addToCart(product, qty);
                        setQtyOpen(null);
                      }}
                    >
                      Add {qtyValues[product.id] || 1}
                    </button>
                    <button
                      className="order-button cancel"
                      onClick={() => setQtyOpen(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="order-button"
                    onClick={() => {
                      setQtyOpen(product.id);
                      setQtyValues((p) => ({ ...p, [product.id]: 1 }));
                    }}
                  >
                    Order Now
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default HomePage;
