import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Bem-vindo à AutoFrota</h1>
      <p>Gerencie sua frota de forma inteligente e segura.</p>
      
      <div className="dashboard-actions">
        <Link to="/veiculos" className="dashboard-card">
          🚗 Meus Veículos
        </Link>
        <Link to="/cadastro-veiculo" className="dashboard-card">
          ➕ Novo Veículo
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
