// src/hooks/useAuth.js
// Hook personalizado para verificar se o usuário está autenticado

import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/check-login', {
          method: 'GET',
          credentials: 'include', // Permitir cookies
        });
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error('Erro ao verificar login:', error);
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  return isLoggedIn;
};

export default useAuth;