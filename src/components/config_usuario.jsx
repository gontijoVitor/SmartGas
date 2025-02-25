// src/components/config_usuario.jsx
// Componente para alterar a senha do usuário

import React, { useState } from 'react';

function Conf_usuario() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    // Envia a solicitação para alterar a senha
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage('Todos os campos são obrigatórios');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('As senhas não coincidem');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/config/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                }),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Senha atualizada com sucesso!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Erro ao atualizar a senha');
        }
    };

    return (
        <div className='row'>
            <h3 className='m-2 mb-4'><b>Alterar senha</b></h3>
            <form className="col-5 py-4 mx-auto" onSubmit={handleSubmit}>
                <div className="mx-auto form-floating mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="currentPassword" 
                        placeholder="Senha atual"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <label htmlFor="currentPassword">Senha atual</label>
                </div>

                <div className="mx-auto form-floating mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="newPassword" 
                        placeholder="Nova senha"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label htmlFor="newPassword">Nova senha</label>
                </div>

                <div className="mx-auto form-floating mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="confirmNewPassword" 
                        placeholder="Confirme sua nova senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label htmlFor="confirmNewPassword">Confirme sua nova senha</label>
                </div>

                <div className="mx-auto mb-3">
                    <button className="confirma p-2 col-12" type="submit">
                        Salvar alterações
                    </button>
                </div>
                {message && <p className="text-success">{message}</p>}
            </form>
        </div>
    );
}

export default Conf_usuario;