import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    return { isAuthenticated: !!token };
  });

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;