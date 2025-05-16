import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import './ListaRevisoes.css';

function ListaRevisoes() {
  const { token } = useContext(AuthContext);
  const { veiculoId } = useParams();
  const [revisoes, setRevisoes] = useState([]);
  const [editarId, setEditarId] = useState(null);
  const [formData, setFormData] = useState({
    data_realizada: '',
    km_realizado: '',
    tipo_realizado: '',
  });

  useEffect(() => {
    async function carregar() {
      try {
        const response = await api.get(`/revisoes/veiculo/${veiculoId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRevisoes(response.data);
      } catch (err) {
        console.error(err);
        alert('Erro ao carregar revisões.');
      }
    }
    carregar();
  }, [token, veiculoId]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSalvar(id) {
    try {
      // Envia as informações de conclusão da revisão
      await api.put(`/revisoes/${id}/realizar`, {
        ...formData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Revisão marcada como realizada!');
      setEditarId(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar revisão.');
    }
  }

  return (
    <div className="lista-revisoes-container">
      <h2>Revisões Pendentes</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo de Revisão</th>
            <th>Km Alvo</th>
            <th>Data Prevista</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {revisoes.map(r => (
            <React.Fragment key={r.id}>
              <tr>
                <td>{r.tipo}</td>
                <td>{r.km_revisao ? `${r.km_revisao} km` : '-'}</td>
                <td>{r.data_revisao_prevista ? new Date(r.data_revisao_prevista).toLocaleDateString() : '-'}</td>
                <td>{r.status}</td>
                <td>
                  {r.status === 'pendente' && (
                    <button onClick={() => setEditarId(r.id)} className="botao-realizar">
                      Realizar
                    </button>
                  )}
                </td>
              </tr>

              {editarId === r.id && (
                <tr className="linha-formulario">
  <td colSpan="5">
    <div className="formulario-inline">
      <input
        type="date"
        name="data_realizada"
        value={formData.data_realizada}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="km_realizado"
        placeholder="KM realizado"
        min="0"
        max="1000000"
        value={formData.km_realizado}
        onChange={handleInputChange}
      />
      <select
        name="tipo_realizado"
        value={formData.tipo_realizado}
        onChange={handleInputChange}
      >
        <option value="">Tipo de Revisão</option>
        <option value="Troca de óleo do motor">Troca de óleo do motor</option>
        <option value="Troca de filtro de ar">Troca de filtro de ar</option>
        <option value="Troca de filtro de combustível">Troca de filtro de combustível</option>
        <option value="Troca de correia dentada">Troca de correia dentada</option>
        <option value="Troca de velas de ignição">Troca de velas de ignição</option>
        <option value="Alinhamento de direção">Alinhamento de direção</option>
        <option value="Balanceamento de rodas">Balanceamento de rodas</option>
        <option value="Troca de pneus">Troca de pneus</option>
        <option value="Troca de pastilhas de freio">Troca de pastilhas de freio</option>
        <option value="Troca de fluido de freio">Troca de fluido de freio</option>
      </select>
      <select
        name="qualidade"
        value={formData.qualidade || ''}
        onChange={handleInputChange}
      >
        <option value="">Qualidade dos produtos usados</option>
        <option value="alta">Qualidade Alto nível</option>
        <option value="media">Qualidade Intermediário</option>
        <option value="baixa">Qualidade Custo-benefício</option>
      </select>
      <button onClick={() => handleSalvar(r.id)} className="botao-salvar">Salvar</button>
    </div>
    <small style={{ fontSize: '13px', color: '#ccc', display: 'block', marginTop: '10px' }}>
      💡 Se a revisão foi feita com produtos de <strong>alto nível</strong>, o intervalo será estendido.<br />
      Se foi com produtos <strong>mais simples</strong>, a próxima revisão será antecipada.
    </small>
  </td>
</tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaRevisoes;
