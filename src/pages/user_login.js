import '../assets/imports';
import Logo from '../assets/img/common/logonobg.png';

import { Link } from 'react-router-dom';

function Login() {

  const vrStyle = {
    height: "200px",
  };
  const pTop = {
    paddingTop: '100px',
  };

  return (
    <div style={pTop}>
      <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-8 col-md-5 p-4'>
        <div className='col align-self-center'>
          <div className="d-flex col mx-auto" style={vrStyle}>
            <img src={Logo} alt='Imagem indisponível :(' className="mx-auto my-auto d-block h-100 p-4"></img>
          </div>
        </div>
        <div className="d-lg-flex d-none my-auto col-1" style={vrStyle}>
          <div className="vr mx-auto"/>
        </div>
        <form className="col my-auto">
          <div class="mx-auto form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Usuário</label>
          </div>
          <div class="mx-auto form-floating mb-3">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Senha</label>
          </div>
          <div class="mx-auto mb-3">
            <button className="confirma col-12" type="submit">Entrar</button>
            <Link to="/cadastro" className='text-decoration-none text-secondary'><p className='text-center pt-3 m-0'>Não possui conta?</p></Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
