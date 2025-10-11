// src/components/modals/ModalAdicionarPosto.jsx
// Componente modal para adicionar um novo posto de combustível

import React, { useState, useEffect } from 'react';

const ModalAdicionarPosto = ({ onClose, onAddPosto }) => {
    const [postoData, setPostoData] = useState({
        name: '',
        priceGasolina: '',
        priceEtanol: '',
        priceDiesel: ''
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

    // Atualiza o estado ao alterar os campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostoData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Envia os dados do formulário para criar um novo posto
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/postos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postoData),
                credentials: 'include'
            });
            const data = await response.json();
            
            if (response.ok) {
                setMessage({ text: 'Posto criado com sucesso!', isSuccess: true });
                // Cria objeto completo do posto para atualizar o estado
                const newPosto = {
                    posto_id: data.posto_id,
                    posto_nome: postoData.name,
                    posto_valor_gasolina: postoData.priceGasolina,
                    posto_valor_etanol: postoData.priceEtanol,
                    posto_valor_diesel: postoData.priceDiesel
                };
                onAddPosto(newPosto);
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setMessage({ text: data.error || 'Erro ao criar posto', isSuccess: false });
            }
        } catch (error) {
            setMessage({ text: 'Erro ao criar posto', isSuccess: false });
        }
    };

    return (
        <>
            <div className="modal-backdrop fade show" onClick={handleBackdropClick}></div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
                <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0 m-2">
                            <h4 className="modal-title"><b>Cadastrar Novo Posto</b></h4>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body px-5">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="postoName" className="form-label">Nome do Posto</label>
                                    <input type="text" className="form-control" id="postoName" name="name" value={postoData.name} autoComplete="off" onChange={handleChange} required />
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className="col-3">
                                        <label htmlFor="priceGasolina" className="form-label">Gasolina</label>
                                        <input type="number" className="form-control" id="priceGasolina" name="priceGasolina" value={postoData.priceGasolina} autoComplete="off" onChange={handleChange} />
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="priceEtanol" className="form-label">Etanol</label>
                                        <input type="number" className="form-control" id="priceEtanol" name="priceEtanol" value={postoData.priceEtanol} autoComplete="off" onChange={handleChange} />
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="priceDiesel" className="form-label">Diesel</label>
                                        <input type="number" className="form-control" id="priceDiesel" name="priceDiesel" value={postoData.priceDiesel} autoComplete="off" onChange={handleChange} />
                                    </div>
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

export default ModalAdicionarPosto;