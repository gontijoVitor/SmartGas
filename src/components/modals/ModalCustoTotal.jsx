// src/components/modals/ModalCustoTotal.jsx
// Componente modal para exibir e salvar o custo total de uma viagem

import React, { useState, useEffect } from 'react';

const ModalCustoTotal = ({ totalCost, onClose, userId }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Define a data atual quando o componente é montado
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setCurrentDate(formattedDate);
    }, []);

    // Fecha o modal ao clicar no backdrop
    const handleBackdropClick = (e) => {
        if (e.target.className.includes('modal')) {
            onClose();
        }
    };

    // Atualiza a data selecionada
    const handleDateChange = (e) => {
        setCurrentDate(e.target.value);
    };

    // Salva o resumo de custo total
    const handleSave = async () => {
        const resumoData = {
            resumo_dia: currentDate,
            resumo_resultado: totalCost
        };

        try {
            const response = await fetch('http://localhost:5000/api/resumos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resumoData),
                credentials: 'include'
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    onClose(); // Fecha o modal após salvar com sucesso
                }, 1000); // Espera 1 segundo antes de fechar
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Erro ao salvar o resumo.');
            }
        } catch (error) {
            setError('Erro ao conectar ao servidor.');
        }
    };

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

    return (
        <>
            <div className="modal-backdrop fade show" onClick={handleBackdropClick}></div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
                <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0 m-2">
                            <h4 className="modal-title"><b>Resultado</b></h4>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body px-5 pb-2">
                            <p className="fs-4">O custo total da viagem será: <br/><b>R$ {totalCost}</b></p>
                            <div className='row d-flex justify-content-center position-relative'>
                                <div className='col-6 px-0'>
                                    <input 
                                        type='date' 
                                        className='form-control col-6' 
                                        value={currentDate} 
                                        onChange={handleDateChange} 
                                    />
                                </div>
                                <div className='col-2 my-auto position-relative px-0'>
                                    <i
                                        className="fa-solid fa-circle-info fa-xl"
                                        style={{ cursor: "pointer" }}
                                        onMouseEnter={() => setShowTooltip(true)}
                                        onMouseLeave={() => setShowTooltip(false)}
                                    ></i>
                                    {showTooltip && (
                                        <div
                                            className="tooltip-container"
                                            style={{
                                                position: "absolute",
                                                top: "100%",
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                background: "#333",
                                                color: "#fff",
                                                padding: "8px 12px",
                                                borderRadius: "4px",
                                                fontSize: "12px",
                                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                                                whiteSpace: "nowrap",
                                                zIndex: 1000,
                                                marginTop: "8px",
                                            }}
                                        >
                                            Escolha a data que você deseja registrar esse resumo
                                        </div>
                                    )}
                                </div>
                            </div>
                            {error && <p className="text-danger mt-2">{error}</p>}
                            {success && <p className="text-success mt-2">Resumo salvo com sucesso!</p>}
                        </div>
                        <div className="modal-footer border-top-0 mx-auto">
                            <button type="button" className="confirma" onClick={handleSave}>
                                Salvar
                            </button>
                        </div>
                        <div className="text-center pb-2">
                            <p className='px-5'><b>Recomendamos salvar apenas o valor da ida para manter um padrão</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalCustoTotal;