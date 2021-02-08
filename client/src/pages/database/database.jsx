import React, { useEffect, useState } from "react";
import { addItem, updateItem } from "../../services/adminService";
import ReactSpinner from "react-loader-spinner";
import "./database.scss";
import { getProduct } from "../../services/productService";

const Database = ({ match }) => {
  const id = match.params._id == 0 ? 0 : match.params._id;
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [product, setProduct] = useState({
    name: "Test",
    brand: "",
    category: "groceries",
    type: "food",
    description: "This is a test",
    price: 50,
    image: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const product = await getProduct(id);

      setProduct({
        price: product.price,
        name: product.name,
        brand: product.brand,
        category: product.category,
        type: product.type,
        description: product.description,
        image: {},
      });
    };
    id && fetchData();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setPending(true);
    const input = new FormData();
    console.log(product);
    Object.entries(product).forEach((cur) => {
      if (cur[0] === "image" && !cur[1]) return;
      input.append(cur[0], cur[1]);
    });
    const status = id ? await updateItem(id, input) : await addItem(input);
    setStatus(status);
    setPending(false);
    if (status === "success") window.location = "/admin-panel/items";
  };

  const handleOnChange = ({ target }) => {
    const { id, value, files } = target;
    const current = { ...product };
    current[id] = id === "image" ? files : value;
    setProduct(current);
  };

  return (
    <div className="database">
      <form onSubmit={handleOnSubmit}>
        <h1>{id ? "Update" : "Add"} item</h1>
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
          <input id="brand" value={product.brand} onChange={handleOnChange} />
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
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleOnChange}
          />
        </div>
        <div className="status">
          {pending ? (
            <ReactSpinner type="Circles" color="#e47b58" height={25} />
          ) : (
            <div className={`status--${status}`}>{status}</div>
          )}
        </div>
        <button className="login__submit">{id ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
};

export default Database;
