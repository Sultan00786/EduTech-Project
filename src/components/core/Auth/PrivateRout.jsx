import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRout({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (token === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default PrivateRout;
