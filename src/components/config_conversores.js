// Página de conversores na página de configurações

function Conf_conversores() {
    return (
      <div className='row'>
        <div className='d-flex flex-row-reverse position-fixed end-0 shadow-lg bg-body rounded row mt-4 me-5 col-10 col-sm-9 px-5 py-4'>
          <h3 className='m-2 mb-4'><b>Conversores</b></h3>
            <div class="m-2">
                <label for="mpg">Valor em milhas (MI):</label>
                <input className="mx-2" type="number" id="mpg" placeholder="Insira o valor em milhas"/>
                <button onclick="converter()" className="confirma m-2">Converter para KM</button>
                <div id="resultado" class="result"></div>
            </div>
            <div class="m-2">
                <label for="mpg">Milhas por Galão (MPG):</label>
                <input className="mx-2" type="number" id="mpg" placeholder="Insira o valor em MPG"/>
                <button onclick="converter()" className="confirma m-2">Converter para KM/L</button>
                <div id="resultado" class="result"></div>
            </div>

        </div>
      </div>

    );
  }
  
export default Conf_conversores;