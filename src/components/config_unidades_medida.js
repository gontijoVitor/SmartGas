// Página para configurar unidades de medida no site, localizada na página de configurações

function Conf_uni_med() {
    return (
        <div className='row'>
            <div className='d-flex flex-row-reverse position-fixed end-0 shadow-lg bg-body rounded row mt-4 me-5 col-10 col-sm-9 px-5 py-4'>
                <h3 className='m-2 mb-4'><b>Unidades de medida</b></h3>
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
                <button className="confirma w-25 mx-auto m-4" type='submit'>Salvar alterações</button>
                <button className="cancela w-25 mx-auto m-4" type='submit'>Realizar conversão de valores no DB</button>
            </div>
        </div>
    );
  }
  
export default Conf_uni_med;