import React, { createContext, useState } from 'react';
import api from '../api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  async function login(email, senha) {
    const response = await api.post('/auth/login', { email, senha }); // <-- corrigido
    const tokenRecebido = response.data.token;
    setToken(tokenRecebido);
    localStorage.setItem('token', tokenRecebido);
  }

  async function register(nome, email, senha) {
    await api.post('/auth/register', { nome, email, senha }); // <-- corrigido
    alert('Cadastro realizado com sucesso!');
  }

  function logout() {
    setToken('');
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
