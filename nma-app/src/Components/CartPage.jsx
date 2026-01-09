import "./CartPage.css";

import React, { useMemo, useState } from "react";
import { useCart } from "../CartContext";
import { Link } from "react-router";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const [query, setQuery] = useState("");

  const filteredCart = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cart;
    return cart.filter((c) => c.name.toLowerCase().includes(q));
  }, [cart, query]);

  const total = cart.reduce(
    (s, item) => s + item.price * (item.quantity || 1),
    0
  );

  return (
    <>
      <header className="header cart-header">
        <div className="logo">
          <Link to="/homepage">Nma Provision Shop</Link>
        </div>
        <div className="search">
          <div className="search-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-bar"
              type="text"
              placeholder="Search cart items..."
            />
            <button
              className="search-btn"
              onClick={() => {
                /* click intentionally left to trigger filtering via state */
              }}
            >
              Search
            </button>
          </div>
        </div>
      </header>

      <main className="cart-container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="">
            <ul className="cart-list">
              {filteredCart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price">
                      ₵{item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <button
                    className="remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <strong>Total: ₵{total.toFixed(2)}</strong>
              <div>
                <button className="clear" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default CartPage;
