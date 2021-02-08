import React from "react";
import { Link } from "react-router-dom";
import "./product.scss";

const Product = (props) => {
  const handleAddBasket = () => {
    const current = [...props.basket];
    let index = -1;
    current.forEach((cur, i) => {
      if (cur._id === props._id) index = i;
    });
    if (index + 1) current[index].quantity++;
    else current.push({ ...props, quantity: 1 });
    props.setBasket(current);
  };
  return (
    <div
      className="product__container"
      style={{ width: "25%", margin: "1rem 4%" }}
    >
      <Link to={`/item/${props._id}`} className="product__container-link">
        <img className="product__image" src={`/img/${props.image}`} alt="" />
        <h5 className="product__name">{props.name}</h5>
        <h6 className="product__price">£{props.price}</h6>
      </Link>
      <button className="product__add-basket-btn" onClick={handleAddBasket}>
        <div className="product__add-basket-text" href="">
          ADD TO BASKET
        </div>
      </button>
    </div>
  );
};

export default Product;
