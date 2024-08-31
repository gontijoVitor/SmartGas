import '../assets/imports';
import Logo from '../assets/img/common/logonobg.png';

import { Link } from 'react-router-dom';

function Login() {

  const vrStyle = {
    height: "200px",
  };

  return (
      <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-9 col-md-5 p-4'>
        <div className="d-flex col-5" style={vrStyle}>
          <img src={Logo} alt='Imagem indisponível :(' className="mx-auto d-block h-75 my-auto"></img>
        </div>
        <div className="d-flex col-1" style={vrStyle}>
          <div className="vr mx-auto"/>
        </div>
        <form className="col-6">
          <div class="mx-auto form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Usuário</label>
          </div>
          <div class="mx-auto form-floating mb-3">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Senha</label>
          </div>
          <div class="mx-auto mb-3">
            <button className="rounded border-0 bg-danger text-white p-2 col-12" type="submit">Entrar</button>
            <Link to="/cadastro"><p className='text-center p-3'>Não possui conta?</p></Link>
          </div>
        </form>
      </div>
  );
}

export default Login;
