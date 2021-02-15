import React from "react";
import StripeCheckout from "react-stripe-checkout";
import "./checkout.scss";

const Checkout = () => {
  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51I0nVGEt1pRV29Pwy5IDpy61hUdmCbJOIlB73kRMMVqytTy53lzgYyrMvyFWfTHcPJ9wHlTQfbCiUq1XgyCAye2Q00wiacxdIe"
        token={(token, address) => {}}
        billingAddress
        shippingAddress
        amount={100 * 100}
        name="product"
      />
      <div className="checkout-strip">
        <img className="checkout-icon" src="/img/checkout-30.png" alt="" />
        <h2 className="checkout-title"> Checkout</h2>
      </div>

      <div className="checkout">
        <div className="checkout__container-1">
          <div className="checkout__inner-con">
            <div className="billing__title">Billing details</div>
            <div className="billing__text">First Name</div>
            <input className="billing__input" type="text" />
            <div className="billing__text">Address</div>
            <input
              className="billing__input"
              type="text"
              placeholder="House number and street name"
            />
            <input
              className="billing__input"
              type="text"
              placeholder="Apartmaent,suite, unit, etc"
            />
            <div className="billing__text">County</div>
            <input className="billing__input" type="text" />
            <div className="billing__text">Town/City</div>
            <input className="billing__input" type="text" />
            <div className="billing__text">Postcode/Zip</div>
            <input className="billing__input" type="text" />
            <div className="billing__text">Phone</div>
            <input className="billing__input" type="text" />
            <div className="billing__text">Email Address</div>
            <input className="billing__input" type="text" />
          </div>
          <div className="checkout__inner-con">
            <div className="billing__title">Billing details</div>
            <div className="billing__text">Last Name</div>
            <input className="billing__input" type="text" />
          </div>
        </div>

        <div className="checkout__container-2">
          <div className="billing__title">Order Summury</div>
          <div className="check">
            <div className="inner-box-1">
              <div className="inner-box-1__header">Products</div>
              <div className="checkout__items"> maringa</div>
              <div className="checkout__items"> rice</div>
              <div className="checkout__items"> maringa</div>
              <div className="checkout__items"> pasta</div>
              <div className="inner-box-1__header">Sub Total</div>
              <div className="inner-box-1__total">Total</div>
            </div>
            <div className="inner-box-2">
              <div className="inner-box-1__header">Sub Total</div>
              <div className="checkout__price"> £2.99</div>
              <div className="checkout__price"> £3.99</div>
              <div className="checkout__price"> £2.99</div>
              <div className="checkout__price"> £1.99</div>
              <div className="inner-box-1__header">£11.96</div>
              <div className="inner-box-1__total-price">£11.96</div>
            </div>
          </div>
        </div>

        <div className="payment">
          <div className="payment__container">
            <div className="payment__title">Payment</div>

            <div className="payment__input-form">
              <div className="payment__section-1">
                <div className="payment__items">
                  <label for="" className="payment__label">
                    card holder
                  </label>
                  <input
                    type="text"
                    className="payment__input"
                    placeholder="coding markey"
                  />
                </div>
              </div>

              <div className="payment__section-2">
                <div className="payment__items">
                  <label for="" className="payment__label">
                    card number
                  </label>
                  <input
                    type="text"
                    className="payment__input"
                    placeholder="0000 0000 0000 0000 0000"
                  />
                </div>
              </div>

              <div className="payment__section-3">
                <div className="payment__items">
                  <label for="" className="payment__label">
                    Expire Date
                  </label>
                  <input
                    type="text"
                    className="payment__input"
                    placeholder="MM / YY"
                  />
                </div>

                <div className="payment__items">
                  <div className="payment__cvc">
                    <label for="" className="payment__label">
                      cvc code
                    </label>
                    <div className="payment__tooltip">
                      ?
                      <div className="payment__cvc-img">
                        <img src="./img/CVV.png" alt="cvv" />
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="payment__input"
                    placeholder="000"
                  />
                </div>
              </div>
            </div>
            <button className="payment__btn">PAY</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
