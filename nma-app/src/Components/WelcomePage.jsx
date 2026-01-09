import "./WelcomePage.css";
import React from "react";
import { Link } from "react-router";

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <div className="text-focus-in">
        <h1>Welcome to Nma Provision Shop</h1>
        <p>Your one-stop shop for all your provision needs!</p>
        <Link to="/homepage">
          <button className="button">Enter Shop</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
