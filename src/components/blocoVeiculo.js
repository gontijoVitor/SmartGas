import veiculo from '../assets/img/vehicle/Toyota-Corolla-2024.jpg';
import '../assets/imports';

function BlocoVeiculo() {

    const imgFormat = {
        objectFit: "contain",
        width: '150px', // Adjust width as needed
        height: 'auto', // Maintain aspect ratio
    };

    return (
        <div className='mx-auto p-2 rounded border d-flex align-items-center my-2'>
            <img src={veiculo} style={imgFormat} alt='Imagem indisponível :(' className='col-auto'/>
            <div className='col'>
                <h6 className='px-2'>Toyota Corolla 2024</h6>
                <p className='px-2 mb-1'>8.3KM/L</p>
            </div>
            <i className="fa-solid fa-pen-to-square fa-lg ms-auto p-1"/>
        </div>
    );
}

export default BlocoVeiculo;
