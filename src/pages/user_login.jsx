// src/pages/user_login.jsx
// Componente para exibir a página de login de usuário

import React, { useState } from 'react';
import Logo from '../assets/img/common/logonobg.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState(''); // Estado para armazenar o email do usuário
    const [senha, setSenha] = useState(''); // Estado para armazenar a senha do usuário
    const [error, setError] = useState(''); // Estado para armazenar mensagens de erro
    const [loading, setLoading] = useState(false); // Estado para controlar o estado de carregamento
    const [message, setMessage] = useState({ text: '', type: '' }); // Estado para armazenar mensagens de sucesso ou erro
    const navigate = useNavigate(); // Hook para navegação

    // Função para lidar com o login do usuário
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:5000/api/users/login',
                { usuario_user: email, senha },
                { withCredentials: true }
            );

            if (response.status === 200) {
                setMessage({ text: 'Login realizado com sucesso!', type: 'success' });
                // Dispatch login event for Topbar update
                window.dispatchEvent(new Event('loginStateChanged'));
                setTimeout(() => {
                    navigate('/');
                });
            }
        } catch (err) {
            setMessage({ 
                text: err.response?.data?.message || 'Erro ao realizar login', 
                type: 'error' 
            });
        } finally {
            setLoading(false);
        }
    };

    const vrStyle = { height: "200px" }; // Estilo para a altura do separador vertical
    const pTop = { paddingTop: '100px' }; // Estilo para adicionar padding no topo

    return (
        <div style={pTop}>
            <div className="mx-auto shadow-lg bg-body rounded row mt-4 col-12 col-lg-5 col-md-10 col-sm-10 col-xs-12 p-4">
                <div className="d-flex col mx-auto" style={vrStyle}>
                    <img src={Logo} alt="Imagem indisponível :(" className="mx-auto d-block h-75 my-auto" />
                </div>
                <div className="d-md-flex d-none col-1" style={vrStyle}>
                    <div className="vr mx-auto" />
                </div>

                <form className="col" onSubmit={handleLogin}>
                    {error && <p className="text-danger text-center">{error}</p>}

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>E-mail</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <label>Senha</label>
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-danger col-12" type="submit" disabled={loading}>
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                        <Link to="/cadastro"><p className="text-center p-3">Não possui conta?</p></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;