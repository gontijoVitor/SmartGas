// src/pages/resumo.jsx
// Componente principal para exibir o resumo de consumo

import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import BlocoPosto from '../components/blocoPosto.jsx';
import BlocoVeiculo from '../components/blocoVeiculo.jsx';
import ModalAdicionarResumo from '../components/modals/ModalAdicionarResumo.jsx';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getElementAtEvent } from 'react-chartjs-2';
import ModalEditarResumo from '../components/modals/ModalEditarResumo.jsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Resumo() {
    const pTop = {
        paddingTop: '100px',
    };

    const [postos, setPostos] = useState([]);
    const [veiculos, setVeiculos] = useState([]);
    const [selectedFuelType, setSelectedFuelType] = useState('gasolina');
    const [selectedConsumptionType, setSelectedConsumptionType] = useState('urbano');
    const [resumoData, setResumoData] = useState([]);
    const [showAddResumoModal, setShowAddResumoModal] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('30');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedResumo, setSelectedResumo] = useState(null);
    const chartRef = useRef();

    // Adiciona um handler de clique no gráfico
    const handleChartClick = (event) => {
        const element = getElementAtEvent(chartRef.current, event);
        if (element.length > 0) {
            const dataIndex = element[0].index;
            const clickedResumo = resumoData[dataIndex];
            setSelectedResumo(clickedResumo);
            setShowEditModal(true);
        }
    };

    // Adiciona um novo resumo
    const handleAddResumo = (newResumo) => {
        setResumoData(prev => [...prev, newResumo]);
        fetchResumoData();
    };

    // Salva as edições de um resumo
    const handleEditSave = (updatedResumo) => {
        setResumoData(prev => 
            prev.map(item => 
                item.resumo_id === selectedResumo.resumo_id ? updatedResumo : item
            )
        );
        fetchResumoData();
    };

    // Deleta um resumo
    const handleDelete = (resumoId) => {
        setResumoData(prev => prev.filter(item => item.resumo_id !== resumoId));
        fetchResumoData();
    };

    // Busca os dados de resumo do backend
    const fetchResumoData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/resumos?days=${selectedPeriod}`, {
                credentials: 'include',
            });
            const data = await response.json();
            setResumoData(data);
        } catch (error) {
            console.error('Erro ao carregar dados de resumo:', error);
        }
    };
    
    useEffect(() => {
        fetchResumoData();
    }, [selectedPeriod]);
    
    const handlePeriodChange = (e) => {
        setSelectedPeriod(e.target.value);
    };

    // Busca os postos do backend
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

    // Busca os veículos do backend
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

    const handleFuelTypeChange = (e) => {
        setSelectedFuelType(e.target.value);
    };

    const handleConsumptionTypeChange = (e) => {
        setSelectedConsumptionType(e.target.value);
    };

    const getSortedPostos = () => {
        return postos
            .filter(posto => posto[`posto_valor_${selectedFuelType}`] !== null)
            .sort((a, b) => a[`posto_valor_${selectedFuelType}`] - b[`posto_valor_${selectedFuelType}`])
            .slice(0, 3);
    };

    const getSortedVeiculos = () => {
        const consumptionField = selectedConsumptionType === 'urbano' ? 'veiculo_consumo_urbano' : 'veiculo_consumo_rodoviario';
        return veiculos
            .filter(veiculo => veiculo[consumptionField] !== null)
            .sort((a, b) => b[consumptionField] - a[consumptionField])
            .slice(0, 3);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const lineChartData = {
        labels: resumoData.map(item => formatDate(item.resumo_dia)),
        datasets: [
            {
                label: 'Valor Total (R$)',
                data: resumoData.map(item => item.resumo_resultado),
                borderColor: '#D10000',
                backgroundColor: 'rgba(209, 0, 0, 0.2)',
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: 12,
                titleColor: '#fff',
                bodyColor: '#fff',
                displayColors: false,
                callbacks: {
                    label: (context) => `R$ ${context.parsed.y.toFixed(2)}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `R$ ${value}`
                }
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div className="row col-10 mx-auto mt-4 row" style={pTop}>
            <div className='shadow-lg bg-body rounded row mb-4 col-12 col-md-5 p-4'>
                <h5 className=''>Gráfico</h5>
                <select 
                    className="form-select mb-3"
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                >
                    <option value="30">30 dias</option>
                    <option value="90">90 dias</option>
                    <option value="180">180 dias</option>
                    <option value="365">1 ano</option>
                </select>
                <div className='mx-auto p-2 rounded row border' style={{ height: '400px' }}>
                    <Line
                        ref={chartRef}
                        onClick={handleChartClick}
                        data={lineChartData} 
                        options={chartOptions}
                    />
                </div>
                <div 
                    className='mx-auto p-2 mt-4 rounded row border'
                    onClick={() => setShowAddResumoModal(true)}
                    style={{ cursor: 'pointer' }}
                >
                    <i className="fa-solid fa-plus fa-2xl col-4 mx-auto d-flex align-items-center justify-content-center" />
                    <div className='py-3 col-8 d-flex align-items-center'>
                        <h5 className='text-center m-0'>Adicionar resumo personalizado</h5>
                    </div>
                </div>
            </div>
            <div className="ms-auto col-md-3 px-0">
                <div className='shadow-lg bg-body rounded mb-4 p-4'>
                    <h5 className=''>Ranking posto</h5>
                    <select className="form-select mb-3" value={selectedFuelType} onChange={handleFuelTypeChange}>
                        <option value="gasolina">Gasolina</option>
                        <option value="etanol">Etanol</option>
                        <option value="diesel">Diesel</option>
                    </select>
                    <div className='mx-auto p-2 rounded row border'>
                        {getSortedPostos().map(posto => (
                            <BlocoPosto key={posto.posto_id} posto={posto} hideEditIcon={true} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="ms-auto col-md-3 px-0">
                <div className='shadow-lg bg-body rounded mb-4 p-4'>
                    <h5 className=''>Ranking veículo</h5>
                    <select className="form-select mb-3" value={selectedConsumptionType} onChange={handleConsumptionTypeChange}>
                        <option value="urbano">Consumo Urbano</option>
                        <option value="rodoviario">Consumo Rodoviário</option>
                    </select>
                    <div className='mx-auto p-2 rounded row border'>
                        {getSortedVeiculos().map(veiculo => (
                            <BlocoVeiculo key={veiculo.veiculo_id} veiculo={veiculo} hideEditIcon={true} />
                        ))}
                    </div>
                </div>
            </div>
            {showEditModal && selectedResumo && (
                <ModalEditarResumo
                    resumo={selectedResumo}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleEditSave}
                    onDelete={handleDelete}
                />
            )}
            {showAddResumoModal && (
                <ModalAdicionarResumo
                    onClose={() => setShowAddResumoModal(false)}
                    onAddResumo={handleAddResumo}
                />
            )}
        </div>
    );
}

export default Resumo;