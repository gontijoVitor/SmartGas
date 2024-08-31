import '../assets/imports';
import React, { useState } from 'react';
import Logo from '../assets/img/common/logonobg.png';
import Pfp from '../assets/img/profile/pfp.jpg';
import { NavLink } from 'react-router-dom';

function Topbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const activeLinkStyle = {
    textDecoration: 'underline',
  };

  const navStyle = {
    borderBottom: '2px solid #D10000',
  };

  const darkModeClass = isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark';

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <nav 
      className={`navbar navbar-expand-lg ${darkModeClass} px-5`} 
      style={navStyle}
    >
      {/* Logo */}
      <NavLink to="/" className="navbar-brand">
        <img
          src={Logo}
          width="75"
          height="75"
          className="d-inline-block align-top"
          alt="Logo"
        />
      </NavLink>

      {/* Botão para navegação em telas pequenas */}
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>

      {/* Links no centro */}
      <div className="collapse navbar-collapse justify-content-around" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" exact className="nav-link px-3" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/calculadora" className="nav-link px-3" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Calculadora</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/configurações" className="nav-link px-3" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Configurações</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/resumo" className="nav-link px-3" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Resumo</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/sobre" className="nav-link px-3" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Sobre</NavLink>
          </li>
        </ul>
      </div>

      {/* Imagem de Perfil e Drop-down */}
      <div className="dropdown">
        <a href="/" className="d-flex align-items-center link-dark text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <img src={Pfp} alt='Imagem indisponível :(' width="30" height="30" className="rounded-circle"/>
        </a>
        <ul className="dropdown-menu dropdown-menu-end text-small" aria-labelledby="dropdownUser1">
          <li className="d-flex justify-content-between align-items-center p-2 px-3">
            <p className="mb-0">Trocar tema</p>
            <i 
              className={`fa-solid fa-circle-half-stroke ${isDarkMode ? 'text-light' : 'text-dark'}`} 
              onClick={toggleDarkMode}
              style={{ cursor: 'pointer' }}
            />
          </li>
          <li>
            <NavLink to="/login" className="dropdown-item" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Logout</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Topbar;
