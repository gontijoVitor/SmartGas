// src/components/modals/ModalAdicionarRota.jsx
// Componente modal para adicionar uma nova rota de viagem

import React, { useState, useEffect } from 'react';

const ModalAdicionarRota = ({ onClose, onAddRoute }) => {
    const [routeData, setRouteData] = useState({
        pointA: '',
        pointB: '',
        distance: ''
    });
    const [message, setMessage] = useState({ text: '', isSuccess: false });

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

    // Atualiza o estado ao alterar os campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRouteData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Envia os dados do formulário para criar uma nova rota
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/rotas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(routeData),
                credentials: 'include'
            });
            const data = await response.json();
            
            if (response.ok) {
                setMessage({ text: 'Rota criada com sucesso!', isSuccess: true });
                // Cria objeto completo da rota para atualizar o estado
                const newRoute = {
                    rota_id: data.rota_id,
                    rota_ponto_a: routeData.pointA,
                    rota_ponto_b: routeData.pointB,
                    rota_distancia: routeData.distance
                };
                onAddRoute(newRoute);
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setMessage({ text: data.error || 'Erro ao criar rota', isSuccess: false });
            }
        } catch (error) {
            setMessage({ text: 'Erro ao criar rota', isSuccess: false });
        }
    };

    return (
        <>
            <div className="modal-backdrop fade show" onClick={handleBackdropClick}></div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
                <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0 m-2">
                            <h4 className="modal-title"><b>Adicionar Rota</b></h4>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body px-5">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="pointA" className="form-label">Ponto A</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="pointA" 
                                        name="pointA" 
                                        value={routeData.pointA} 
                                        onChange={handleChange} 
                                        required 
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pointB" className="form-label">Ponto B</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="pointB" 
                                        name="pointB" 
                                        value={routeData.pointB} 
                                        onChange={handleChange} 
                                        required 
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="distance" className="form-label">Distância</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="distance" 
                                        name="distance" 
                                        value={routeData.distance} 
                                        onChange={handleChange} 
                                        required 
                                        autoComplete="off"
                                    />
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

export default ModalAdicionarRota;