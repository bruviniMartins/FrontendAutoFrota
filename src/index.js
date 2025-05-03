import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext'; // <<< Importação correta do contexto de autenticação

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* <<< Envolvendo o App dentro do AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Relatório de performance (não precisa alterar nada aqui agora)
reportWebVitals();
