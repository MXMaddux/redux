import React from "react";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }) => {
  // Get token from the store
  const { userInfo } = useSelector((state) => state?.users?.userAuth);
  if (!userInfo) {
    window.location.href = "/login";
    return null;
  }
  return <div>{children}</div>;
};

export default AuthRoute;
