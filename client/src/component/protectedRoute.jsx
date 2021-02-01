import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isLogin, Component, render, path, ...rest }) => {
  console.log(isLogin);
  return (
    <>
      <Route
        path={path}
        {...rest}
        render={(props) =>
          !isLogin ? null : isLogin === "401" ? (
            <Redirect
              to={{
                pathname: "/admin-credential",
                from: rest.location.pathname,
              }}
            />
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
