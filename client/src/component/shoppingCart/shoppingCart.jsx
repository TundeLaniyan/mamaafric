import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { getStripeSession } from "../../services/orderService";
import "./shoppingCart.scss";
const stripe = window.Stripe(
  "pk_live_51IGl6rJeTyzaaduBarvR1isfMXhszGFNvlljqInfjNW5Lk974JfU5kMk1N34VeuTW9GUJgnnG2hjbsPeNuC2l3D9001oIwPB0i"
);

const ShoppingCart = ({ display, setDisplay, basket, setBasket }) => {
  const handleQuantityChange = (e, i) => {
    const current = [...basket];
    current[i].quantity = e.target.value * 1;
    setBasket(current);
  };
  const handleDelete = (i) => {
    const current = [...basket];
    current.splice(i, 1);
    setBasket(current);
  };
  const stripeCheckout = () => {
    const product = basket.map((el) => el._id);
    getStripeSession(product);
  };
  const total =
    basket.length &&
    Math.round(
      basket.reduce((a, b) => {
        const price = a.price * a.quantity + b.price * b.quantity;
        return { price, quantity: 1 };
      }).price * 100
    );
  return (
    <div
      id="cart-popup"
      className="cart"
      style={display ? { opacity: 1, visibility: "visible" } : null}
    >
      <div className="cart__container">
        <div className="cart__close" onClick={() => setDisplay(false)}></div>
        <div className="cart__header">Cart</div>
        <div className="cart__sub">{basket.length} items</div>
        <div className="cart__big-con-1">
          <div>Item</div>
          <div></div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Sub Total</div>
        </div>
        <div className="cart__scroll">
          {basket.map((cur, i) => (
            <div className="cart__big-con" key={i}>
              <div className="cart__small-con">
                <div className="cart__box cart__box-1">
                  <img src={`/img/${cur.image}`} alt="" className="cart__img" />
                </div>
                <div className="cart__box cart__box-2">{cur.name}</div>
                <div className="cart__box cart__box-3">
                  <input
                    type="number"
                    step={1}
                    min={1}
                    className="cart__quantity"
                    value={cur.quantity}
                    onChange={(e) => handleQuantityChange(e, i)}
                  />
                </div>
                <div className="cart__box cart__box-4">£{cur.price}</div>
                <div className="cart__box cart__box-5">
                  £{cur.price * cur.quantity}
                </div>
              </div>
              <div className="cart__remove-btn-box">
                <div
                  className="cart__remove-icon"
                  onClick={() => handleDelete(i)}
                ></div>
                <div
                  className="cart__remove-text"
                  onClick={() => handleDelete(i)}
                >
                  REMOVE
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart__bottom">
          {/* <StripeCheckout
            stripeKey="pk_test_51I0nVGEt1pRV29Pwy5IDpy61hUdmCbJOIlB73kRMMVqytTy53lzgYyrMvyFWfTHcPJ9wHlTQfbCiUq1XgyCAye2Q00wiacxdIe"
            token={(token, address) => {
              console.log({ token, address });
            }}
            billingAddress
            shippingAddress
            amount={total}
            name="product"
            currency="GBP"
          > */}
          <button className="proceed-btn" onClick={stripeCheckout}>
            <div className="proceed-btn-txt" href="checkout-page.html">
              PROCEED TO CHECKOUT
            </div>
          </button>
          {/* </StripeCheckout> */}
          <div className="cart__total-con">
            <div className="cart__total-text">Total:</div>
            <div className="cart__total-price">£{total / 100}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
