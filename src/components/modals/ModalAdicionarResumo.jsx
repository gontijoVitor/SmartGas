// src/components/modals/ModalAdicionarResumo.jsx
// Componente modal para adicionar um novo resumo de consumo

import React, { useState } from 'react';

const ModalAdicionarResumo = ({ onClose, onAddResumo }) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const [resumoData, setResumoData] = useState({
        resumo_dia: currentDate,
        resumo_resultado: ''
    });
    const [message, setMessage] = useState({ text: '', isSuccess: false });

    // Fecha o modal ao clicar no backdrop
    const handleBackdropClick = (e) => {
        if (e.target.className.includes('modal')) {
            onClose();
        }
    };

    // Atualiza o estado ao alterar os campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setResumoData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Envia os dados do formulário para criar um novo resumo
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/resumos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resumoData),
                credentials: 'include'
            });
            const data = await response.json();
            
            if (response.ok) {
                setMessage({ text: 'Resumo criado com sucesso!', isSuccess: true });
                onAddResumo(data); // Atualiza o estado do componente pai
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setMessage({ text: data.error || 'Erro ao criar resumo', isSuccess: false });
            }
        } catch (error) {
            setMessage({ text: 'Erro ao criar resumo', isSuccess: false });
        }
    };

    return (
        <>
            <div className="modal-backdrop fade show" onClick={handleBackdropClick}></div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
                <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0 m-2">
                            <h4 className="modal-title"><b>Adicionar Novo Resumo</b></h4>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body px-5">
                            <form onSubmit={handleSubmit} className="row">
                                <div className="mb-3 col-6">
                                    <label htmlFor="resumo_dia" className="form-label">Data do Resumo</label>
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        id="resumo_dia" 
                                        name="resumo_dia" 
                                        value={resumoData.resumo_dia} 
                                        onChange={handleChange} 
                                        required 
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="resumo_resultado" className="form-label">Valor Total</label>
                                    <input 
                                        type="number" 
                                        step="0.01" 
                                        className="form-control" 
                                        id="resumo_resultado" 
                                        name="resumo_resultado" 
                                        value={resumoData.resumo_resultado} 
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

export default ModalAdicionarResumo;