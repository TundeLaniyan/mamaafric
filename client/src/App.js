import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "./component/header/header";
import Slogan from "./component/slogan/slogan";
import Footer from "./component/footer/footer";
import Home from "./pages/home/home";
import Item from "./pages/item/item";
import Products from "./pages/products/products";
import Checkout from "./pages/checkout/checkout";
import Nav from "./component/nav/nav";
import { useState } from "react";
import Login from "./pages/login/login";
import ProtectedRoute from "./component/protectedRoute";
import Database from "./pages/database/database";

function App() {
  const [basket, setBasket] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="App">
      <Router>
        <Header basket={basket} setBasket={setBasket} />
        <Slogan />
        <Nav />
        <Switch>
          <Route
            path="/item/:_id"
            render={(props) => (
              <Item setBasket={setBasket} basket={basket} {...props} />
            )}
          />
          <Route
            path="/products"
            render={(props) => (
              <Products setBasket={setBasket} basket={basket} {...props} />
            )}
          />
          <Route path="/checkout" component={Checkout} />
          <Route
            exact
            path="/"
            render={() => <Home setBasket={setBasket} basket={basket} />}
          />
          <Route path="/admin-credential" component={Login} />
          <Route
            path="/not-found"
            render={() => (
              <center>
                <h1>Page not found</h1>
              </center>
            )}
          />
          <ProtectedRoute
            path="/prod"
            isLogin={isLogin}
            Component={Products}
            setBasket={setBasket}
            basket={basket}
          />
          <ProtectedRoute
            path="/add-item"
            isLogin={isLogin}
            Component={Database}
          />
          <Redirect to="/not-found" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
