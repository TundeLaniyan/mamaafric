import React from "react";
import "./latestProductsSmall.scss";

function LatestProductsSmall() {
  const categoryBox = [
    { text: "Food", img: 1 },
    { text: "Cosmetic", img: 2 },
    { text: "Drink", img: 3 },
    { text: "Household", img: 4 },
    { text: "Food", img: 1 },
    { text: "Cosmetic", img: 2 },
    { text: "Drink", img: 3 },
    { text: "Household", img: 4 },
    { text: "Food", img: 1 },
    { text: "Cosmetic", img: 2 },
    { text: "Drink", img: 3 },
    { text: "Household", img: 4 },
    { text: "Food", img: 1 },
    { text: "Cosmetic", img: 2 },
    { text: "Drink", img: 3 },
    { text: "Household", img: 4 },
    { text: "Drink", img: 3 },
    { text: "Household", img: 4 },
  ];

  return (
    <section className="category">
      <div className="latest-box">
        <h2 className="latest">SHOP LATEST PRODUCTS</h2>
      </div>
      <div className="category__container">
        {categoryBox.map((cur) => (
          <div className={`category__box category__box-${cur.img}`}>
            <div className="category__text">Food</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LatestProductsSmall;
