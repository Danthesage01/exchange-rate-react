import React from "react";
import currency from "../assets/money.png";
function Header() {
  return (
    <div className="container">
      <img src={currency} alt="currency" className="header-img" />
      <h1 className="head-title">Exchange Rate Calculator</h1>
      <p className="head-description">
        Choose the currency and the amounts to get the exchange rate
      </p>
    </div>
  )
}

export default Header;
