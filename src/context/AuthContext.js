import React, { createContext, useState } from 'react';
import api from '../api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  async function login(email, senha) {
    try {
      const response = await api.post('/auth/login', { email, senha });
      const tokenRecebido = response.data.token;
      setToken(tokenRecebido);
      localStorage.setItem('token', tokenRecebido);
      return { sucesso: true };
    } catch (err) {
      console.error('Erro no login:', err);
      return { sucesso: false, mensagem: 'Email ou senha inválidos.' };
    }
  }

  async function register(nome, email, senha) {
    try {
      await api.post('/auth/register', { nome, email, senha });

      // login automático após cadastro
      const response = await api.post('/auth/login', { email, senha });
      const tokenRecebido = response.data.token;
      setToken(tokenRecebido);
      localStorage.setItem('token', tokenRecebido);
      return { sucesso: true };
    } catch (err) {
      console.error('Erro no cadastro:', err);
      let mensagem = 'Erro ao cadastrar.';

      if (err.response && err.response.status === 400) {
        mensagem = err.response.data.mensagem || 'Email já cadastrado.';
      }

      return { sucesso: false, mensagem };
    }
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
