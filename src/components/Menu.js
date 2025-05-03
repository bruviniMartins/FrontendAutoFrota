import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Menu.css';

function Menu() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="menu">
      <div className="menu-logo">
        <Link to="/">AutoFrota</Link>
      </div>
      <div className="menu-links">
        <Link to="/">Início</Link>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/veiculos">Veículos</Link>
            <Link to="/contato">Serviços</Link>
            <Link to="/cadastro-veiculo">Novo Veículo</Link>
            <button onClick={logout} className="btn-logout">Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/register">Cadastrar</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Menu;
