// src/pages/configuracoes.jsx
// Componente principal para exibir as configurações do usuário e unidades de medida

import React, { useState } from 'react';
import Conf_usuario from "../components/config_usuario";
import Conf_uni_med from "../components/config_unidades_medida";
import '../assets/styles/home.css'; // Importando o arquivo CSS

function Configuracoes() {
  const [selectedSection, setSelectedSection] = useState('usuario');

  // Renderiza o conteúdo com base na seção selecionada
  const renderContent = () => {
    switch (selectedSection) {
      case 'usuario':
        return <Conf_usuario />;
      case 'unidade':
        return <Conf_uni_med />;
      default:
        return <div>Selecione uma opção</div>;
    }
  };

  const py = {
    paddingTop: '100px',
    paddingBottom: '25px',
  };

  return (
    <div className="container" style={py}>
      <div className="row px-4 pb-4">
        <div className="mx-auto shadow-lg bg-body rounded p-4 mt-4 col-xl-9 col-lg-9 col-md-8 col-sm-10 col-xs-11">
          <div className="mb-3">
            <label htmlFor="configDropdown" className="form-label">Selecione uma configuração:</label>
            <select 
              id="configDropdown" 
              className="form-select" 
              value={selectedSection} 
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="usuario">Usuário</option>
              <option value="unidade">Unidades de medida</option>
            </select>
          </div>
        </div>
        <div className="mx-auto shadow-lg bg-body rounded p-4 mt-4 col-xl-9 col-lg-9 col-md-8 col-sm-10 col-xs-11">
            {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Configuracoes;