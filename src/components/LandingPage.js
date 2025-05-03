import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>AutoFrota</h1>
        <p>Transformando a manutenção da sua frota com tecnologia, segurança e praticidade.</p>
        <div className="landing-buttons">
          <Link to="/login" className="btn-primary">Entrar</Link>
          <Link to="/register" className="btn-secondary">Cadastrar-se</Link>
        </div>
      </header>

      <section className="landing-section destaque">
        <h2>Por que escolher o AutoFrota?</h2>
        <p>
          Acompanhe o estado da sua frota em tempo real, receba notificações automáticas de revisões e reduza custos
          com manutenções corretivas. Tudo isso em um sistema simples, rápido e seguro.
        </p>
      </section>

      <section className="landing-section">
        <h2>Funcionalidades Principais</h2>
        <ul>
          <li>🔧 Revisões automáticas baseadas em km e tempo</li>
          <li>📅 Histórico completo de manutenções</li>
          <li>📍 Controle de vários veículos em uma só tela</li>
          <li>🔔 Alertas por e-mail sobre revisões próximas</li>
          <li>📈 Relatórios para tomada de decisão</li>
        </ul>
      </section>

      <section className="landing-section destaque2">
        <h2>Segurança em Primeiro Lugar</h2>
        <p>
          Seus dados são armazenados com criptografia e backup diário. A plataforma foi desenvolvida com as melhores práticas de segurança para garantir que sua frota esteja protegida em todos os sentidos.
        </p>
      </section>

      <section className="landing-section">
        <h2>Pronto para começar?</h2>
        <p>Cadastre-se em poucos segundos e leve a gestão da sua frota para o próximo nível.</p>
        <div className="landing-buttons extra-margin">
          <Link to="/register" className="btn-primary">Criar Conta</Link>
        </div>
      </section>

      <footer className="landing-footer">
        © {new Date().getFullYear()} AutoFrota — Inovação sobre Rodas.
      </footer>
    </div>
  );
}

export default LandingPage;
