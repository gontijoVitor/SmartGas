import React, { useState } from 'react';
import Conf_usuario from "../components/config_usuario";
import Conf_uni_med from "../components/config_unidades_medida";
import Conf_conversores from "../components/config_conversores";
import Sidebar from "../components/sidebar_config";

function Configuracoes() {

  const [selectedSection, setSelectedSection] = useState('usuario');

  const renderContent = () => {
    switch (selectedSection) {
      case 'usuario':
        return <Conf_usuario />;
      case 'unidade':
        return <Conf_uni_med />;
      case 'conversores':
        return <Conf_conversores />;
      default:
        return <div>Selecione uma opção</div>;
    }
  };

  const pTop = {
    paddingTop: '100px',
  };
    return (
      <div className="container" style={pTop}>
        <Sidebar onSelect={setSelectedSection} />
        <main style={{ flex: 1, padding: '20px' }}>
          {renderContent()}
        </main>
      </div>
    );
  }
  
export default Configuracoes;