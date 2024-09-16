import BottomConfig from "../components/bottom_config";

function Conf_conversores() {
    return (
      <>
        <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-10 col-sm-9 p-4'>
          <h3 className='text-center m-2 mb-4 mx-auto'><b>Conversores</b></h3>
          
            <div class="m-2">
                <label for="mpg">Consumo em Milhas por Galão (MPG):</label>
                <input type="number" id="mpg" placeholder="Insira o valor em MPG"/>
                <button onclick="converter()">Converter para KM/L</button>
                <div id="resultado" class="result"></div>
            </div>
          
            <div class="m-2">
                <label for="mpg">Consumo em Milhas por Galão (MPG):</label>
                <input type="number" id="mpg" placeholder="Insira o valor em MPG"/>
                <button onclick="converter()">Converter para KM/L</button>
                <div id="resultado" class="result"></div>
            </div>

        </div>
        <BottomConfig/>
      </>

    );
  }
  
export default Conf_conversores;