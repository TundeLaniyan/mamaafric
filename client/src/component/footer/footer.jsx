import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <div>
      <div className="mail-list">
        <div className="mail-list__container">
          <p className="mail-list__header">JOIN OUR MAILING LIST</p>
          <p className="mail-list__para">
            Promotions, News products and sales directly yo your inbox
          </p>
          <input
            className="mail-list__input"
            type="email address"
            placeholder="Email"
          />
          <button className="mail-list__btn">
            <a className="mail-list__btn-text" href="">
              Subscribe
            </a>
          </button>
        </div>
      </div>

      <footer className="footer">
        <div className="footer__container">
          <img className="footer__logo" src="../img/logo2.png" alt="" />

          <div className="footer__box">
            <div className="footer__title">MamaAfric</div>
            <p className="footer__para">
              We provide you with the best feel of African items, products and
              food stuffs.
            </p>
          </div>

          <div className="footer__box">
            <div className="footer__title">Menu</div>
            <ul className="footer__list">
              <li className="footer__text">Shop</li>
              <li className="footer__text">About</li>
              <li className="footer__text">Contact</li>
            </ul>
          </div>

          <div className="footer__box">
            <div className="footer__title">Help</div>
            <ul className="footer__list">
              <li className="footer__text">Shipping info</li>
              <li className="footer__text">Terms & Conditions</li>
              <li className="footer__text">Privacy Policy</li>
              <li className="footer__text">FAQs</li>
              <li className="footer__text">Contact</li>
            </ul>
          </div>

          <div className="footer__box">
            <div className="footer__title">Have a Question</div>
            <ul className="footer__list">
              <li className="footer__text">578 Bearwood Parade B66 4BW</li>
              <li className="footer__text">+44 (0)772 403 6245</li>
              <li className="footer__text">Info@mamaafric.co.uk</li>
            </ul>
          </div>
        </div>
        <div className="footer__left-box">
          <div className="footer__social">
            <div className="footer__social__icon footer__social__icon-1"></div>
            <div className="footer__social__icon footer__social__icon-2"></div>
            <div className="footer__social__icon footer__social__icon-3"></div>
            <div className="footer__social__icon footer__social__icon-4"></div>
          </div>

          <div className="payment-method"></div>
        </div>
      </footer>

      <footer className="footer__small">
        Copyright © MamaAfric. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Footer;
