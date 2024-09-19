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

  const dropdownItemStyle = {
    backgroundColor: 'transparent',  // Remove o fundo
    color: 'inherit',                // Mantém a cor do texto
    textDecoration: 'none',          // Remove o sublinhado
  };

  return (
    <div className='fixed-top'>
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
              <NavLink to="/resumo" className="nav-link px-3" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Resumo</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/sobre" className="nav-link px-3" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Sobre</NavLink>
            </li>
          </ul>
        </div>

        {/* Imagem de Perfil e Drop-down */}
        <div className="dropdown">
          <a href="/" className="d-flex flex-column align-items-center link-dark text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={Pfp} alt='Imagem indisponível :(' width="30" height="30" className="rounded-circle"/>
            <p className='m-0 mt-1'>Username</p> {/* Adds margin-top for spacing */}
          </a>
          <ul className="dropdown-menu dropdown-menu-end text-small" aria-labelledby="dropdownUser1">
            <li className="d-flex align-items-center p-2 px-3">
              <i className="fa-solid fa-circle-half-stroke"/>
              <p className="dropdown-item px-3 m-0" style={dropdownItemStyle}>Trocar tema</p>
            </li>
            <li className="d-flex align-items-center p-2 px-3">
              <i className="fa-solid fa-gear"/>
              <NavLink to="/configurações" className="dropdown-item" style={({ isActive }) => isActive ? dropdownItemStyle : undefined}>Configurações</NavLink>
            </li>
            <li className="d-flex align-items-center p-2 px-3">
              <i className="fa-solid fa-right-from-bracket"/>
              <NavLink to="/login" className="dropdown-item" style={({ isActive }) => isActive ? dropdownItemStyle : undefined}>Logout</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Topbar;
