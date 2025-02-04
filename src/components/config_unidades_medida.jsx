// src/components/config_unidades_medida.jsx
// Componente para configurar unidades de medida (moeda, medida de consumo, distância)

import React, { useState, useEffect } from 'react';

function Conf_uni_med() {
    const [metrics, setMetrics] = useState({
        moeda: '',
        medida_consumo: '',
        distancia: ''
    });
    const [message, setMessage] = useState('');

    // Busca as configurações de unidades de medida ao montar o componente
    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/config/unidades', {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setMetrics(data);
                }
            } catch (error) {
                setMessage('Erro ao carregar configurações');
            }
        };
        fetchMetrics();
    }, []);

    // Envia as novas configurações de unidades de medida
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/config/unidades', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(metrics),
                credentials: 'include'
            });

            const data = await response.json();
            setMessage(data.message || data.error);
        } catch (error) {
            setMessage('Erro ao atualizar configurações');
        }
    };

    // Atualiza o estado ao alterar os campos do formulário
    const handleChange = (e) => {
        setMetrics({
            ...metrics,
            [e.target.id]: e.target.value
        });
    };

    return (
        <div className='row'>
            <h3 className='m-2 mb-4'><b>Unidades de medida</b></h3>
            <form className="col-5 py-4 mx-auto" onSubmit={handleSubmit}>
                <div className="mx-auto form-floating mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="moeda" 
                        placeholder="Moeda"
                        value={metrics.moeda}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                    <label htmlFor="moeda">Moeda</label>
                </div>
                <div className="mx-auto form-floating mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="medida_consumo" 
                        placeholder="Medida de consumo"
                        value={metrics.medida_consumo}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                    <label htmlFor="consumo">Medida de consumo</label>
                </div>
                <div className="mx-auto form-floating mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="distancia" 
                        placeholder="Distância"
                        value={metrics.distancia}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                    <label htmlFor="distancia">Distância</label>
                </div>
                <div className="mx-auto mb-3">
                    <button className="confirma p-2 col-12" type="submit">Salvar alterações</button>
                </div>
                {message && <p className="text-success">{message}</p>}
            </form>
        </div>
    );
}

export default Conf_uni_med;