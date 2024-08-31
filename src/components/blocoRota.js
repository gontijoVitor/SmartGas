import '../assets/imports';

function BlocoRota() {
    return (
        <div className='mx-auto p-2 rounded row border align-items-center my-2'>
            <i className="fa-solid fa-map-location-dot fa-xl col-auto"/>
            <div className='col'>
                <h5>Rota 1</h5>
                <p className='mb-1'>7KM</p>
            </div>
            <i className="fa-solid fa-pen-to-square fa-lg col-auto p-1"/>
        </div>
    );
}

export default BlocoRota;
