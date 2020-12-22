import React from "react";
import { Link } from "react-router-dom";
import "./nav.scss";

const Nav = () => {
  return (
    <div className="smallnav">
      <ul className="smallnav__top">
        <li className="smallnav__list smallnav__list-a">
          CATERGORIES
          <ul className="smallnav__droplist">
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&item=food"
                className="smallnav__link"
              >
                food
              </Link>{" "}
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&item=drink"
                className="smallnav__link"
              >
                drink
              </Link>{" "}
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&item=spices"
                className="smallnav__link"
              >
                spices & seasoning
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&item=snacks"
                className="smallnav__link"
              >
                snacks
              </Link>{" "}
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&item=meat"
                className="smallnav__link"
              >
                meat, fish & poultry
              </Link>
            </li>
            <li className="smallnav__item">
              <Link to="" className="smallnav__link">
                rice, pasta, flour
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&item=fruit"
                className="smallnav__link"
              >
                fruit & veg
              </Link>{" "}
            </li>
          </ul>
        </li>
        <li className="smallnav__list">
          GROCERIES
          <ul className="smallnav__droplist">
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&item=food"
                className="smallnav__link"
              >
                food
              </Link>{" "}
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&item=drink"
                className="smallnav__link"
              >
                drink
              </Link>{" "}
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&item=spices"
                className="smallnav__link"
              >
                spices & seasoning
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&item=snacks"
                className="smallnav__link"
              >
                snacks
              </Link>{" "}
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&item=meat"
                className="smallnav__link"
              >
                meat, fish & poultry
              </Link>
            </li>
            <li className="smallnav__item">
              <Link to="" className="smallnav__link">
                rice, pasta, flour
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&item=fruit"
                className="smallnav__link"
              >
                fruit & veg
              </Link>{" "}
            </li>
          </ul>
        </li>
        <li className="smallnav__list">
          HOME PRODUCTS
          <ul className="smallnav__droplist">
            <li className="smallnav__item">
              <Link to="/products?category=home" className="smallnav__link">
                household items
              </Link>{" "}
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=home&item=mats"
                className="smallnav__link"
              >
                mats
              </Link>{" "}
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=home&item=jug"
                className="smallnav__link"
              >
                Jugs
              </Link>{" "}
            </li>
          </ul>
        </li>
        <li className="smallnav__list">
          HEALTH & BEAUTY
          <ul className="smallnav__droplist">
            <li className="smallnav__item">
              <Link
                to="/products?category=health and beauty&item=skin care"
                className="smallnav__link"
              >
                skin care
              </Link>{" "}
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=health and beauty&item=hair care"
                className="smallnav__link"
              >
                hair care
              </Link>{" "}
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=health and beauty&item=oral care"
                className="smallnav__link"
              >
                oral care
              </Link>{" "}
            </li>
          </ul>
        </li>
        <li className="smallnav__list">OFFERS</li>
      </ul>
    </div>
  );
};

export default Nav;
