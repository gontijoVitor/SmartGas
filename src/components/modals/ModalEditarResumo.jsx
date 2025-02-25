// src/components/modals/ModalEditarResumo.jsx
// Componente modal para editar um resumo de consumo existente

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function ModalEditarResumo({ resumo, onClose, onSave, onDelete }) {
    // Formata a data para o formato de entrada do input
    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    // Estado inicial do resumo a ser editado
    const [resumoData, setResumoData] = useState({
        resumo_dia: formatDateForInput(resumo.resumo_dia),
        resumo_resultado: resumo.resumo_resultado
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
        setResumoData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Envia os dados do formulário para atualizar o resumo
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/resumos/${resumo.resumo_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(resumoData)
            });

            if (response.ok) {
                setMessage({ text: 'Resumo atualizado com sucesso!', isSuccess: true });
                onSave(resumoData);
                setTimeout(onClose, 1500);
            } else {
                const errorData = await response.json();
                setMessage({ text: errorData.error || 'Erro ao atualizar resumo', isSuccess: false });
            }
        } catch (error) {
            setMessage({ text: 'Erro ao atualizar resumo', isSuccess: false });
        }
    };

    // Exclui o resumo
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/resumos/${resumo.resumo_id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                setMessage({ text: 'Resumo excluído com sucesso!', isSuccess: true });
                setTimeout(() => {
                    onDelete(resumo.resumo_id);
                    onClose();
                }, 2000);
            } else {
                const errorData = await response.json();
                setMessage({ text: errorData.error || 'Erro ao excluir resumo', isSuccess: false });
            }
        } catch (error) {
            setMessage({ text: 'Erro ao excluir resumo', isSuccess: false });
        }
    };
    
    return (
        <>
            <div className="modal-backdrop fade show" onClick={handleBackdropClick}></div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
                <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0 m-2">
                            <h4 className="modal-title"><b>Editar Resumo</b></h4>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body px-5">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="resumo_dia" className="form-label">Data</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="resumo_dia"
                                        name="resumo_dia"
                                        value={resumoData.resumo_dia}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
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
                                    />
                                </div>
                                {message.text && (
                                    <p className="text-center mt-3" style={{ color: message.isSuccess ? '#04b336' : 'red' }}>
                                        {message.text}
                                    </p>
                                )}
                                <div className="modal-footer border-top-0 mx-auto pb-4">
                                    <FontAwesomeIcon 
                                        icon={faTrashCan}
                                        className="fa-lg p-1" 
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
    );
}

export default ModalEditarResumo;