import React, { useState } from "react";
import ShoppingCart from "../shoppingCart/shoppingCart";
import NavMobile from "../navMobile/navMobile";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = ({ basket, setBasket }) => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    window.location = `/products?search=${search}`;
    setSearch("");
  };
  return (
    <header>
      <Link to="/">
        <img className="logo" src="/img/logo1.png" alt="" />
      </Link>
      <div className="navigation">
        <input
          type="checkbox"
          className="navigation__checkbox"
          id="navi-toggle"
        />
        <label htmlFor="navi-toggle" className="navigation__button">
          <div className="navigation__icon">&nbsp;</div>
        </label>
        <div className="navigation__background"></div>
        <NavMobile />
      </div>

      <form className="bar-box" onSubmit={handleSubmit}>
        <input
          className="search-bar"
          placeholder="&#128269;"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-text">search</button>
      </form>
      <div className="icon-box" onClick={() => setCart((prev) => !prev)}>
        <div className="icon-text">
          <div>Cart</div>
        </div>
        <div className="icon icon-2"></div>
        {basket.length > 0 && (
          <div className="cart-amount">
            <div className="cart-figure">
              {
                basket.reduce((a, b) => {
                  return { quantity: a.quantity + b.quantity };
                }).quantity
              }
            </div>
          </div>
        )}
      </div>

      <ShoppingCart
        display={cart}
        setDisplay={setCart}
        basket={basket}
        setBasket={setBasket}
      />
    </header>
  );
};

export default Header;
