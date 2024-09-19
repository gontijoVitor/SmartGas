import React, { useState, useRef } from 'react';
import '../assets/imports';

// Função de clique no bloco (Responsável por adicionar o valor do bloco no campo da calculadora)
function BlocoRota({ onRouteClick }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const valorDistanciaRef = useRef(null);

    const handleOpenEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);

    const handleRouteClick = () => {
        if (valorDistanciaRef.current) {
            const distanceValue = valorDistanciaRef.current.innerText.replace(',', '.'); // Converte "7" se necessário
            onRouteClick(distanceValue); // Passa o valor para a função de callback
        }
    };

    return (
        <>
            <div className='mx-auto p-2 rounded row border align-items-center my-2' onClick={handleRouteClick}>
                <i className="fa-solid fa-map-location-dot fa-xl col-auto"/>
                <div className='col'>
                    <h5>Casa - Trabalho</h5>
                    <div className='row'>
                        <p className='mb-1 col-1' id='valorDistancia' ref={valorDistanciaRef}>8</p>
                        <p className='mb-1 col-1'>KM</p>
                    </div>
                </div>
                <i className="fa-solid fa-pen-to-square fa-lg col-auto p-1" onClick={handleOpenEditModal} style={{ cursor: 'pointer' }} />
            </div>

            {/* Modal para editar Rota */}
            {showEditModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header border-bottom-0 m-2">
                                    <h4 className="modal-title"><b>Editar Rota</b></h4>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseEditModal}></button>
                                </div>
                                <div className="modal-body px-5">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="pointa" className="form-label">Ponto A</label>
                                            <input type="text" className="form-control" id="pointa" defaultValue="Rota 1" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="pointb" className="form-label">Ponto B</label>
                                            <input type="text" className="form-control" id="pointb" defaultValue="Rota 1" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="routeDistance" className="form-label">Distância</label>
                                            <input type="number" className="form-control" id="routeDistance" defaultValue="7" />
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

export default BlocoRota;
