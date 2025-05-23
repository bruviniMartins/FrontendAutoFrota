import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';

function Register() {
  const { register } = useContext(AuthContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultado = await register(nome, email, senha);

    if (resultado.sucesso) {
      navigate('/dashboard');
    } else {
      alert(resultado.mensagem);
    }
  };

  return (
    <div className="form-container">
      <h2>Criar uma Conta na AutoFrota</h2>
      <form onSubmit={handleSubmit} className="form-box">
        <input 
          type="text" 
          placeholder="Nome" 
          value={nome} 
          onChange={e => setNome(e.target.value)} 
          required
        />
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
        <button type="submit" className="btn-primary">Cadastrar</button>
      </form>
    </div>
  );
}

export default Register;
