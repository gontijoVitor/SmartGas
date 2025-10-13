// src/pages/sobre.jsx
// Componente principal para exibir a página sobre do SmartGas

import React from 'react';
import imgSobre from '../assets/img/common/pagina_sobre.png';
import '../assets/styles/home.css';
import { Link } from 'react-router-dom';

function NotFound() {
    const py = {
        paddingTop: '100px',
        paddingBottom: '25px',
    };

    return (
        <div className="container" style={py}>
            <div className="row px-4 pb-4">
                <div className="mx-auto shadow-lg bg-body rounded p-4 mt-4 col-xl-9 col-lg-10 col-md-10 col-sm-11 col-xs-11">
                    <h3 className="text-center mx-auto mt-4">
                        <b>Página não encontrada :(</b>
                    </h3>
                    <p className="text-center p-4">
                        Aparentemente você tentou acessar uma página que não existe ou foi removida.<br/> Verifique o endereço ou retorne para a página inicial.
                    </p>
                    <div className="">
                        <Link to="/" className='confirma link-underline link-underline-opacity-0'>Ir para a página inicial</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;