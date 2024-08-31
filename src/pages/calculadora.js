import React, { useState } from 'react';
import '../assets/imports.js';
import BlocoVeiculo from '../components/blocoVeiculo.js';
import BlocoPosto from '../components/blocoPosto.js';
import BlocoRota from '../components/blocoRota.js';

function Calculadora() {
    const [gasPrice, setGasPrice] = useState('');
    const [consumption, setConsumption] = useState('');
    const [distance, setDistance] = useState('');
    const [totalCost, setTotalCost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddPostoModal, setShowAddPostoModal] = useState(false);
    const [showAddRotaModal, setShowAddRotaModal] = useState(false); // New state for "Adicionar nova rota" modal

    const handleCalculate = (e) => {
        e.preventDefault();
        if (gasPrice && consumption && distance) {
            const cost = (distance / consumption) * gasPrice;
            setTotalCost(cost.toFixed(2)); // Round to 2 decimal places
            setShowModal(true); // Show the modal with the result
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleOpenAddPostoModal = () => setShowAddPostoModal(true);
    const handleCloseAddPostoModal = () => setShowAddPostoModal(false);
    const handleOpenAddRotaModal = () => setShowAddRotaModal(true); // Function to open "Adicionar nova rota" modal
    const handleCloseAddRotaModal = () => setShowAddRotaModal(false); // Function to close "Adicionar nova rota" modal

    return (
        <>
            <div className="row px-4 pb-4">
                {/* Calculadora */}
                <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-xl-3 col-lg-5 col-md-5 col-sm-10 col-xs-11 p-4'>
                    <form className="col" onSubmit={handleCalculate}>
                        <div className="mx-auto form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                id="floatingGasPrice"
                                placeholder="Valor da gasolina"
                                step="0.01"
                                value={gasPrice}
                                onChange={(e) => setGasPrice(e.target.value)}
                                required
                            />
                            <label htmlFor="floatingGasPrice">Valor da gasolina</label>
                        </div>
                        <div className="mx-auto form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                id="floatingConsumption"
                                placeholder="Consumo"
                                step="0.01"
                                value={consumption}
                                onChange={(e) => setConsumption(e.target.value)}
                                required
                            />
                            <label htmlFor="floatingConsumption">Consumo (KM/L)</label>
                        </div>
                        <div className="mx-auto form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                id="floatingDistance"
                                placeholder="Distância"
                                step="0.01"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                required
                            />
                            <label htmlFor="floatingDistance">Distância (KM)</label>
                        </div>
                        <div className="mx-auto mb-3">
                            <button className="rounded border-0 bg-danger text-white p-2 col-12" type="submit">
                                Realizar cálculo
                            </button>
                        </div>
                    </form>
                </div>

                {/* Veiculos */}
                <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-xl-3 col-lg-5 col-md-5 col-sm-10 col-xs-11 p-4'>
                    <BlocoVeiculo/>
                    <div className='mx-auto p-2 rounded row border'>
                        <i className="fa-solid fa-plus fa-2xl col-4 mx-auto d-flex align-items-center justify-content-center"/>
                        <div className='py-2 col-8 d-flex align-items-center'>
                            <h5 className='text-center m-0'>Adicionar novo veiculo</h5>
                        </div>
                    </div>
                </div>

                {/* Postos */}
                <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-xl-2 col-lg-5 col-md-5 col-sm-10 col-xs-11 p-4'>
                    <BlocoPosto/>
                    <BlocoPosto/>
                    <div
                        className='mx-auto p-2 rounded row border'
                        onClick={handleOpenAddPostoModal} // Opens the "Adicionar novo posto" modal
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="fa-solid fa-plus fa-2xl col-4 mx-auto d-flex align-items-center justify-content-center"/>
                        <div className='py-2 col-8 d-flex align-items-center'>
                            <h5 className='text-center m-0'>Adicionar novo posto</h5>
                        </div>
                    </div>
                </div>

                {/* Rotas */}
                <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-xl-2 col-lg-5 col-md-5 col-sm-10 col-xs-11 p-4'>
                    <BlocoRota/>
                    <BlocoRota/>
                    <div
                        className='mx-auto p-2 rounded row border'
                        onClick={handleOpenAddRotaModal} // Add this line to trigger the modal
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="fa-solid fa-plus fa-2xl col-4 mx-auto d-flex align-items-center justify-content-center"/>
                        <div className='py-2 col-8 d-flex align-items-center'>
                            <h5 className='text-center m-0'>Adicionar nova rota</h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Custo Total da Viagem */}
            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Custo Total da Viagem</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p className="fs-4">R$ {totalCost}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                        Fechar
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={handleCloseModal}>
                                        Salvar no BD
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Modal for Adicionar Novo Posto */}
            {showAddPostoModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Adicionar Novo Posto</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAddPostoModal}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="postoName" className="form-label">Nome do Posto</label>
                                            <input type="text" className="form-control" id="postoName" placeholder="Digite o nome do posto" />
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <div className="col-3">
                                                <label htmlFor="postoLocation" className="form-label">Valor gasolina</label>
                                                <input type="text" className="form-control" id="postoLocation" placeholder="Gasolina" />
                                            </div>
                                            <div className="col-3">
                                                <label htmlFor="postoLocation" className="form-label">Valor etanol</label>
                                                <input type="text" className="form-control" id="postoLocation" placeholder="Etanol" />
                                            </div>
                                            <div className="col-3">
                                                <label htmlFor="postoLocation" className="form-label">Valor diesel</label>
                                                <input type="text" className="form-control" id="postoLocation" placeholder="Diesel" />
                                            </div>
                                        </div>
                                        {/* Add more form fields as needed */}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger">
                                        Cadastrar Posto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Modal for Adicionar Nova Rota */}
            {showAddRotaModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Adicionar Nova Rota</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAddRotaModal}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="rotaName" className="form-label">Nome do ponto A</label>
                                            <input type="text" className="form-control" id="rotaName" placeholder="e.g. Casa" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="rotaName" className="form-label">Nome do ponto B</label>
                                            <input type="text" className="form-control" id="rotaName" placeholder="e.g. Trabalho" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="rotaDistance" className="form-label">Distância</label>
                                            <input type="number" className="form-control" id="rotaDistance" placeholder="Digite a distância da rota (KM)" />
                                        </div>
                                        {/* Add more form fields as needed */}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger">
                                        Cadastrar Rota
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

export default Calculadora;
