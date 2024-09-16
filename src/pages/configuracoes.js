import Conf_usuario from "../components/config_usuario";
import Conf_uni_med from "../components/config_unidades_medida";
import Conf_conversores from "../components/config_conversores";
import Sidebar from "../components/sidebar_config";

function Configuracoes() {
  const pTop = {
    paddingTop: '100px',
  };
    return (
      <div className="d-flex align-items-center" style={pTop}>
        <Sidebar/>
        <Conf_usuario/>
      </div>
    );
  }
  
export default Configuracoes;