import React from "react";
import { Route, Link } from "react-router-dom";

//need user state from Redux
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

//https://reactrouter.com/web/example/auth-workflow
const UserRoute = ({ children, ...rest }) => {
  //access user from state
  const { user } = useSelector((state) => ({ ...state }));

  //might want to show a loading message
  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoute;