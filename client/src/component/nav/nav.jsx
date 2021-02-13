import React from "react";
import { Link } from "react-router-dom";
import nav from "../../services/data.json";
import "./nav.scss";

const Nav = () => {
  return (
    <div className="smallnav">
      <ul className="smallnav__top">
        {Object.entries(nav).map((cur) => (
          <li key={cur[0]} className="smallnav__list tittle">
            {cur[1].length > 1 ? (
              <>
                {cur[0]}
                <ul className="smallnav__droplist">
                  {cur[1].map((el) => (
                    <li key={el} className="smallnav__item">
                      <Link
                        to={`/products?category=${cur[0]}&type=${el}`}
                        className="smallnav__link"
                      >
                        {el}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link
                to={`/products?category=${cur[0]}`}
                className="smallnav__link tittle"
              >
                {cur[0]}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
