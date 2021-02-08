import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteItem } from "../../services/adminService";
import { getProducts } from "../../services/productService";
import "./adminItem.scss";

const AdminItem = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => setProducts(await getProducts(""));
    fetchData();
  }, []);

  const handleDelete = async (e) => {
    const [id, name] = e.target.id.split("-");
    if (
      name.toUpperCase() !==
      prompt(`Please enter ${name.toUpperCase()} to remove the product`)
    )
      return alert("Incorrect entry");
    const response = await deleteItem(id);
    if (response == 204) {
      alert("DELETED");
      setProducts((prev) => prev.filter((cur) => cur._id !== id));
    } else alert(response);
  };

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
          <img
            className="products-image"
            src={`/img/${cur.image}`}
            alt=""
            onError={(e) => (e.target.src = "/img/logo1.png")}
          />
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
              <div
                id={cur._id + "-" + cur.name}
                className="add-basket-text"
                onClick={handleDelete}
              >
                DELETE
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminItem;
