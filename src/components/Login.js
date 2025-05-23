import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './LoginRegister.css';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultado = await login(email, senha);

    if (resultado.sucesso) {
      navigate('/dashboard');
    } else {
      alert(resultado.mensagem);
    }
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
