import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../services/data.json";
import "./home.scss";

function Home({ setBasket, basket }) {
  const [randomProducts, setRandomProducts] = useState([]);

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

  useEffect(() => setRandomProducts(products), []);
  const Product = (props) => (
    <div className="products-container">
      <Link to={`/item/${props._id}`} className="hover">
        <img
          className="hover__icon"
          src="/img/icons8-heart-outline.svg"
          alt=""
        />
      </Link>
      <img className="products-image" src={`/img/${props.img}`} alt="" />
      <h5 className="products-name">{props.name}</h5>
      <h6 className="products-price">£{props.price}</h6>
      <button className="add-basket-btn" onClick={() => handleAddBasket(props)}>
        <div className="add-basket-text">ADD TO BASKET</div>
      </button>
    </div>
  );

  return (
    <div className="home">
      <div className="home-img">
        <div className="home-img__container">
          <h1 className="home-img__header">Bringing Africa to your doorstep</h1>
        </div>
      </div>
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
      <main></main>
      <div className="social">
        <div className="social__icon social__icon-1"></div>
        <div className="social__icon social__icon-2"></div>
        <div className="social__icon social__icon-3"></div>
        <div className="social__icon social__icon-4"></div>
      </div>
      <section className="latest-products">
        <div className="latest-box">
          <h2 className="latest">SHOP LATEST PRODUCTS</h2>
          <h2 className="see-all">
            <Link to="/products">see all</Link>
          </h2>
        </div>

        <div className="products-slidder" id="one">
          {randomProducts.slice(0, 5).map((cur, i) => (
            <Product key={i} {...cur} />
          ))}
        </div>
      </section>
      <section className="latest-products">
        <div className="latest-box">
          <h2 className="latest">SHOP LATEST PRODUCTS</h2>
          <h2 className="see-all">
            <Link to="/products">see all</Link>
          </h2>
        </div>
        <div className="products-slidder">
          {randomProducts.slice(5, 10).map((cur, i) => (
            <Product key={i} {...cur} />
          ))}
        </div>
      </section>
      <div className="banner-container">
        <img className="banner" src="/img/wholesale-poster.png" alt="" />
        <img className="llll" src="/img/posster-1.png" alt="" />
        <img className="llll" src="/img/posster-2.png" alt="" />
      </div>
      <section className="latest-products">
        <div className="latest-box">
          <h2 className="latest">SHOP LATEST PRODUCTS</h2>
          <h2 className="see-all">
            <Link to="/products">see all</Link>
          </h2>
        </div>

        <div className="products-slidder">
          {randomProducts.slice(10, 15).map((cur, i) => (
            <Product key={i} {...cur} />
          ))}
        </div>
      </section>
      <section className="category">
        <div className="latest-box">
          <h2 className="latest">SHOP BY CATEGORY</h2>
        </div>

        <div className="category__container">
          <div className="category__box category__box-1">
            <div className="category__text">Food</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-2">
            <div className="category__text">Cosmetic</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-3">
            <div className="category__text">Drink</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-4">
            <div className="category__text">Household</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-1">
            <div className="category__text">Food</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-2">
            <div className="category__text">Cosmetic</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-1">
            <div className="category__text">Food</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-2">
            <div className="category__text">Cosmetic</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-3">
            <div className="category__text">Drink</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-4">
            <div className="category__text">Household</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-1">
            <div className="category__text">Food</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-2">
            <div className="category__text">Cosmetic</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>
          <div className="category__box category__box-4">
            <div className="category__text">Household</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-1">
            <div className="category__text">Food</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-2">
            <div className="category__text">Cosmetic</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-1">
            <div className="category__text">Food</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-2">
            <div className="category__text">Cosmetic</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>

          <div className="category__box category__box-2">
            <div className="category__text">Cosmetic</div>
            <button className="category__btn">
              <a href="" className="category__btn-text">
                shop now
              </a>
            </button>
          </div>
        </div>
      </section>
      <div className="banner-2-container">
        <img className="banner-2" src="img/homed.png" alt="" />
      </div>
    </div>
  );
}

export default Home;
