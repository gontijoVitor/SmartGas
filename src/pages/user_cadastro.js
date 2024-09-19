import '../assets/imports';
import Pfp from '../assets/img/profile/pfp.jpg';

import { Link } from 'react-router-dom';

function Cadastro() {

  const vrStyle = {
    height: "400px",
  };
  const imgStyle = {
    borderRadius: "100%",
  };
  const pTop = {
    paddingTop: '100px',
  };

  return (
    <div style={pTop}>
      <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-8 col-md-5 p-4'>
        <div className="col align-self-center" style={vrStyle}>
            <img src={Pfp} alt='Imagem indisponível :(' className="mx-auto d-block h-50" style={imgStyle}></img><br/>
            <div>
              <button className="confirma col-10 m-2 mx-auto d-block">Alterar foto</button>
              <button className="cancela col-10 m-2 mx-auto d-block">Remover foto</button>
            </div>
        </div>
        <div className="d-lg-flex d-none my-auto col-1" style={vrStyle}>
          <div className="vr mx-auto"/>
        </div>
        <form className="col">
          <div class="mx-auto form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Usuário</label>
          </div>
          <div class="mx-auto form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Email</label>
          </div>
          <div class="mx-auto form-floating mb-3">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Senha</label>
          </div>
          <div class="mx-auto form-floating mb-3">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Confirme sua senha</label>
          </div>
          <div class="mx-auto mb-3">
            <button className="confirma col-12" type="submit">Cadastrar</button>
            <Link to="/login" className='text-decoration-none text-secondary'><p className='text-center p-3'>Possui conta?</p></Link>
          </div>
        </form>
      </div>
    </div>

  );
}

export default Cadastro;
