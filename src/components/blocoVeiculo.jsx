// src/components/BlocoVeiculo.jsx
// Componente para exibir e editar informações de um veículo

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faTruckPickup, faMotorcycle, faBicycle, faTruck, faVanShuttle, faBus, faCity, faRoad, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function BlocoVeiculo({ veiculo, onVehicleClick, onDeleteVeiculo, onUpdateVeiculo, hideEditIcon }) {
  const [message, setMessage] = useState({ text: '', isSuccess: false });
  const [consumptionUnit, setConsumptionUnit] = useState('KM/L');
  const [showEditModal, setShowEditModal] = useState(false);
  const [veiculoData, setVeiculoData] = useState({
    veiculo_marca: veiculo.veiculo_marca,
    veiculo_modelo: veiculo.veiculo_modelo,
    veiculo_ano: veiculo.veiculo_ano,
    veiculo_icone: veiculo.veiculo_icone,
    veiculo_consumo_urbano: veiculo.veiculo_consumo_urbano,
    veiculo_consumo_rodoviario: veiculo.veiculo_consumo_rodoviario
  });

  // Abre o modal de edição
  const handleOpenEditModal = () => setShowEditModal(true);

  // Fecha o modal de edição
  const handleCloseEditModal = () => setShowEditModal(false);

  // Lida com o clique no consumo do veículo
  const handleConsumptionClick = (consumptionValue) => {
    if (hideEditIcon) return; // Desativa a função de clique quando hideEditIcon é verdadeiro
    onVehicleClick(consumptionValue);
  };

  // Fecha o modal ao clicar no backdrop
  const handleBackdropClick = (e) => {
    if (e.target.className.includes('modal')) {
        handleCloseEditModal();
    }
  };

  // Envia os dados do formulário para atualizar o veículo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:5000/api/veichles/${veiculo.veiculo_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(veiculoData),
            credentials: 'include'
        });
        if (response.ok) {
            setMessage({ text: 'Veículo atualizado com sucesso!', isSuccess: true });
            onUpdateVeiculo({ ...veiculo, ...veiculoData });
            setTimeout(() => {
                handleCloseEditModal();
            }, 2000);
        }
    } catch (error) {
        setMessage({ text: 'Erro ao atualizar veículo', isSuccess: false });
    }
  };

  // Exclui o veículo
  const handleDelete = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/veichles/${veiculo.veiculo_id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (response.ok) {
            setMessage({ text: 'Veículo excluído com sucesso!', isSuccess: true });
            setTimeout(() => {
                onDeleteVeiculo(veiculo.veiculo_id);
                setShowEditModal(false);
            }, 2000);
        } else {
            const error = await response.json();
            setMessage({ text: error.message || 'Erro ao excluir veículo', isSuccess: false });
        }
    } catch (error) {
        console.error('Delete error:', error);
        setMessage({ text: 'Erro ao excluir veículo', isSuccess: false });
    }
  };

  // Atualiza o estado ao alterar os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVeiculoData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Busca a unidade de consumo configurada pelo usuário
  useEffect(() => {
    const fetchConsumptionUnit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/config/unidades', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setConsumptionUnit(data.medida_consumo);
            }
        } catch (error) {
            console.error('Erro ao carregar unidade de consumo:', error);
        }
    };
    fetchConsumptionUnit();
  }, []);

  // Renderiza o ícone do veículo com base no tipo
  const renderIcon = (icon) => {
    switch (parseInt(icon)) {
      case 1:
        return <FontAwesomeIcon icon={faCarSide} className="fa-2xl col-auto" />;
      case 2:
        return <FontAwesomeIcon icon={faTruckPickup} className="fa-2xl col-auto" />;
      case 3:
        return <FontAwesomeIcon icon={faMotorcycle} className="fa-2xl col-auto" />;
      case 4:
        return <FontAwesomeIcon icon={faBicycle} className="fa-2xl col-auto" />;
      case 5:
        return <FontAwesomeIcon icon={faTruck} className="fa-2xl col-auto" />;
      case 6:
        return <FontAwesomeIcon icon={faVanShuttle} className="fa-2xl col-auto" />;
      case 7:
        return <FontAwesomeIcon icon={faBus} className="fa-2xl col-auto" />;
      default:
        return null; // Handle default case properly
    }
  };

  return (
    <>
      <div className="mx-auto p-2 rounded border d-flex align-items-center my-2">
        {/* Ícone do veículo */}
        <div className="mx-auto">
          {renderIcon(veiculo.veiculo_icone)}
        </div>
        {/* Informações do veículo */}
        <div className="col-7">
          <h5 style={{ marginBottom: "10px" }}>
            {veiculo.veiculo_marca} {veiculo.veiculo_modelo} {veiculo.veiculo_ano}
          </h5>
          <div className="d-flex flex-column align-items-start">
            {/* Consumo urbano */}
            <div className="mx-auto">
              <div
                className="d-flex align-items-center mb-2"
                style={{ fontSize: "0.9rem", cursor: "pointer" }}
                onClick={() => handleConsumptionClick(veiculo.veiculo_consumo_urbano)}
              >
                <FontAwesomeIcon
                  icon={faCity}
                  style={{
                    fontSize: "1.2rem",
                    color: "#333",
                    marginRight: "10px",
                  }}
                />
                <span>{veiculo.veiculo_consumo_urbano} {consumptionUnit}</span>
              </div>

              {/* Consumo rodoviário */}
              <div
                className="d-flex align-items-center"
                style={{ fontSize: "0.9rem", cursor: "pointer" }}
                onClick={() => handleConsumptionClick(veiculo.veiculo_consumo_rodoviario)}
              >
                <FontAwesomeIcon
                  icon={faRoad}
                  style={{
                    fontSize: "1.2rem",
                    color: "#333",
                    marginRight: "10px",
                  }}
                />
                <span>{veiculo.veiculo_consumo_rodoviario} {consumptionUnit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ícone de edição */}
        {!hideEditIcon && (
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="fa-lg col-auto p-1"
            onClick={handleOpenEditModal}
            style={{ cursor: "pointer", marginLeft: "auto" }}
          />
        )}
      </div>

      {/* Modal para editar veículo */}
      {showEditModal && (
        <>
          <div className="modal-backdrop fade show" onClick={handleBackdropClick}></div>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
            <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header border-bottom-0 m-2">
                  <h4 className="modal-title"><b>Editar Veículo</b></h4>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseEditModal}
                  ></button>
                </div>
                <div className="modal-body px-5">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="vehicleIcon" className="form-label">
                        Ícone do Veículo
                      </label>
                      <select className="form-select" id="vehicleIcon" name="veiculo_icone" value={veiculoData.veiculo_icone} onChange={handleChange} required>
                        <option value="1">Carro</option>
                        <option value="2">Caminhonete</option>
                        <option value="3">Motocicleta</option>
                        <option value="4">Bicicleta</option>
                        <option value="5">Caminhão</option>
                        <option value="6">Van</option>
                        <option value="7">Ônibus</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="vehicleBrand" className="form-label">
                        Marca do Veículo
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="vehicleBrand"
                        name="veiculo_marca"
                        value={veiculoData.veiculo_marca}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="vehicleModel" className="form-label">
                        Modelo do Veículo
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="vehicleModel"
                        name="veiculo_modelo"
                        value={veiculoData.veiculo_modelo}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="vehicleYear" className="form-label">
                        Ano do Veículo
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="vehicleYear"
                        name="veiculo_ano"
                        value={veiculoData.veiculo_ano}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="mb-3 col">
                        <label htmlFor="urbanConsumption" className="form-label">
                          Consumo Urbano
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="urbanConsumption"
                          name="veiculo_consumo_urbano"
                          value={veiculoData.veiculo_consumo_urbano}
                          onChange={handleChange}
                          step="0.01"
                          autoComplete="off"
                          required
                        />
                      </div>
                      <div className="mb-3 col">
                        <label htmlFor="roadConsumption" className="form-label">
                          Consumo Rodoviário
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="roadConsumption"
                          name="veiculo_consumo_rodoviario"
                          value={veiculoData.veiculo_consumo_rodoviario}
                          onChange={handleChange}
                          step="0.01"
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>
                    {message.text && (
                        <p className="text-center mt-3" style={{ color: message.isSuccess ? '#04b336' : 'red' }}>
                            {message.text}
                        </p>
                    )}
                    <div className="modal-footer border-top-0 mx-auto pb-4">
                      <FontAwesomeIcon 
                        icon={faTrashCan}
                        className="fa-lg p-1" 
                        onClick={handleDelete}
                        style={{ cursor: 'pointer', marginRight: 'auto' }}
                      />
                      <button type="submit" className="confirma">
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default BlocoVeiculo;