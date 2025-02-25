// src/pages/calculadora.jsx
// Componente principal para calcular o custo total de uma viagem com base em veículos, postos e rotas

import React, { useState, useEffect } from 'react';
import BlocoVeiculo from '../components/blocoVeiculo.jsx';
import BlocoPosto from '../components/blocoPosto.jsx';
import BlocoRota from '../components/blocoRota.jsx';
import ModalCustoTotal from '../components/modals/ModalCustoTotal';
import ModalAdicionarPosto from '../components/modals/ModalAdicionarPosto';
import ModalAdicionarRota from '../components/modals/ModalAdicionarRota';
import ModalAdicionarVeiculo from '../components/modals/ModalAdicionarVeiculo';
import '../assets/styles/styles.css';

function Calculadora() {
    const py = {
        paddingTop: '100px',
        paddingBottom: '25px',
    };

    const [gasPrice, setGasPrice] = useState('');
    const [consumption, setConsumption] = useState('');
    const [distance, setDistance] = useState('');
    const [idaVolta, setIdaVolta] = useState(false);
    const [totalCost, setTotalCost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddPostoModal, setShowAddPostoModal] = useState(false);
    const [showAddRotaModal, setShowAddRotaModal] = useState(false);
    const [showAddVeiculoModal, setShowAddVeiculoModal] = useState(false);
    const [rotas, setRotas] = useState([]); // Estado para armazenar as rotas carregadas do backend
    const [postos, setPostos] = useState([]); // Estado para armazenar os postos carregados do backend
    const [veiculos, setVeiculos] = useState([]); // Estado para armazenar os veículos carregados do backend

    // Carrega as rotas do backend ao montar o componente
    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/rotas', {
                    credentials: 'include',
                });
                const data = await response.json();
                setRotas(data);
            } catch (error) {
                console.error('Erro ao carregar rotas:', error);
            }
        };
        fetchRoutes();
    }, []);

    // Carrega os postos do backend ao montar o componente
    useEffect(() => {
        const fetchPostos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/postos', {
                    credentials: 'include',
                });
                const data = await response.json();
                setPostos(data);
            } catch (error) {
                console.error('Erro ao carregar postos:', error);
            }
        };
        fetchPostos();
    }, []);

    // Carrega os veículos do backend ao montar o componente
    useEffect(() => {
        const fetchVeiculos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/veichles', {
                    credentials: 'include',
                });
                const data = await response.json();
                setVeiculos(data);
            } catch (error) {
                console.error('Erro ao carregar veículos:', error);
            }
        };
        fetchVeiculos();
    }, []);

    // Calcula o custo total da viagem
    const handleCalculate = (e) => {
        e.preventDefault();
        if (gasPrice && consumption && distance) {
            const effectiveDistance = idaVolta ? distance * 2 : distance;
            const cost = (effectiveDistance / consumption) * gasPrice;
            setTotalCost(cost.toFixed(2));
            setShowModal(true);
        }
    };

    // Atualiza o valor de consumo ao clicar no BlocoVeiculo
    const handleVehicleClick = (consumptionValue) => {
        setConsumption(consumptionValue);
    };

    // Atualiza o valor do preço do combustível ao clicar no BlocoPosto
    const handleGasPriceClick = (gasPriceValue) => {
        setGasPrice(gasPriceValue);
    };

    // Atualiza a distância ao clicar na rota
    const handleRouteClick = (routeDistance) => {
        setDistance(routeDistance);
    };

    // Fecha o modal de custo total
    const handleCloseModal = () => setShowModal(false);

    // Abre o modal para adicionar um novo posto
    const handleOpenAddPostoModal = () => setShowAddPostoModal(true);

    // Fecha o modal para adicionar um novo posto
    const handleCloseAddPostoModal = () => setShowAddPostoModal(false);

    // Abre o modal para adicionar uma nova rota
    const handleOpenAddRotaModal = () => setShowAddRotaModal(true);

    // Fecha o modal para adicionar uma nova rota
    const handleCloseAddRotaModal = () => setShowAddRotaModal(false);

    // Abre o modal para adicionar um novo veículo
    const handleOpenAddVeiculoModal = () => setShowAddVeiculoModal(true);

    // Fecha o modal para adicionar um novo veículo
    const handleCloseAddVeiculoModal = () => setShowAddVeiculoModal(false);

    // Adiciona um novo veículo ao estado
    const handleAddVehicle = (newVehicle) => {
        setVeiculos(prev => [...prev, newVehicle]);
    };

    // Adiciona uma nova rota ao estado
    const handleAddRoute = (newRoute) => {
        setRotas([...rotas, newRoute]);
    };

    // Adiciona um novo posto ao estado
    const handleAddPosto = (newPosto) => {
        setPostos([...postos, newPosto]);
    };

    // Atualiza uma rota existente no estado
    const handleUpdateRoute = (routeId, updatedData) => {
        setRotas(prevRotas => 
            prevRotas.map(rota => 
                rota.rota_id === routeId 
                    ? { 
                        ...rota, 
                        rota_ponto_a: updatedData.pointA,
                        rota_ponto_b: updatedData.pointB,
                        rota_distancia: updatedData.distance
                    } 
                    : rota
            )
        );
    };

    // Atualiza um posto existente no estado
    const handleUpdatePosto = (updatedPosto) => {
        setPostos(prev => prev.map(posto => 
            posto.posto_id === updatedPosto.posto_id ? updatedPosto : posto
        ));
    };

    // Atualiza um veículo existente no estado
    const handleUpdateVeiculo = (updatedVeiculo) => {
        setVeiculos(prev => prev.map(veiculo => 
            veiculo.veiculo_id === updatedVeiculo.veiculo_id ? updatedVeiculo : veiculo
        ));
    };

    // Remove uma rota do estado
    const handleDeleteRoute = (routeId) => {
        setRotas(rotas.filter(route => route.rota_id !== routeId));
    };

    // Remove um posto do estado
    const handleDeletePosto = (postoId) => {
        setPostos(prev => prev.filter(posto => posto.posto_id !== postoId));
    };

    // Remove um veículo do estado
    const handleDeleteVeiculo = (veiculoId) => {
        setVeiculos(prev => prev.filter(veiculo => veiculo.veiculo_id !== veiculoId));
    };
    
    return (
        <>
            <div className="row col-12 mx-auto px-4 pb-4" style={py}>
                {/* Veiculos */}
                <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-xl-3 col-lg-5 col-md-5 col-sm-10 col-xs-11 p-4'>
                    {veiculos.map((veiculo) => (
                        <BlocoVeiculo key={veiculo.veiculo_id} veiculo={veiculo} onVehicleClick={handleVehicleClick} onDeleteVeiculo={handleDeleteVeiculo} onUpdateVeiculo={handleUpdateVeiculo} />
                    ))}
                    <div
                        className='mx-auto p-2 rounded row border'
                        onClick={handleOpenAddVeiculoModal}
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="fa-solid fa-plus fa-2xl col-4 mx-auto d-flex align-items-center justify-content-center" />
                        <div className='py-3 col-8 d-flex align-items-center'>
                            <h5 className='text-center m-0'>Adicionar novo veículo</h5>
                        </div>
                    </div>
                </div>

                {/* Postos */}
                <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-xl-3 col-lg-5 col-md-5 col-sm-10 col-xs-11 p-4'>
                    {postos.map((posto) => (
                        <BlocoPosto key={posto.posto_id} posto={posto} onGasPriceClick={handleGasPriceClick} onDeletePosto={handleDeletePosto} onUpdatePosto={handleUpdatePosto} />
                    ))}
                    <div
                        className='mx-auto p-2 rounded row border'
                        onClick={handleOpenAddPostoModal}
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="fa-solid fa-plus fa-2xl col-4 mx-auto d-flex align-items-center justify-content-center" />
                        <div className='py-3 col-8 d-flex align-items-center'>
                            <h5 className='text-center m-0'>Adicionar novo posto</h5>
                        </div>
                    </div>
                </div>

                {/* Rotas */}
                <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-xl-3 col-lg-5 col-md-5 col-sm-10 col-xs-11 p-4'>
                    {rotas.map((rota) => (
                        <BlocoRota key={rota.rota_id} rota={rota} onRouteClick={handleRouteClick} onUpdateRoute={handleUpdateRoute} onDeleteRoute={handleDeleteRoute} />
                    ))}
                    <div
                        className='mx-auto p-2 rounded row border'
                        onClick={handleOpenAddRotaModal}
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="fa-solid fa-plus fa-2xl col-4 mx-auto d-flex align-items-center justify-content-center" />
                        <div className='py-3 col-8 d-flex align-items-center'>
                            <h5 className='text-center m-0'>Adicionar nova rota</h5>
                        </div>
                    </div>
                </div>
                {/* Calculadora */}
                <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-xl-2 col-lg-5 col-md-5 col-sm-10 col-xs-11 p-4'>
                    <form className="col my-auto" onSubmit={handleCalculate}>
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
                            <label htmlFor="floatingConsumption">Consumo</label>
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
                            <label htmlFor="floatingDistance">Distância</label>
                        </div>
                        <div className="mx-auto mb-3">
                            <input
                                type="checkbox"
                                id="idaVolta"
                                className="idaVolta"
                                checked={idaVolta}
                                onChange={() => setIdaVolta(!idaVolta)}
                            />
                            <label htmlFor="idaVolta" className='px-2'>Calcular ida e volta</label>
                        </div>
                        <div className="mx-auto mb-3">
                            <button className="confirma w-100" type="submit">
                                Realizar cálculo
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modals */}
            {showModal && <ModalCustoTotal totalCost={totalCost} onClose={handleCloseModal} />}
            {showAddPostoModal && <ModalAdicionarPosto onClose={handleCloseAddPostoModal} onAddPosto={handleAddPosto} />}
            {showAddRotaModal && <ModalAdicionarRota onClose={handleCloseAddRotaModal} onAddRoute={handleAddRoute} />}
            {showAddVeiculoModal && <ModalAdicionarVeiculo onClose={handleCloseAddVeiculoModal} onAddVehicle={handleAddVehicle} />}
        </>
    );
}

export default Calculadora;