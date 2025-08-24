// src/components/private-router/PrivateRouter.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const { user, hydrated } = useSelector((state) => state.user);

  // Wait for the auth state to be loaded before deciding
  if (!hydrated) {
    return null; // or a tiny spinner/placeholder
  }

  return user?._id ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
