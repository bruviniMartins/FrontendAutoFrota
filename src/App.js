import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CadastroVeiculo from './components/CadastroVeiculo';
import ListaVeiculos from './components/ListaVeiculos';
import ListaRevisoes from './components/ListaRevisoes';
import Contato from './components/Contato'; // <<< Importante
import Menu from './components/Menu';
import { AuthContext } from './context/AuthContext';

function App() {
  const { token } = useContext(AuthContext);

  function RotaPrivada({ children }) {
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  }

  return (
    <Router>
      <div>
        <Menu /> {/* Menu aparece em todas as telas */}
        <Routes>
          {/* Landing Page aberta */}
          <Route path="/" element={<LandingPage />} />

          {/* Página pública de Contato/Serviços */}
          <Route path="/contato" element={<Contato />} />

          {/* Login e Cadastro */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard - protegido */}
          <Route path="/dashboard" element={
            <RotaPrivada>
              <Dashboard />
            </RotaPrivada>
          } />

          {/* Área de gestão de veículos - protegido */}
          <Route path="/veiculos" element={
            <RotaPrivada>
              <ListaVeiculos />
            </RotaPrivada>
          } />
          <Route path="/cadastro-veiculo" element={
            <RotaPrivada>
              <CadastroVeiculo />
            </RotaPrivada>
          } />
          <Route path="/revisoes/:veiculoId" element={
            <RotaPrivada>
              <ListaRevisoes />
            </RotaPrivada>
          } />

          {/* Redirecionamento padrão */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
