// Componente para exibir a página de cadastro de usuário

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/img/common/logonobg.png';

function Cadastro() {
  const [formData, setFormData] = useState({
    usuario_user: '',
    usuario_email: '',
    usuario_senha: '',
    confirmaSenha: '',
  });

  const navigate = useNavigate(); // Hook para navegação

  // Atualiza o estado do formulário ao alterar os campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Envia os dados do formulário para registrar um novo usuário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.usuario_senha !== formData.confirmaSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        usuario_user: formData.usuario_user,
        usuario_email: formData.usuario_email,
        usuario_senha: formData.usuario_senha,
      });

      alert(response.data.message);
      navigate('/login'); // Redireciona após sucesso
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.response?.data);
      alert(`Erro: ${error.response?.data.message || error.message}`);
    }
  };

  const vrStyle = { height: '400px' };
  const pTop = { paddingTop: '100px' };

  return (
    <div style={pTop}>
      <div className="mx-auto shadow-lg bg-body rounded row mt-4 col-9 col-md-5 p-4">
        <div className="d-flex col mx-auto" style={vrStyle}>
          <img src={Logo} alt="Imagem indisponível" className="mx-auto d-block h-75 my-auto" />
        </div>
        <div className="d-md-flex d-none col-1" style={vrStyle}>
          <div className="vr mx-auto" />
        </div>
        <form className="col" onSubmit={handleSubmit}>
          <div className="mx-auto form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="usuario_user"
              name="usuario_user"
              value={formData.usuario_user}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <label htmlFor="usuario_user">Usuário</label>
          </div>
          <div className="mx-auto form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="usuario_email"
              name="usuario_email"
              value={formData.usuario_email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <label htmlFor="usuario_email">Email</label>
          </div>
          <div className="mx-auto form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="usuario_senha"
              name="usuario_senha"
              value={formData.usuario_senha}
              onChange={handleChange}
              required
            />
            <label htmlFor="usuario_senha">Senha</label>
          </div>
          <div className="mx-auto form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="confirmaSenha"
              name="confirmaSenha"
              value={formData.confirmaSenha}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirmaSenha">Confirme sua senha</label>
          </div>
          <button className="confirma col-12" type="submit">
            Cadastrar
          </button>
          <Link to="/login">
            <p className="text-center p-3">Já possui uma conta? Faça login</p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;