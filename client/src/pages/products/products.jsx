import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import data from "../../services/data.json";
import "./products.scss";

const Products = ({ location, setBasket, basket }) => {
  const [products, setProducts] = useState(data.products);
  const [productsDisplay, setProductsDisplay] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [brandLimit, setBrandLimit] = useState(5);
  const [price, setPrice] = useState(190);
  const [max, setMax] = useState(1);
  const [sort, setSort] = useState({ direction: "ascending", name: "name" });
  const { category, item } = queryString.parse(location.search);

  useEffect(() => {
    const brandList = [];
    products.forEach(
      (cur) =>
        !brandList.includes(cur.brand) && cur.brand && brandList.push(cur.brand)
    );
    setBrandList(brandList);
    const max = Math.max(...products.map((cur) => cur.price));
    const maxValue = max === -1 / 0 ? 0 : max;
    setMax(maxValue);
    setPrice(maxValue);
  }, [products]);

  useEffect(() => {
    const current = [...productsDisplay];
    current.sort((a, b) => {
      if (sort.direction === "ascending") {
        return a[sort.name] > b[sort.name] ? 1 : -1;
      } else {
        return a[sort.name] < b[sort.name] ? 1 : -1;
      }
    });
    setProductsDisplay(current);
  }, [sort]);

  useEffect(() => {
    setProductsDisplay(
      products.filter(
        (cur) =>
          (brands.includes(cur.brand) || !brands.length) && price >= cur.price
      )
    );
  }, [brands, price]);

  const Product = (props) => (
    <div
      className="goods__container"
      style={{ width: "25%", margin: "1rem 4%" }}
    >
      <Link to={`/item/${props._id}`}>
        <img className="goods__image" src={`/img/${props.img}`} alt="" />
        <h5 className="goods__name">{props.name}</h5>
        <h6 className="goods__price">£{props.price}</h6>
      </Link>
      <button
        className="goods__add-basket-btn"
        onClick={() => handleAddBasket(props)}
      >
        <div className="goods__add-basket-text" href="">
          ADD TO BASKET
        </div>
      </button>
    </div>
  );

  const handleBrandFilter = (brand) => {
    const current = [...brands];
    const index = brands.indexOf(brand);
    if (index + 1) current.splice(index, index + 1);
    else current.push(brand);
    setBrands(current);
  };

  const handleAddBasket = (props) => {
    const current = [...basket];
    let index = -1;
    current.forEach((cur, i) => {
      if (cur._id === props._id) index = i;
    });
    if (index + 1) current[index].quantity++;
    else current.push({ ...props, quantity: 1 });
    setBasket(current);
  };

  return (
    <div>
      <div className="main">
        <div className="main__side-menu-container">
          <div className="main__side-menu-box">
            <div className="main__side-header">Product Categories</div>
            <div className="main__category">
              <ul className="main__category-item">
                <li className="main__category__list">Food</li>
                <li className="main__category__list">Food</li>
                <li className="main__category__list">Food</li>
                <li className="main__category__list">Food</li>
                <li className="main__category__list">show more...</li>
              </ul>
            </div>
            <div className="main__side-header">Filter by Brand</div>
            <div className="main__brand">
              <ul className="main__item">
                {brandList.map((cur, i) => (
                  <li
                    key={i}
                    className="main__brand__list"
                    onClick={() => handleBrandFilter(cur)}
                    style={
                      brandLimit && i >= brandLimit
                        ? { display: "none" }
                        : brands.includes(cur)
                        ? { color: "grey" }
                        : null
                    }
                  >
                    {cur}
                  </li>
                ))}
                <li
                  className="main__brand__list"
                  onClick={() => setBrandLimit((prev) => (prev ? 0 : 5))}
                >
                  show {!brandLimit ? "less" : "more"}...
                  <div className=""></div>
                </li>
              </ul>
            </div>
            <div className="main__side-header">Price</div>
            <div className="slider">
              <input
                type="range"
                value={price}
                id="slide"
                min={0}
                max={max}
                onChange={(e) => setPrice(e.target.value)}
              />
              <div className="slider__limit">
                <div>£{0}</div>
                <div>£{max}</div>
              </div>
              <div className="slider__value">£{price}</div>
            </div>
          </div>
        </div>

        <div className="mainproduct">
          <div className="mainproduct__top">
            <div className="mainproduct__header">Rice/Pasta</div>
            <div className="mainproduct__sort-container">
              <span className="mainproduct__sort">Sort by:</span>
              {/* <div className="mainproduct__sort-box">Price</div> */}

              <select
                id="sort"
                className="mainproduct__sort-box"
                value={queryString.stringify(sort)}
                onChange={(e) =>
                  setSort({ ...queryString.parse(e.target.value) })
                }
              >
                <option value="">sort</option>
                <option value={"direction=ascending&name=price"}>
                  price (lowest)
                </option>
                <option value={"direction=decending&name=price"}>
                  price (highest)
                </option>
                <option value={"direction=ascending&name=name"}>
                  name A-Z
                </option>
                <option value={"direction=decending&name=name"}>
                  name Z-A
                </option>
              </select>
            </div>
          </div>
          <div className="product-found">
            <div className="product-found-figure">
              {products.length} product found
            </div>
          </div>

          <div className="goods" style={{ flexWrap: "wrap" }}>
            {productsDisplay.map((cur, i) => (
              <Product key={i} {...cur} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
