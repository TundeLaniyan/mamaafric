import React, { useEffect, useState } from "react";
import { products } from "../../services/data.json";
import "./item.scss";

const Item = ({ match, setBasket, basket }) => {
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const { _id } = match.params;
    const product = products.filter((cur) => cur._id === _id * 1)[0];
    if (product) {
      product.info =
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum officia nobis ex autem obcaecati aut, expedita delectus consectetur sed mollitia aliquid distinctio optio rem hic veniam velit beatae, veritatis eum!";
      setItem(product);
    }
  }, []);

  const handleAddBasket = () => {
    const current = [...basket];
    let index = -1;
    current.forEach((cur, i) => {
      if (cur._id === item._id) index = i;
    });
    if (index + 1) current[index].quantity = quantity;
    else current.push({ ...item, quantity });
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
            <img src={`/img/${item.img}`} alt="" className="item__img" />

            <div className="item__box">
              <div className="catergory__box">
                <span className="item__category">Category /</span>
                <span className="item__category-link">Food</span>
              </div>

              <div className="item__name">{item.name}</div>
              <div className="item__price">£{item.price}</div>
              <div className="item__description">{item.info}</div>
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
          <div className="item__container-2__text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
            incidunt pariatur harum possimus exercitationem debitis eum ipsam
            doloribus quam repellendus,{" "}
          </div>
          <div className="item__container-2__header">Delivery</div>
          <div className="item__container-2__text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
            incidunt pariatur harum possimus exercitationem debitis eum ipsam
            doloribus quam repellendus,{" "}
          </div>
          <div className="item__container-2__header">Return Policy</div>
          <div className="item__container-2__text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
            incidunt pariatur harum possimus exercitationem debitis eum ipsam
            doloribus quam repellendus,{" "}
          </div>
          <div className="item__container-2__header">Warranty</div>
          <div className="item__container-2__text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
            incidunt pariatur harum possimus exercitationem debitis eum ipsam
            doloribus quam repellendus,
          </div>
        </div>
      </div>
      <section className="latest-products">
        <div className="latest-box">
          <h2 className="latest">RELATED PRODUCTS</h2>
          <h2 className="see-all">see all</h2>
        </div>
        <div className="products-slidder">
          <div className="products-container">
            <img
              className="products-image"
              src="/img/IMG-20201127-WA0010.jpg"
              alt=""
            />
            <h5 className="products-name">Maringa</h5>
            <h6 className="products-price"> £6.99</h6>
            <button className="add-basket-btn">
              <a className="add-basket-text" href="">
                ADD TO BASKET
              </a>
            </button>
          </div>
          <div className="products-container">
            <img
              className="products-image"
              src="/img/IMG-20201127-WA0010.jpg"
              alt=""
            />
            <h5 className="products-name">Maringa</h5>
            <h6 className="products-price"> £6.99</h6>
            <button className="add-basket-btn">
              <a className="add-basket-text" href="">
                ADD TO BASKET
              </a>
            </button>
          </div>

          <div className="products-container">
            <img
              className="products-image"
              src="/img/IMG-20201127-WA0010.jpg"
              alt=""
            />
            <h5 className="products-name">Maringa</h5>
            <h6 className="products-price"> £6.99</h6>
            <button className="add-basket-btn">
              <a className="add-basket-text" href="">
                ADD TO BASKET
              </a>
            </button>
          </div>

          <div className="products-container">
            <img
              className="products-image"
              src="/img/IMG-20201127-WA0010.jpg"
              alt=""
            />
            <h5 className="products-name">Maringa</h5>
            <h6 className="products-price"> £6.99</h6>
            <button className="add-basket-btn">
              <a className="add-basket-text" href="">
                ADD TO BASKET
              </a>
            </button>
          </div>

          <div className="products-container">
            <img
              className="products-image"
              src="/img/IMG-20201127-WA0010.jpg"
              alt=""
            />
            <h5 className="products-name">Maringa</h5>
            <h6 className="products-price"> £6.99</h6>
            <button className="add-basket-btn">
              <a className="add-basket-text" href="">
                ADD TO BASKET
              </a>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Item;
