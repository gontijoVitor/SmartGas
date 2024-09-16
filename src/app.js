import React from 'react';

//Imports "routes"
import { Routes, Route } from 'react-router-dom';

import Topbar from './components/topbar';

import Home from '../src/pages/home';
import Calculadora from '../src/pages/calculadora';
import Configuracoes from '../src/pages/configuracoes';
import Resumo from '../src/pages/resumo';
import Sobre from '../src/pages/sobre';
import Login from '../src/pages/user_login';
import Cadastro from '../src/pages/user_cadastro';
import Bottombar from './components/bottombar';

function App() {

  return (
    
    <div>
      <Topbar/>
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/calculadora" element={<Calculadora />} />
            <Route path="/configurações" element={<Configuracoes />} />
            <Route path="/resumo" element={<Resumo />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
        <Bottombar/>
    </div>
  );
}

export default App;
