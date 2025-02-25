// src/components/ProtectedRoute.js
// Componente para proteger rotas que requerem autenticação

import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAuth();

  if (isLoggedIn === null) {
    return <div>Carregando...</div>; // Placeholder enquanto verifica o login
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;