import React from "react";
import nav from "../../services/data.json";
import { Link } from "react-router-dom";
import "./navMobile.scss";

const NavMobile = () => {
  return (
    <nav className="navigation__nav">
      <img src="/img/logo1.png" alt="" className="navigation__logo" />
      <ul className="navigation__list">
        {Object.entries(nav).map((cur, i) =>
          cur[1].length > 1 ? (
            <li key={i}>
              <label
                className="navigation__links navigation__tittle"
                htmlFor={`checkbox${i}`}
              >
                {cur[0]}
                <span>&#11206;</span>
              </label>
              <input
                type="checkbox"
                className="navigation__checkbox"
                id={`checkbox${i}`}
              />
              <ul className={`navigation__droplist navigation__droplist-${i}`}>
                {cur[1].map((el, i) => (
                  <li key={i}>
                    <Link
                      className="navigation__droplinks"
                      to={`/products?category=${cur[0]}&type=${el}`}
                    >
                      {el}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li>
              <Link
                to={`/products?category=${cur[0]}`}
                className="navigation__links navigation__tittle"
              >
                {cur[0]}
              </Link>
            </li>
          )
        )}
      </ul>
      <div className="navi">
        <div className="navi__icon navi__icon-1"></div>
        <div className="navi__icon navi__icon-2"></div>
        <div className="navi__icon navi__icon-3"></div>
        <div className="navi__icon navi__icon-4"></div>
      </div>
    </nav>
  );
};

export default NavMobile;
