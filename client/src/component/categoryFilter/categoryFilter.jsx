import React from "react";
import "./categoryFilter.scss";

const CategoryFilter = () => {
  return (
    <nav className="small-nav">
      <li className="small-nav__item">
        <a href="" className="small-nav__link">
          catergory
        </a>
        <ul className="droplist">
          <li className="droplist__item">
            <a href="" className="droplist__link"></a>Item
          </li>
          <li className="droplist__item">
            <a href="" className="droplist__link"></a>Item
          </li>
          <li className="droplist__item">
            <a href="" className="droplist__link"></a>Item
          </li>
          <li className="droplist__item">
            <a href="" className="droplist__link"></a>Item
          </li>
        </ul>
      </li>
      <li className="small-nav__item">
        <a href="" className="small-nav__link">
          catergory
        </a>
        <ul className="droplist">
          <li className="droplist__item">
            <a href="" className="droplist__link"></a>Meat
          </li>
          <li className="droplist__item">
            <a href="" className="droplist__link"></a>Meat
          </li>
          <li className="droplist__item">
            <a href="" className="droplist__link"></a>Meat
          </li>
          <li className="droplist__item">
            <a href="" className="droplist__link"></a>Meat
          </li>
        </ul>
      </li>
      <li className="small-nav__item">
        <a href="" className="small-nav__link">
          catergory
        </a>
      </li>
      <li className="small-nav__item">
        <a href="" className="small-nav__link">
          catergory
        </a>
      </li>
      <li className="small-nav__item">
        <a href="" className="small-nav__link">
          catergory
        </a>
      </li>
    </nav>
  );
};

export default CategoryFilter;
