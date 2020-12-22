import React from "react";
import "./latestProducts.scss";

function LatestProducts() {
  const products = [
    { name: "Maringa", price: "£6.99", img: "" },
    { name: "Maringa", price: "£6.99", img: "" },
    { name: "Maringa", price: "£6.99", img: "" },
    { name: "Maringa", price: "£6.99", img: "" },
    { name: "Maringa", price: "£6.99", img: "" },
  ];
  return (
    <section className="latest-products">
      <div className="latest-box">
        <h2 className="latest">SHOP LATEST PRODUCTS</h2>
        <h2 className="see-all">see all</h2>
      </div>
      <div className="products__slidder">
        {products.map((cur) => (
          <div className="products__container">
            <div className="products__image-container">
              <img
                className="products__image"
                src="/img/IMG-20201127-WA0010.jpg"
                alt=""
              />
            </div>
            <h6 className="products__name">{cur.name}</h6>
            <h6 className="products__price">{cur.price}</h6>
            <button className="add-basket-btn">
              <a className="add-basket-text" href="">
                ADD TO BASKET
              </a>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LatestProducts;
