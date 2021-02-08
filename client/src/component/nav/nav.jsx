import React from "react";
import { Link } from "react-router-dom";
import "./nav.scss";

const Nav = () => {
  return (
    <div className="smallnav">
      <ul className="smallnav__top">
        {/* <li className="smallnav__list smallnav__list-a">
          CATERGORIES
          <ul className="smallnav__droplist">
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&type=food"
                className="smallnav__link"
              >
                food
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&type=drink"
                className="smallnav__link"
              >
                drink
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&type=spices"
                className="smallnav__link"
              >
                spices & seasoning
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&type=snacks"
                className="smallnav__link"
              >
                snacks
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=grocery&type=meat"
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
                to="/products?category=grocery&type=fruit"
                className="smallnav__link"
              >
                fruit & veg
              </Link>
            </li>
          </ul>
        </li> */}
        <li className="smallnav__list tittle">
          vegetables & ethnic foods
          <ul className="smallnav__droplist">
            <li className="smallnav__item">
              <Link
                to="/products?category=vegetables & ethnic foods&type=frozen vegetables"
                className="smallnav__link"
              >
                frozen vegetables
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=vegetables & ethnic foods&type=vegetables"
                className="smallnav__link"
              >
                vegetables
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=vegetables & ethnic foods&type=ethnic foods"
                className="smallnav__link"
              >
                ethnic foods
              </Link>
            </li>
          </ul>
        </li>
        <li className="smallnav__list tittle">
          health & beauty
          <ul className="smallnav__droplist">
            <li className="smallnav__item">
              <Link
                to="/products?category=health & beauty&type=haircare"
                className="smallnav__link"
              >
                haircare
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=health & beauty&type=oral cale"
                className="smallnav__link"
              >
                Oral care
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=health & beauty&type=skincare"
                className="smallnav__link"
              >
                skincare
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=health & beauty&type=wellbeing adults"
                className="smallnav__link"
              >
                wellbeing adults
              </Link>
            </li>
          </ul>
        </li>
        <Link
          to="/products?category=drinks & beverages"
          className="smallnav__link tittle"
        >
          <li>Drinks & beverages</li>
        </Link>
        <Link to="/products?category=offers" className="smallnav__link tittle">
          <li>OFFERS</li>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
