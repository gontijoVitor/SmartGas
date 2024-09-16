import React, { useState, useRef } from 'react';
import veiculo from '../assets/img/vehicle/Toyota-Corolla-2024.jpg';
import '../assets/imports';

function BlocoVeiculo({ onVehicleClick }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const valorConsumoRef = useRef(null);

    const imgFormat = {
        objectFit: "contain",
        width: '150px', // Adjust width as needed
        height: 'auto', // Maintain aspect ratio
    };

    const handleOpenEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);

    const handleVehicleSelect = () => {
        if (valorConsumoRef.current) {
            const consumptionValue = valorConsumoRef.current.innerText.replace(',', '.'); // Converte "8,3" para "8.3"
            onVehicleClick(consumptionValue); // Passa o valor para a função de callback
        }
    };

    return (
        <>
            <div className='mx-auto p-2 rounded border d-flex align-items-center my-2' onClick={handleVehicleSelect}>
                <img src={veiculo} style={imgFormat} alt='Imagem indisponível :(' className='col-auto'/>
                <div className='col'>
                    <h6 className='px-2'>Toyota Corolla 2024</h6>
                    <div className='row px-2'>
                        <p className='mb-1 col-1' id='valorConsumo' ref={valorConsumoRef}>8.3</p>
                        <p className='mb-1 col-7'>KM/L</p>
                    </div>
                </div>
                <i className="fa-solid fa-pen-to-square fa-lg ms-auto p-1" onClick={handleOpenEditModal} style={{ cursor: 'pointer' }}/>
            </div>

            {/* Modal for Editing Vehicle */}
            {showEditModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header border-bottom-0 m-2">
                                    <h4 className="modal-title"><b>Editar Veículo</b></h4>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseEditModal}></button>
                                </div>
                                <div className="modal-body px-5">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="vehicleImage" className="form-label">Imagem do Veículo</label>
                                            <input type="file" className="form-control" id="vehicleImage" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="vehicleBrand" className="form-label">Marca do Veículo</label>
                                            <input type="text" className="form-control" id="vehicleBrand" defaultValue="Toyota" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="vehicleModel" className="form-label">Modelo do Veículo</label>
                                            <input type="text" className="form-control" id="vehicleModel" defaultValue="Corolla 2024" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="vehicleYear" className="form-label">Ano do Veículo</label>
                                            <input type="number" className="form-control" id="vehicleYear" defaultValue="2024" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="roadConsumption" className="form-label">Consumo Rodoviário</label>
                                            <input type="number" className="form-control" id="roadConsumption" defaultValue="8.3" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="urbanConsumption" className="form-label">Consumo Urbano</label>
                                            <input type="number" className="form-control" id="urbanConsumption" defaultValue="6.5" />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer border-top-0 mx-auto pb-4">
                                    <button type="button" className="cancela" onClick={handleCloseEditModal}>
                                        Cancelar
                                    </button>
                                    <button type="button" className="confirma">
                                        Salvar
                                    </button>
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
