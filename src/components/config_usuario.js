// Página de configuração de usuários  localizada na página de configurações

import Pfp from '../assets/img/profile/pfp.jpg';

function Conf_usuario() {

  const vrStyle = {
    height: "400px",
  };
  const imgStyle = {
    borderRadius: "100%",
  };

    return (
      <div className='row'>
        <div className='d-flex flex-row-reverse position-fixed end-0 shadow-lg bg-body rounded row mt-4 me-5 col-10 col-sm-9  px-5 py-4'>
        <h3 className=' m-2 mb-4'><b>Editar usuário</b></h3>

          <div className="col-5 align-self-center">
              <img src={Pfp} alt='Imagem indisponível :(' className="mx-auto d-block h-50" style={imgStyle}/><br/>
              <button className="confirma col-9 m-2 mx-auto d-block">Alterar foto</button>
              <button className="cancela col-9 m-2 mx-auto d-block">Remover foto</button>
          </div>

          <div className="d-flex col-1 col align-self-center mx-auto" style={vrStyle}>
            <div className="vr mx-auto"/>
          </div>

          <form className="col-5 py-4 mx-auto">
            <div class="mx-auto form-floating mb-3">
              <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"/>
              <label for="floatingInput">Usuário</label>
            </div>

            <div class="mx-auto form-floating mb-3">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
              <label for="floatingPassword">Senha atual</label>
            </div>

            <div class="mx-auto form-floating mb-3">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
              <label for="floatingPassword">Nova senha</label>
            </div>

            <div class="mx-auto form-floating mb-3">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
              <label for="floatingPassword">Confirme sua nova senha</label>
            </div>

            <div class="mx-auto mb-3">
              <button className="confirma p-2 col-12" type="submit">Salvar alterações</button>
            </div>
          </form>
          
        </div>
      </div>
    );
  }
  
export default Conf_usuario;