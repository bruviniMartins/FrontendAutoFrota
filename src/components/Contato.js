import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import './Contato.css';

function Contato() {
  const { token } = useContext(AuthContext);
  const [veiculos, setVeiculos] = useState([]);
  const [kmInputs, setKmInputs] = useState({});
  const [revisoesFiltradas, setRevisoesFiltradas] = useState([]);

  useEffect(() => {
    async function carregarVeiculos() {
      const response = await api.get('/veiculos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVeiculos(response.data);
    }
    carregarVeiculos();
  }, [token]);

  const handleKmChange = (veiculoId, value) => {
    setKmInputs(prev => ({ ...prev, [veiculoId]: value }));
  };

  const buscarRevisoes = async () => {
    const km_atuais = Object.entries(kmInputs).map(([veiculo_id, km_atual]) => ({
      veiculo_id: parseInt(veiculo_id),
      km_atual: parseInt(km_atual)
    }));

    const response = await api.post('/servicos/proximas-revisoes-personalizadas', {
      km_atuais
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setRevisoesFiltradas(response.data);
  };

  return (
    <div className="contato-container">
      <h1>Serviços AutoFrota</h1>

      <h2>Informe o KM Atual de Cada Veículo</h2>
      <table>
        <thead>
          <tr>
            <th>Veículo</th>
            <th>Placa</th>
            <th>KM Atual</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map(v => (
            <tr key={v.id}>
              <td>{v.marca} {v.modelo}</td>
              <td>{v.placa}</td>
              <td>
                <input
                  type="number"
                  value={kmInputs[v.id] || ''}
                  onChange={e => handleKmChange(v.id, e.target.value)}
                  placeholder="Informe o KM atual"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={buscarRevisoes} className="btn-primary" style={{ marginTop: '20px' }}>
        Buscar Revisões Próximas
      </button>

      <h2 style={{ marginTop: '40px' }}>Revisões Próximas</h2>
      {revisoesFiltradas.length === 0 ? (
        <p>Nenhuma revisão próxima nos próximos 5000 km.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Veículo</th>
              <th>Placa</th>
              <th>KM Atual</th>
              <th>Revisão</th>
              <th>KM Alvo</th>
              <th>Restam</th>
            </tr>
          </thead>
          <tbody>
            {revisoesFiltradas.map((r, i) => (
              <tr key={i}>
                <td>{r.marca} {r.modelo}</td>
                <td>{r.placa}</td>
                <td>{r.km_atual} km</td>
                <td>{r.tipo}</td>
                <td>{r.km_revisao} km</td>
                <td>{r.km_revisao - r.km_atual} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Contato;
