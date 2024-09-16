import React, { useState } from 'react';
import '../assets/imports.js';
import BlocoVeiculo from '../components/blocoVeiculo.js';
import BlocoPosto from '../components/blocoPosto.js';
import BlocoRota from '../components/blocoRota.js';
import '../assets/styles/styles.css';

function Calculadora() {
    const py = {
        paddingTop: '100px',
        paddingBottom: '25px',
    };

    const [gasPrice, setGasPrice] = useState('');
    const [consumption, setConsumption] = useState('');
    const [distance, setDistance] = useState('');
    const [idaVolta, setIdaVolta] = useState(false); // State to track ida e volta checkbox
    const [totalCost, setTotalCost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddPostoModal, setShowAddPostoModal] = useState(false);
    const [showAddRotaModal, setShowAddRotaModal] = useState(false);
    const [showAddVeiculoModal, setShowAddVeiculoModal] = useState(false); // New state for "Adicionar novo veículo" modal

    const handleCalculate = (e) => {
        e.preventDefault();
        if (gasPrice && consumption && distance) {
            // Multiply distance by 2 if idaVolta is true
            const effectiveDistance = idaVolta ? distance * 2 : distance;
            const cost = (effectiveDistance / consumption) * gasPrice;
            setTotalCost(cost.toFixed(2));
            setShowModal(true);
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleOpenAddPostoModal = () => setShowAddPostoModal(true);
    const handleCloseAddPostoModal = () => setShowAddPostoModal(false);
    const handleOpenAddRotaModal = () => setShowAddRotaModal(true);
    const handleCloseAddRotaModal = () => setShowAddRotaModal(false);
    const handleOpenAddVeiculoModal = () => setShowAddVeiculoModal(true);
    const handleCloseAddVeiculoModal = () => setShowAddVeiculoModal(false);

    // Funções click
    const handleVehicleClick = (consumptionValue) => {
        setConsumption(consumptionValue); // Define o valor de consumo ao clicar no BlocoVeiculo
    };

    const handleGasPriceClick = (gasPriceValue) => {
        setGasPrice(gasPriceValue); // Atualiza o valor da gasolina
    };

    const handleRouteClick = (distanceValue) => {
        setDistance(distanceValue); // Atualiza a distância
    };

    return (
        <>
            <div className="row col-12 mx-auto px-4 pb-4" style={py}>
                {/* Calculadora */}
                <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-xl-3 col-lg-5 col-md-5 col-sm-10 col-xs-11 p-4'>
                    <form className="col" onSubmit={handleCalculate}>
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
                            <input type="checkbox" id="idaVolta" className="idaVolta" value={idaVolta} onChange={() => setIdaVolta(!idaVolta)}/>
                            <label for="idaVolta" className='px-2'>Calcular ida e volta</label>
                        </div>
                        <div className="mx-auto mb-3">
                            <button className="confirma w-100" type="submit">
                                Realizar cálculo
                            </button>
                        </div>
                    </form>
                </div>

                {/* Veiculos */}
                <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-xl-3 col-lg-5 col-md-5 col-sm-10 col-xs-11 p-4'>
                    <BlocoVeiculo onVehicleClick={handleVehicleClick} />
                    <div
                        className='mx-auto p-2 rounded row border'
                        onClick={handleOpenAddVeiculoModal} // Opens the "Adicionar novo veículo" modal
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="fa-solid fa-plus fa-2xl col-4 mx-auto d-flex align-items-center justify-content-center"/>
                        <div className='py-3 col-8 d-flex align-items-center'>
                            <h5 className='text-center m-0'>Adicionar novo veículo</h5>
                        </div>
                    </div>
                </div>

                {/* Postos */}
                <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-xl-2 col-lg-5 col-md-5 col-sm-10 col-xs-11 p-4'>
                    <BlocoPosto onGasPriceClick={handleGasPriceClick}/>
                    <div
                        className='mx-auto p-2 rounded row border'
                        onClick={handleOpenAddPostoModal}
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="fa-solid fa-plus fa-2xl col-4 mx-auto d-flex align-items-center justify-content-center"/>
                        <div className='py-3 col-8 d-flex align-items-center'>
                            <h5 className='text-center m-0'>Adicionar novo posto</h5>
                        </div>
                    </div>
                </div>

                {/* Rotas */}
                <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-xl-2 col-lg-5 col-md-5 col-sm-10 col-xs-11 p-4'>
                    <BlocoRota onRouteClick={handleRouteClick}/>
                    <div
                        className='mx-auto p-2 rounded row border'
                        onClick={handleOpenAddRotaModal}
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="fa-solid fa-plus fa-2xl col-4 mx-auto d-flex align-items-center justify-content-center"/>
                        <div className='py-3 col-8 d-flex align-items-center'>
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
                                <div className="modal-header border-bottom-0 m-2">
                                    <h4 className="modal-title"><b>Custo Total da Viagem</b></h4>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                                </div>
                                <div className="modal-body px-5">
                                    <p className="fs-4">R$ {totalCost}</p>
                                </div>
                                <div className="modal-footer border-top-0 mx-auto pb-4">
                                    <button type="button" className="cancela" onClick={handleCloseModal}>
                                        Fechar
                                    </button>
                                    <button type="button" className="confirma" onClick={handleCloseModal}>
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
                                <div className="modal-header border-bottom-0 m-2">
                                    <h4 className="modal-title"><b>Cadastrar Novo Posto</b></h4>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAddPostoModal}></button>
                                </div>
                                <div className="modal-body px-5">
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
                                    </form>
                                </div>
                                <div className="modal-footer border-top-0 mx-auto pb-4">
                                    <button type="button" className="confirma">
                                        Cadastrar posto
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
                                <div className="modal-header border-bottom-0 m-2">
                                    <h4 className="modal-title"><b>Adicionar Nova Rota</b></h4>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAddRotaModal}></button>
                                </div>
                                <div className="modal-body px-5">
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
                                    </form>
                                </div>
                                <div className="modal-footer border-top-0 mx-auto pb-4">
                                    <button type="button" className="confirma">
                                        Cadastrar Rota
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Modal for Adicionar Novo Veículo */}
            {showAddVeiculoModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header border-bottom-0 m-2">
                                    <h4 className="modal-title"><b>Adicionar Novo Veículo</b></h4>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAddVeiculoModal}></button>
                                </div>
                                <div className="modal-body px-5">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="vehicleImage" className="form-label">Imagem do Veículo</label>
                                            <input type="file" className="form-control" id="vehicleImage" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="vehicleBrand" className="form-label">Marca do Veículo</label>
                                            <input type="text" className="form-control" id="vehicleBrand" placeholder="Digite a marca do veículo" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="vehicleModel" className="form-label">Modelo do Veículo</label>
                                            <input type="text" className="form-control" id="vehicleModel" placeholder="Digite o modelo do veículo" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="vehicleYear" className="form-label">Ano do Veículo</label>
                                            <input type="number" className="form-control" id="vehicleYear" placeholder="Digite o ano do veículo" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="roadConsumption" className="form-label">Consumo Rodoviário</label>
                                            <input type="number" className="form-control" id="roadConsumption" placeholder="Digite o consumo rodoviário (KM/L)" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="urbanConsumption" className="form-label">Consumo Urbano</label>
                                            <input type="number" className="form-control" id="urbanConsumption" placeholder="Digite o consumo urbano (KM/L)" />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer border-top-0 mx-auto pb-4">
                                    <button type="button" className="confirma">
                                        Realizar Cadastro
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
