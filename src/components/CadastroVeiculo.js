import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import './CadastroVeiculo.css';

function CadastroVeiculo() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
    km_atual: '',
    email_contato: '',
    terreno: '',
    categoria: 'Carro',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Converter km_atual para número ANTES de enviar
      const dataEnviar = {
        ...formData,
        km_atual: Number(formData.km_atual),
      };

      await api.post('/veiculos', dataEnviar, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Veículo cadastrado com sucesso!');
      navigate('/veiculos');
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar veículo');
    }
  }

  return (
    <div className="cadastro-veiculo-container">
      <h2>Cadastrar Novo Veículo</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <input type="text" name="placa" placeholder="Placa" value={formData.placa} onChange={handleChange} required />
        <input type="text" name="marca" placeholder="Marca" value={formData.marca} onChange={handleChange} required />
        <input type="text" name="modelo" placeholder="Modelo" value={formData.modelo} onChange={handleChange} required />
        <input type="number" name="ano" placeholder="Ano" value={formData.ano} onChange={handleChange} required />
        <input type="number" name="km_atual" placeholder="Km Atual" value={formData.km_atual} onChange={handleChange} required />
        <input type="email" name="email_contato" placeholder="Email de Contato" value={formData.email_contato} onChange={handleChange} required />

        <select name="terreno" value={formData.terreno} onChange={handleChange} required>
          <option value="">Selecione o tipo de terreno</option>
          <option value="bom">Bom – Utilizado apenas em cidades (asfalto)</option>
          <option value="normal">Normal – Utilizado em rodovias comuns</option>
          <option value="ruim">Ruim – Utilizado em estradas de terra</option>
        </select>
        
        <select name="categoria" value={formData.categoria} onChange={handleChange}>
          <option value="Carro">Carro</option>
          <option value="Ônibus">Ônibus</option>
          <option value="Caminhão">Caminhão</option>
          <option value="Veículo Estadual">Veículo Estadual</option>
          <option value="Motocicleta">Motocicleta</option>
        </select>

        <button type="submit" className="botao-cadastrar">Cadastrar Veículo</button>
      </form>
    </div>
  );
}

export default CadastroVeiculo;
