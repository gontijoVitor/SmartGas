// src/components/modals/ModalAdicionarVeiculo.jsx
// Componente modal para adicionar um novo veículo
import React, { useState, useEffect } from 'react';

const ModalAdicionarVeiculo = ({ onClose, onAddVehicle }) => {
    const [vehicleData, setVehicleData] = useState({
        veiculo_marca: '',
        veiculo_modelo: '',
        veiculo_ano: '',
        veiculo_consumo_urbano: '',
        veiculo_consumo_rodoviario: '',
        veiculo_icone: 1
    });
    const [message, setMessage] = useState({ text: '', isSuccess: false });

    // ✅ Fecha o modal ao apertar "Esc"
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        // Remove o listener ao desmontar o modal
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    // Fecha o modal ao clicar no backdrop
    const handleBackdropClick = (e) => {
        if (e.target.className.includes('modal')) {
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/veichles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehicleData),
                credentials: 'include'
            });
            const data = await response.json();
            
            if (response.ok) {
                setMessage({ text: 'Veículo criado com sucesso!', isSuccess: true });
                const newVehicle = {
                    veiculo_id: data.insertId,
                    ...vehicleData
                };
                onAddVehicle(newVehicle);
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setMessage({ text: data.error || 'Erro ao criar veículo', isSuccess: false });
            }
        } catch (error) {
            setMessage({ text: 'Erro ao criar veículo', isSuccess: false });
        }
    };

    return (
        <>
            <div className="modal-backdrop fade show" onClick={handleBackdropClick}></div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
                <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0 m-2">
                            <h4 className="modal-title"><b>Cadastrar Novo Veículo</b></h4>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body px-5">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="vehicleIcon" className="form-label">Ícone do Veículo</label>
                                    <select className="form-select" id="vehicleIcon" name="veiculo_icone" value={vehicleData.veiculo_icone} onChange={handleChange} required autoComplete="off">
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
                                    <label htmlFor="veiculo_marca" className="form-label">Marca do Veículo</label>
                                    <input type="text" className="form-control" id="veiculo_marca" name="veiculo_marca" value={vehicleData.veiculo_marca} onChange={handleChange} required autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="veiculo_modelo" className="form-label">Modelo do Veículo</label>
                                    <input type="text" className="form-control" id="veiculo_modelo" name="veiculo_modelo" value={vehicleData.veiculo_modelo} onChange={handleChange} required autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="veiculo_ano" className="form-label">Ano do Veículo</label>
                                    <input type="number" className="form-control" id="veiculo_ano" name="veiculo_ano" value={vehicleData.veiculo_ano} onChange={handleChange} required autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="veiculo_consumo_urbano" className="form-label">Consumo Urbano (KM/L)</label>
                                    <input type="number" step="0.1" className="form-control" id="veiculo_consumo_urbano" name="veiculo_consumo_urbano" value={vehicleData.veiculo_consumo_urbano} onChange={handleChange} required autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="veiculo_consumo_rodoviario" className="form-label">Consumo Rodoviário (KM/L)</label>
                                    <input type="number" step="0.1" className="form-control" id="veiculo_consumo_rodoviario" name="veiculo_consumo_rodoviario" value={vehicleData.veiculo_consumo_rodoviario} onChange={handleChange} required autoComplete="off" />
                                </div>
                                {message.text && (
                                    <p className="text-center mt-3" style={{ color: message.isSuccess ? '#04b336' : 'red' }}>
                                        {message.text}
                                    </p>
                                )}
                                <div className="modal-footer border-top-0 pb-4">
                                    <button type="submit" className="confirma mx-auto">
                                        Realizar Cadastro
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalAdicionarVeiculo;
