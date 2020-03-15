import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: TheComponent, loggedIn, roleAllowed, ...rest }) => {
    console.log('loggedIn => ', (roleAllowed && loggedIn))
  return (
    <Route
      {...rest}
      render={props => {
        return roleAllowed && loggedIn ? (
          <TheComponent {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};
