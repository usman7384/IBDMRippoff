import React from 'react';
import { Route, Navigate ,Outlet} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" />;

};

export default PrivateRoute;

