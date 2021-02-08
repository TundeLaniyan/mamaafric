import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AdminPanel from "./component/adminPanel/adminPanel";
import Checkout from "./pages/checkout/checkout";
import Database from "./pages/database/database";
import Footer from "./component/footer/footer";
import Header from "./component/header/header";
import Home from "./pages/home/home";
import Item from "./pages/item/item";
import Login from "./pages/login/login";
import Nav from "./component/nav/nav";
import Products from "./pages/products/products";
import ProtectedRoute from "./component/protectedRoute";
import Slogan from "./component/slogan/slogan";
import { useEffect, useState } from "react";
import { checkLoggedIn } from "./services/adminService";
import AdminItem from "./pages/adminItem/adminItem";

function App() {
  const [basket, setBasket] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await checkLoggedIn();
      setIsLogin(response);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        {isLogin == 200 && <AdminPanel />}
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
            path="/admin-panel/item/:_id"
            isLogin={isLogin}
            Component={Database}
          />
          <ProtectedRoute
            path="/admin-panel/items"
            isLogin={isLogin}
            Component={AdminItem}
          />
          <Redirect to="/not-found" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
