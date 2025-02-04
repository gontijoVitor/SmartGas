// src/components/BlocoPosto.jsx
// Componente para exibir e editar informações de um posto de combustível

import React, { useState, useEffect } from 'react';

function BlocoPosto({ posto, onGasPriceClick, onDeletePosto, onUpdatePosto, hideEditIcon }) {
    const [message, setMessage] = useState({ text: '', isSuccess: false });
    const [currency, setCurrency] = useState('R$');
    const [showEditModal, setShowEditModal] = useState(false);
    const [postoData, setPostoData] = useState({
        posto_nome: posto.posto_nome,
        posto_valor_gasolina: posto.posto_valor_gasolina,
        posto_valor_etanol: posto.posto_valor_etanol,
        posto_valor_diesel: posto.posto_valor_diesel
    });

    // Abre o modal de edição
    const handleOpenEditModal = () => setShowEditModal(true);
    // Fecha o modal de edição
    const handleCloseEditModal = () => setShowEditModal(false);

    // Lida com o clique no preço do combustível
    const handleFuelClick = (fuelType) => {
        if (hideEditIcon) return; // Desativa a função de clique quando hideEditIcon é verdadeiro
        let fuelPriceValue;
        switch (fuelType) {
            case 'gasolina':
                fuelPriceValue = posto.posto_valor_gasolina;
                break;
            case 'etanol':
                fuelPriceValue = posto.posto_valor_etanol;
                break;
            case 'diesel':
                fuelPriceValue = posto.posto_valor_diesel;
                break;
            default:
                return;
        }
        onGasPriceClick(fuelPriceValue);
    };

    // Fecha o modal ao clicar no backdrop
    const handleBackdropClick = (e) => {
        if (e.target.className.includes('modal')) {
            handleCloseEditModal();
        }
    };

    // Envia os dados do formulário para atualizar o posto
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/postos/${posto.posto_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(postoData)
            });

            if (response.ok) {
                setMessage({ text: 'Posto atualizado com sucesso!', isSuccess: true });
                onUpdatePosto({ ...posto, ...postoData });
                setTimeout(() => {
                    handleCloseEditModal();
                }, 2000);
            }
        } catch (error) {
            setMessage({ text: 'Erro ao atualizar posto', isSuccess: false });
        }
    };

    // Exclui o posto
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/postos/${posto.posto_id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                setMessage({ text: 'Posto excluído com sucesso!', isSuccess: true });
                setTimeout(() => {
                    onDeletePosto(posto.posto_id); // Atualiza o estado do componente pai
                    handleCloseEditModal();
                }, 2000);
            }
        } catch (error) {
            setMessage({ text: 'Erro ao excluir posto', isSuccess: false });
        }
    };

    // Atualiza o estado ao alterar os campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostoData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Busca a moeda configurada pelo usuário
    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/config/unidades', {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setCurrency(data.moeda);
                }
            } catch (error) {
                console.error('Erro ao carregar moeda:', error);
            }
        };
        fetchCurrency();
    }, []);

    return (
        <>
            <div className='mx-auto p-2 rounded row border align-items-center my-2'>
                <i className="fa-solid fa-gas-pump fa-xl col-auto"/>
                <div className='col'>
                    <h5>{posto.posto_nome}</h5>
                    <div className='row justify-content-center'>
                        {posto.posto_valor_gasolina && (
                            <div 
                                className='col-3 m-1 text-center' 
                                style={{ backgroundColor: '#d85a5a', color: 'white', padding: '5px', borderRadius: '5px', fontSize: '0.9em' }}
                                onClick={() => handleFuelClick('gasolina')}
                            >
                            <p className='m-0'>{currency} {posto.posto_valor_gasolina}</p>
                            </div>
                        )}
                        {posto.posto_valor_etanol && (
                            <div 
                                className='col-3 m-1 text-center' 
                                style={{ backgroundColor: '#3fb76e', color: 'white', padding: '5px', borderRadius: '5px', fontSize: '0.9em' }}
                                onClick={() => handleFuelClick('etanol')}
                            >
                            <p className='m-0'>{currency} {posto.posto_valor_etanol}</p>
                            </div>
                        )}
                        {posto.posto_valor_diesel && (
                            <div 
                                className='col-3 m-1 text-center' 
                                style={{ backgroundColor: '#757575', color: 'white', padding: '5px', borderRadius: '5px', fontSize: '0.9em' }}
                                onClick={() => handleFuelClick('diesel')}
                            >
                            <p className='m-0'>{currency} {posto.posto_valor_diesel}</p>
                            </div>
                        )}
                    </div>
                </div>
                {!hideEditIcon && (
                    <i 
                        className="fa-solid fa-pen-to-square fa-lg col-auto p-1" 
                        onClick={handleOpenEditModal} 
                        style={{ cursor: 'pointer' }}
                    />
                )}
            </div>

            {/* Modal for Editing Posto */}
            {showEditModal && (
                <>
                    <div className="modal-backdrop fade show" onClick={handleBackdropClick}></div>
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
                        <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
                            <div className="modal-content">
                                <div className="modal-header border-bottom-0 m-2">
                                    <h4 className="modal-title"><b>Editar Posto</b></h4>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseEditModal}></button>
                                </div>
                                <div className="modal-body px-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="posto_nome" className="form-label">Nome do Posto</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="posto_nome" 
                                                name="posto_nome" 
                                                value={postoData.posto_nome} 
                                                onChange={handleChange} 
                                                autoComplete="off"
                                                required 
                                            />
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <div className="col-3">
                                                <label htmlFor="posto_valor_gasolina" className="form-label">Gasolina</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    id="posto_valor_gasolina" 
                                                    name="posto_valor_gasolina" 
                                                    value={postoData.posto_valor_gasolina} 
                                                    onChange={handleChange} 
                                                    autoComplete="off"
                                                    step="0.01"
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label htmlFor="posto_valor_etanol" className="form-label">Etanol</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    id="posto_valor_etanol" 
                                                    name="posto_valor_etanol" 
                                                    value={postoData.posto_valor_etanol} 
                                                    onChange={handleChange} 
                                                    autoComplete="off"
                                                    step="0.01"
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label htmlFor="posto_valor_diesel" className="form-label">Diesel</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    id="posto_valor_diesel" 
                                                    name="posto_valor_diesel" 
                                                    value={postoData.posto_valor_diesel} 
                                                    onChange={handleChange} 
                                                    autoComplete="off"
                                                    step="0.01"
                                                />
                                            </div>
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

export default BlocoPosto;