import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isLogin, Component, render, path, ...rest }) => {
  return (
    <>
      <Route
        path={path}
        {...rest}
        render={(props) =>
          !isLogin ? (
            <Redirect to="/admin-credential" />
          ) : Component ? (
            <Component {...props} />
          ) : (
            render(props)
          )
        }
      />
    </>
  );
};

export default ProtectedRoute;
