import React, { useState } from "react";
import ShoppingCart from "../shoppingCart/shoppingCart";
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
        <nav className="navigation__nav">
          <img src="/img/logo1.png" alt="" className="navigation__logo" />
          <ul className="navigation__list">
            <li>
              <label
                className="navigation__links navigation__tittle"
                htmlFor="checkbox2"
              >
                Vegetables & ethnic foods
                <span>&#11206;</span>
              </label>
              <input
                type="checkbox"
                className="navigation__checkbox"
                id="checkbox2"
              />
              <ul className="navigation__droplist navigation__droplist-2">
                <li>
                  <Link
                    className="navigation__droplinks"
                    to="/products?category=vegetables and ethnic foods&type=frozen vegetables"
                  >
                    Frozen vegetables
                  </Link>
                </li>
                <li>
                  <Link
                    className="navigation__droplinks"
                    to="/products?category=vegetables and ethnic foods&type=vegetables"
                  >
                    Vegetables
                  </Link>
                </li>
                <li>
                  <Link
                    className="navigation__droplinks"
                    to="/products?category=vegetables and ethnic foods&type=ethnic foods"
                  >
                    Ethnic foods
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <label
                className="navigation__links navigation__tittle"
                htmlFor="checkbox3"
              >
                Health & beauty<span>&#11206;</span>
              </label>
              <input
                type="checkbox"
                className="navigation__checkbox"
                id="checkbox3"
              />
              <ul className="navigation__droplist navigation__droplist-3">
                <li>
                  <Link
                    className="navigation__droplinks"
                    to="/products?category=health and beauty&type=haircare"
                  >
                    Haircare
                  </Link>
                </li>
                <li>
                  <Link
                    className="navigation__droplinks"
                    to="/products?category=health and beauty&type=oral cale"
                  >
                    Oral care
                  </Link>
                </li>
                <li>
                  <Link
                    className="navigation__droplinks"
                    to="/products?category=health and beauty&type=skincare"
                  >
                    Skincare
                  </Link>
                </li>
                <li>
                  <Link
                    className="navigation__droplinks"
                    to="/products?category=health and beauty&type=wellbeing adults"
                  >
                    Wellbeing adults
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/products?category=drinks and beverages"
                className="navigation__links navigation__tittle"
              >
                Drinks & beverages
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=accessories and antiques"
                className="navigation__links navigation__tittle"
              >
                Accessories & antiques
              </Link>
            </li>
          </ul>
          <div className="navi">
            <div className="navi__icon navi__icon-1"></div>
            <div className="navi__icon navi__icon-2"></div>
            <div className="navi__icon navi__icon-3"></div>
            <div className="navi__icon navi__icon-4"></div>
          </div>
        </nav>
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
