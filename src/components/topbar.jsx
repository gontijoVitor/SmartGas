// src/components/topbar.js
// Componente para exibir a barra de navegação superior

import React, { useEffect, useState } from 'react';
import Logo from '../assets/img/common/logonobg.png';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Topbar() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        checkLogin();
        window.addEventListener('loginStateChanged', checkLogin);
        return () => window.removeEventListener('loginStateChanged', checkLogin);
    }, []);

    const checkLogin = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users/check-login', { withCredentials: true });
            setUsername(res.data.username || '');
        } catch (error) {
            setUsername('');
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true });
            setUsername('');
            window.dispatchEvent(new Event('loginStateChanged'));
            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <div className='fixed-top'>
            <nav className="navbar navbar-expand-lg bg-light text-dark px-5" style={{ borderBottom: '2px solid #D10000' }}>
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand">
                        <img src={Logo} width="75" height="75" alt="Logo" />
                    </NavLink>
                    
                    {/* Navbar Toggler Button for Mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item"><NavLink to="/" className="nav-link px-3">Home</NavLink></li>
                            <li className="nav-item"><NavLink to="/calculadora" className="nav-link px-3">Calculadora</NavLink></li>
                            <li className="nav-item"><NavLink to="/resumo" className="nav-link px-3">Resumo</NavLink></li>
                            <li className="nav-item"><NavLink to="/sobre" className="nav-link px-3">Sobre</NavLink></li>
                        </ul>
                        
                        {username ? (
                            <div className="dropdown">
                                <a href="#" className="d-flex flex-column align-items-center link-dark text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                                    <p className='m-0 mt-1'>{username}</p>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li className="d-flex align-items-center p-2 px-3">
                                        <i className="fa-solid fa-gear"></i>
                                        <NavLink to="/configuracoes" className="dropdown-item px-3">Configurações</NavLink>
                                    </li>
                                    <li className="d-flex align-items-center p-2 px-3">
                                        <i className="fa-solid fa-brush"></i>
                                        <NavLink className="dropdown-item px-3">Alterar tema</NavLink>
                                    </li>
                                    <li className="d-flex align-items-center p-2 px-3">
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                        <button onClick={handleLogout} className="dropdown-item px-3">Logout</button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <NavLink to="/login" className="btn btn-outline-danger">Login</NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Topbar;
