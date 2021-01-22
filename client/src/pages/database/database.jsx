import React, { useState } from "react";
import "./database.scss";

const Database = () => {
  const [product, setProduct] = useState({});

  const handleOnSubmit = () => {
    console.log(product);
    alert("submit");
  };
  const handleOnChange = ({ target }) => {
    const { id, value } = target;
    const current = { ...product };
    current[id] = value;
    setProduct(current);
  };
  return (
    <div className="database">
      <form onSubmit={handleOnSubmit}>
        <h1>Add item</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            required
            value={product.name}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            required
            value={product.brand}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            required
            value={product.category}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input
            id="type"
            required
            value={product.type}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            required
            value={product.description}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            step={0.01}
            required
            value={product.price}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="images">Images</label>
          <input
            type="file"
            id="images"
            required
            value={product.images}
            onChange={handleOnChange}
          />
        </div>
        <button className="login__submit">Submit</button>
      </form>
    </div>
  );
};

export default Database;
