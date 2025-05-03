import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import './ListaVeiculos.css';

function ListaVeiculos() {
  const { token } = useContext(AuthContext);
  const [veiculos, setVeiculos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarVeiculos() {
      const response = await api.get('/veiculos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVeiculos(response.data);
    }
    carregarVeiculos();
  }, [token]);

  return (
    <div className="lista-veiculos-container">
      <h2>Meus Veículos</h2>
      <div className="lista-veiculos">
        {veiculos.map(v => (
          <div className="veiculo-card" key={v.id}>
            <h3>{v.marca} {v.modelo}</h3>
            <p><strong>Placa:</strong> {v.placa}</p>
            <p><strong>Km Atual:</strong> {v.km_atual} km</p>
            <button onClick={() => navigate(`/revisoes/${v.id}`)}>
              Ver Revisões
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaVeiculos;
