import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ role, element }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.token) {
    return <Navigate to="/sign-in" />;
  }

  if (auth.role !== role) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;