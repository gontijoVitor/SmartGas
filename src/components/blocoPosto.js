import React, { useState, useRef } from 'react';
import '../assets/imports';

// Função de clique no bloco (Responsável por adicionar o valor do bloco no campo da calculadora)
function BlocoPosto({ onGasPriceClick }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const valorCombustivelRef = useRef(null);

    const handleOpenEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);

    const handlePostoClick = () => {
        if (valorCombustivelRef.current) {
            const gasPriceValue = valorCombustivelRef.current.innerText.replace(',', '.'); // Converte "5,96" para "5.96"
            onGasPriceClick(gasPriceValue); // Passa o valor para a calculadora
        }
    };

    return (
        <>
            <div className='mx-auto p-2 rounded row border align-items-center my-2' onClick={handlePostoClick}>
                <i className="fa-solid fa-gas-pump fa-xl col-auto"/>
                <div className='col'>
                    <h5>Posto Shell</h5>
                    <div className='row'>
                        <p className='mb-1 col-1'>R$</p>
                        <p className='mb-1 col-1' id='valorCombustivel' ref={valorCombustivelRef}>5,96</p>
                    </div>
                </div>
                <i className="fa-solid fa-pen-to-square fa-lg col-auto p-1" onClick={handleOpenEditModal} style={{ cursor: 'pointer' }} />
            </div>

            {/* Modal para editar posto */}
            {showEditModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header border-bottom-0 m-2">
                                    <h4 className="modal-title"><b>Editar Posto</b></h4>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseEditModal}></button>
                                </div>
                                <div className="modal-body px-5">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="postoName" className="form-label">Nome do Posto</label>
                                            <input type="text" className="form-control" id="postoName" defaultValue="Posto Shell" />
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <div className="col-3">
                                                <label htmlFor="gasPrice" className="form-label">Valor Gasolina</label>
                                                <input type="text" className="form-control" id="gasPrice" defaultValue="5.96" />
                                            </div>
                                            <div className="col-3">
                                                <label htmlFor="ethanolPrice" className="form-label">Valor Etanol</label>
                                                <input type="text" className="form-control" id="ethanolPrice" defaultValue="4.59" />
                                            </div>
                                            <div className="col-3">
                                                <label htmlFor="dieselPrice" className="form-label">Valor Diesel</label>
                                                <input type="text" className="form-control" id="dieselPrice" defaultValue="6.29" />
                                            </div>
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

export default BlocoPosto;
