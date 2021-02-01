import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";
import "./adminItem.scss";

const AdminItem = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => setProducts(await getProducts(""));
    fetchData();
  }, []);

  return (
    <div className="admin-item">
      {products.map((cur, i) => (
        <div className="products-container" key={i}>
          <Link to={`/item/${cur._id}`} className="hover">
            <img
              className="hover__icon"
              src="/img/icons8-heart-outline.svg"
              alt=""
            />
          </Link>
          <img className="products-image" src={`/img/${cur.images}`} alt="" />
          <h5 className="products-name">{cur.name}</h5>
          <h6 className="products-price">£{cur.price}</h6>
          <div className="products-btn">
            <button className="add-basket-btn">
              <Link
                to={`/admin-panel/item/${cur._id}`}
                className="add-basket-text"
              >
                UPDATE
              </Link>
            </button>
            <button className="add-basket-btn">
              <div className="add-basket-text">DELETE</div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminItem;
