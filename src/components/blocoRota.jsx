// src/components/BlocoRota.jsx
// Componente para exibir e editar informações de uma rota de viagem

import React, { useState, useEffect } from 'react';

function BlocoRota({ rota, onRouteClick, onUpdateRoute, onDeleteRoute }) {
    const [message, setMessage] = useState({ text: '', isSuccess: false });
    const [distanceUnit, setDistanceUnit] = useState('KM');
    const [showEditModal, setShowEditModal] = useState(false);
    const [routeData, setRouteData] = useState({
        pointA: rota.rota_ponto_a,
        pointB: rota.rota_ponto_b,
        distance: rota.rota_distancia
    });

    // Abre o modal de edição
    const handleOpenEditModal = (e) => {
        e.stopPropagation();  // Evita que o clique no ícone de edição dispare a função de clique na rota
        setShowEditModal(true);
    };

    // Fecha o modal de edição
    const handleCloseEditModal = () => setShowEditModal(false);

    // Atualiza o estado ao alterar os campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRouteData({ ...routeData, [name]: value });
    };

    // Fecha o modal ao clicar no backdrop
    const handleBackdropClick = (e) => {
        if (e.target.className.includes('modal')) {
            handleCloseEditModal();
        }
    };

    // Envia os dados do formulário para atualizar a rota
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/rotas/${rota.rota_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(routeData),
                credentials: 'include'
            });

            if (response.ok) {
                setMessage({ text: 'Rota atualizada com sucesso!', isSuccess: true });
                onUpdateRoute(rota.rota_id, routeData); // Atualiza o estado do componente pai
                setTimeout(() => {
                    handleCloseEditModal();
                }, 2000);
            }
        } catch (error) {
            setMessage({ text: 'Erro ao atualizar rota', isSuccess: false });
        }
    };

    // Exclui a rota
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/rotas/${rota.rota_id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                setMessage({ text: 'Rota excluída com sucesso!', isSuccess: true });
                onDeleteRoute(rota.rota_id);
                setTimeout(() => {
                    handleCloseEditModal();
                }, 2000);
            }
        } catch (error) {
            setMessage({ text: 'Erro ao excluir rota', isSuccess: false });
        }
    };

    // Busca a unidade de distância configurada pelo usuário
    useEffect(() => {
        const fetchDistanceUnit = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/config/unidades', {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setDistanceUnit(data.distancia);
                }
            } catch (error) {
                console.error('Erro ao carregar unidade de distância:', error);
            }
        };
        fetchDistanceUnit();
    }, []);

    // Lida com o clique na rota
    const handleRouteClick = () => {
        onRouteClick(routeData.distance);
    };

    return (
        <>
            <div 
                className='mx-auto p-2 rounded row border align-items-center my-2' 
                onClick={handleRouteClick}
                style={{ cursor: "pointer" }} 
            >
                <i className="fa-solid fa-route fa-xl col-auto"/>
                <div className='col d-flex flex-column align-items-center'>
                    <h5>{rota.rota_ponto_a} - {rota.rota_ponto_b}</h5>
                    <div className='row justify-content-center' >
                        <p className='mb-1 p-0 col-auto'>{rota.rota_distancia}</p>
                        <p className='mb-1 px-1 col-auto'>{distanceUnit}</p>
                    </div>
                </div>
                <i 
                    className="fa-solid fa-pen-to-square fa-lg col-auto p-1" 
                    onClick={handleOpenEditModal} 
                    style={{ cursor: 'pointer' }}
                />
            </div>

            {/* Modal para editar a rota */}
            {showEditModal && (
                <>
                    <div className="modal-backdrop fade show" onClick={handleBackdropClick}></div>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
                        <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
                            <div className="modal-content">
                                <div className="modal-header border-bottom-0 m-2">
                                    <h4 className="modal-title"><b>Editar Rota</b></h4>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseEditModal}></button>
                                </div>
                                <div className="modal-body px-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="pointA" className="form-label">Ponto A</label>
                                            <input type="text" className="form-control" id="pointA" name="pointA" value={routeData.pointA} onChange={handleChange} autoComplete="off" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="pointB" className="form-label">Ponto B</label>
                                            <input type="text" className="form-control" id="pointB" name="pointB" value={routeData.pointB} onChange={handleChange} autoComplete="off" required />
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
                                                autoComplete="off"
                                                required 
                                            />
                                        </div>
                                        {message.text && (
                                            <p className="text-center mt-3" style={{ color: message.isSuccess ? '#04b336' : 'red' }}>
                                                {message.text}
                                            </p>
                                        )}
                                        <div className="modal-footer border-top-0 mx-auto pb-4">
                                            <i 
                                                className="fa-solid fa-trash-can fa-lg p-1" 
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

export default BlocoRota;