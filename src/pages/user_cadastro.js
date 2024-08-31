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

  return (
      <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-9 col-md-5 p-4'>
        <div className="col-5 align-self-center" style={vrStyle}> {/* alinhar essa porra no centro verticalmente*/}
            <img src={Pfp} alt='Imagem indisponível :(' className="mx-auto d-block h-50" style={imgStyle}></img><br/>
            <button className="rounded border-0 bg-danger text-white p-2 col-9 m-2 mx-auto d-block">Alterar foto</button>
            <button className="rounded border-0 bg-secondary text-white p-2 col-9 m-2 mx-auto d-block">Remover foto</button>
        </div>
        <div className="d-flex col-1 col align-self-center" style={vrStyle}>
          <div className="vr mx-auto"/>
        </div>
        <form className="col-6 py-4">
          <div class="mx-auto form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Usuário</label>
          </div>
          <div class="mx-auto form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Usuário</label>
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
            <button className="rounded border-0 bg-danger text-white p-2 col-12" type="submit">Cadastrar</button>
            <Link to="/login"><p className='text-center p-3'>Possui conta?</p></Link>
          </div>
        </form>
      </div>
  );
}

export default Cadastro;
