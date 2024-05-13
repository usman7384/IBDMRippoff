import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Navigate to="/" replace />
  ) : (
    children
  );
};

export default PublicRoute;


