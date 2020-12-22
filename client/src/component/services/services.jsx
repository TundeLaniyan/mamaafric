import React from "react";
import "./services.scss";

function Services() {
  return (
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
  );
}

export default Services;
