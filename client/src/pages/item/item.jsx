import React, { useEffect, useState } from "react";
import { getProduct, getRandomProducts } from "../../services/productService";
import { Link } from "react-router-dom";
import ReactSpinner from "react-loader-spinner";
import "./item.scss";

const Item = ({ match, history, setBasket, basket }) => {
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [randomProducts, setRandomProducts] = useState([]);
  const [infoLoading, setInfoLoading] = useState(true);
  const [randomLoading, setRandomLoading] = useState(true);

  // useEffect(() => setRandomProducts(products), []);

  useEffect(() => {
    const fetchData = async () => {
      const { _id } = match.params;
      const item = await getProduct(_id);
      item._id === _id ? setItem(item) : history.goBack();
      setInfoLoading(false);
      setRandomProducts(await getRandomProducts(5));
      setRandomLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => console.log(item, randomProducts), [item, randomProducts]);

  const handleAddBasket = (product) => {
    const current = [...basket];
    let index = -1;
    const addItem = typeof product._id === "number" ? product : item;
    current.forEach((cur, i) => {
      if (cur._id === addItem._id) index = i;
    });
    if (index + 1) current[index].quantity = quantity;
    else current.push({ ...addItem, quantity });
    setBasket(current);
  };

  return (
    <div>
      <div className="history-box">
        <span className="history-text">home /</span>
        <span className="history-text">food /</span>
        <span className="history-text">rice /</span>
        <span className="history-text">**** /</span>
        <span className="history-text">**** </span>
      </div>
      <div className="item">
        <div className="item__big-container">
          <div className="item__container-1">
            {infoLoading ? (
              <ReactSpinner
                type="Circles"
                color="#ffe7ba"
                height={"22.5%"}
                width={"100%"}
              />
            ) : (
              <img
                src={`/img/${item.image}`}
                alt=""
                className="item__img"
                onError={(e) => (e.target.src = "/img/logo1.png")}
              />
            )}

            <div className="item__box">
              <div className="catergory__box">
                <span className="item__category">Category /</span>
                <span className="item__category-link">Food</span>
              </div>

              <div className="item__name">
                {infoLoading ? (
                  <ReactSpinner
                    type="Circles"
                    color="#ffe7ba"
                    height={20}
                    width={"20%"}
                  />
                ) : (
                  item.name
                )}
              </div>

              <div className="item__price">
                £
                {infoLoading ? (
                  <ReactSpinner
                    type="Circles"
                    color="#ffe7ba"
                    height={20}
                    width={"20%"}
                  />
                ) : (
                  item.price
                )}
              </div>

              <div className="item__description">
                {infoLoading ? (
                  <ReactSpinner
                    type="Circles"
                    color="#ffe7ba"
                    height={20}
                    width={"20%"}
                  />
                ) : (
                  item.description
                )}
              </div>

              {infoLoading ? (
                <ReactSpinner
                  type="Circles"
                  color="#ffe7ba"
                  height={"30%"}
                  width={"100%"}
                />
              ) : (
                <>
                  <input
                    className="item__quantity-box"
                    type="number"
                    value={quantity}
                    min={1}
                    step={1}
                    onChange={(e) => setQuantity(e.target.value * 1)}
                  />
                  <span className="item__quantity">Quantity</span>
                  <button className="item__btn">
                    <div className="item__btn-text">BUY NOW</div>{" "}
                  </button>
                  <button className="item__btn" onClick={handleAddBasket}>
                    <div className="item__btn-text">ADD TO CART</div>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="items__service">
            <div className="service">
              <div className="service__container">
                <div className="service__icon service__icon-1"></div>
                <div className="service__box">
                  <div className="service__title">FREE SHIPPING</div>
                  <div className="service__text">On order over £100</div>
                </div>
              </div>

              <div className="service__container">
                <div className="service__icon service__icon-2"></div>
                <div className="service__box">
                  <div className="service__title">ALWAYS FRESH</div>
                  <div className="service__text">Product well packaged</div>
                </div>
              </div>
              <div className="service__container">
                <div className="service__icon service__icon-3"></div>
                <div className="service__box">
                  <div className="service__title">SUPERIOR QUALITY</div>
                  <div className="service__text">Quality products</div>
                </div>
              </div>
              <div className="service__container">
                <div className="service__icon service__icon-4"></div>
                <div className="service__box">
                  <div className="service__title">SUPPORT</div>
                  <div className="service__text">2/7 support servive</div>
                </div>
              </div>
            </div>
          </div>

          <div className="feedback">
            <div className="feedback__header">Feedback/Review</div>
            <div className="feedback__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              nostrum laborum beatae architecto, quaerat hic minus ut
              perferendis, sit autem dicta, id est debitis consectetur accusamus
              quia rerum molestiae porro. <b>more...</b>
            </div>
          </div>
        </div>

        <div className="item__container-2">
          <div className="item__container-2__header">Shipping Info</div>
          {/* <div className="item__container-2__text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
            incidunt pariatur harum possimus exercitationem debitis eum ipsam
            doloribus quam repellendus,{" "}
          </div> */}
          <div className="item__container-2__header">Delivery</div>
          <div className="item__container-2__text">
            Normally delivered between 2 days after confirmation of your order
            date. Please check exact dates in the Checkout page.See more{" "}
          </div>
          <div className="item__container-2__header">Return Policy</div>
          <div className="item__container-2__text">
            Free return within 15 days.See more{" "}
          </div>
          <div className="item__container-2__header">Warranty</div>
          <div className="item__container-2__text">-</div>
        </div>
      </div>
      <section className="latest-products">
        <div className="latest-box">
          <h2 className="latest">RELATED PRODUCTS</h2>
          <Link to="/products">
            <h2 className="see-all">see all</h2>
          </Link>
        </div>
        <div className="products-slidder">
          {randomProducts.slice(0, 5).map((cur, i) =>
            randomLoading ? (
              <ReactSpinner
                key={i}
                type="Circles"
                color="#ffe7ba"
                height={80}
                width={80}
              />
            ) : (
              <div className="products-container" key={i}>
                <Link to={`item/${cur._id}`}>
                  <img
                    className="products-image"
                    src={`/img/${cur.image}`}
                    onError={(e) => (e.target.src = "/img/logo1.png")}
                    alt=""
                  />
                  <h5 className="products-name">{cur.name}</h5>
                </Link>
                <h6 className="products-price">{cur.price}</h6>
                <button className="add-basket-btn">
                  <div
                    className="add-basket-text"
                    onClick={() => handleAddBasket(cur)}
                  >
                    ADD TO BASKET
                  </div>
                </button>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Item;
