import React, { useEffect, useState } from "react";
import queryString from "query-string";
import Product from "../../component/product/product";
import { getProducts } from "../../services/productService";
import ReactSpinner from "react-loader-spinner";
import "./products.scss";

const Products = ({ location, setBasket, basket }) => {
  const [products, setProducts] = useState([]);
  const [productsDisplay, setProductsDisplay] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [brandLimit, setBrandLimit] = useState(5);
  const [price, setPrice] = useState(190);
  const [max, setMax] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState({ direction: "ascending", name: "name" });
  const { category, type, search } = queryString.parse(location.search);
  const categoryDescription = {
    groceries:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
    home: "Toiletries, kitchen accessory, household items, cleaning products",
    "health and beauty": "Skin care, Make up, hair products, oral products",
    offers: "Always check to see what fantastic offers we have available",
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getProducts(location.search);
      console.log(data);
      setProducts(data);
      setIsLoading(false);
    };
    fetchData();
  }, [location.search]);

  useEffect(() => {
    const brandList = [];
    const categoryList = [];
    products.forEach((cur) => {
      !brandList.includes(cur.brand) && cur.brand && brandList.push(cur.brand);
      !categoryList.includes(cur.category) &&
        cur.category &&
        categoryList.push(cur.category);
    });
    setBrandList(brandList);
    setCategoryList(categoryList);
    const max = Math.max(...products.map((cur) => cur.price));
    const maxValue = Math.ceil(max === -1 / 0 ? 0 : max);
    setMax(maxValue);
    setPrice(maxValue);
    setProductsDisplay(products);
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
          (brands.includes(cur.brand) || !brands.length) &&
          price >= cur.price &&
          (categories.includes(cur.category) || !categories.length)
      )
    );
  }, [brands, price, categories]);

  const handleBrandFilter = (brand) => {
    const current = [...brands];
    const index = brands.indexOf(brand);
    if (index + 1) current.splice(index, index + 1);
    else current.push(brand);
    setBrands(current);
  };

  const handleCategoryFilter = (category) => {
    const current = [...categories];
    const index = categories.indexOf(category);
    if (index + 1) current.splice(index, index + 1);
    else current.push(category);
    setCategories(current);
  };

  return (
    <div>
      <div className={`food food--${category && category.replace(/\s/g, "")}`}>
        <div className="food__container">
          <div className="food__header">
            {(category && category.split(" ")[0]) ||
              search.slice(0, 10) ||
              "products"}
          </div>
          <div className="food__header-small">
            {categoryDescription[category] || categoryDescription.offers}
          </div>
        </div>
      </div>
      <div className="main">
        <label className="productslide__close" htmlFor="close1">
          <div className="slidearrow">&#9207;</div>
          <svg
            className="filter-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            width="48px"
            height="48px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
          </svg>
        </label>
        <input type="checkbox" id="close1" className="close"></input>

        <div className="big">
          <div className="main__side-menu-container">
            <div className="main__side-menu-box">
              <div className="main__side-header">Product Categories</div>
              <div className="main__category">
                <ul className="main__category-item">
                  {categoryList.map((cur, i) => (
                    <li
                      key={i}
                      className="main__category__list"
                      onClick={() => handleCategoryFilter(cur)}
                      style={
                        categoryList.includes(cur) ? { color: "grey" } : null
                      }
                    >
                      {cur}
                    </li>
                  ))}
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
        </div>

        <div className="mainproduct">
          <div className="mainproduct__top">
            <div className="mainproduct__header">{type || category}</div>
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
            {isLoading ? (
              <ReactSpinner
                type="Circles"
                color="#ffe7ba"
                height={80}
                width={80}
              />
            ) : (
              productsDisplay.map((cur, i) => (
                <Product
                  key={i}
                  basket={basket}
                  setBasket={setBasket}
                  {...cur}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
