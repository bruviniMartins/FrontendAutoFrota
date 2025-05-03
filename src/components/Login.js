import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- IMPORTANTE
import { AuthContext } from '../context/AuthContext';
import './LoginRegister.css';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // <-- IMPORTANTE
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, senha);
    navigate('/dashboard'); // <-- FORÇA NAVEGAÇÃO PARA DASHBOARD
  };

  return (
    <div className="form-container">
      <h2>Entrar na AutoFrota</h2>
      <form onSubmit={handleSubmit} className="form-box">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={e => setSenha(e.target.value)} 
          required
        />
        <button type="submit" className="btn-primary">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
