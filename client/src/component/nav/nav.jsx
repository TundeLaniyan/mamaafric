import React from "react";
import { Link } from "react-router-dom";
import "./nav.scss";

const Nav = () => {
  return (
    <div className="smallnav">
      <ul className="smallnav__top">
        <li className="smallnav__list tittle">
          vegetables & ethnic foods
          <ul className="smallnav__droplist">
            <li className="smallnav__item">
              <Link
                to="/products?category=vegetables and ethnic foods&type=frozen vegetables"
                className="smallnav__link"
              >
                frozen vegetables
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=vegetables and ethnic foods&type=vegetables"
                className="smallnav__link"
              >
                vegetables
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=vegetables and ethnic foods&type=ethnic foods"
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
                to="/products?category=health and beauty&type=haircare"
                className="smallnav__link"
              >
                haircare
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=health and beauty&type=oral cale"
                className="smallnav__link"
              >
                Oral care
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=health and beauty&type=skincare"
                className="smallnav__link"
              >
                skincare
              </Link>
            </li>
            <li className="smallnav__item">
              <Link
                to="/products?category=health and beauty&type=wellbeing adults"
                className="smallnav__link"
              >
                wellbeing adults
              </Link>
            </li>
          </ul>
        </li>
        <Link
          to="/products?category=drinks and beverages"
          className="smallnav__link tittle"
        >
          <li>Drinks & beverages</li>
        </Link>
        <Link
          to="/products?category=accessories and antiques"
          className="smallnav__link tittle"
        >
          <li>accessories & antiques</li>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
