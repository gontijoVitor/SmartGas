// src/App.jsx
// Componente principal da aplicação que define as rotas e a estrutura básica

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Topbar from './components/topbar';
import Home from './pages/home';
import Calculadora from './pages/calculadora';
import Configuracoes from './pages/configuracoes';
import Resumo from './pages/resumo';
import Sobre from './pages/sobre';
import Login from './pages/user_login';
import Cadastro from './pages/user_cadastro';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculadora" element={<ProtectedRoute><Calculadora /></ProtectedRoute>} />
          <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />
          <Route path="/resumo" element={<ProtectedRoute><Resumo /></ProtectedRoute>} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;