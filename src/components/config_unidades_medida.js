import BottomConfig from "../components/bottom_config";

function Conf_uni_med() {
    return (
        <>
            <div className='mx-auto shadow-lg bg-body rounded row mt-4 col-10 col-sm-9 p-4'>
                <h3 className='text-center m-0'><b>Unidades de medida</b></h3>
                <label for="uni-medidas" class="form-label">Unidade de distância</label>
                <select type='select' class="form-control" id="uni-medidas">
                    <option value='1'>KM</option>
                    <option value='2'>MI</option>
                </select>
                <label for="kml-mig" class="form-label">KM por litro ou milhas por galão</label>
                <select type='select' class="form-control" id="kml-mig">
                    <option value='1'>KM/L</option>
                    <option value='2'>MPG</option>
                </select>
                <label for="val-comb" class="form-label">Valor do combustível</label>
                <select type='select' class="form-control" id="val-comb">
                    <option value='1'>R$/L</option>
                    <option value='2'>$/G</option>
                </select>
                <button className="confirma w-75 mx-auto m-4" type='submit'>Realizar conversão de valores no DB</button>
            </div>
            <BottomConfig/>
        </>
    );
  }
  
export default Conf_uni_med;