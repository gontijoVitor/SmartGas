import '../assets/imports';

function BlocoPosto() {
    return (
        <div className='mx-auto p-2 rounded row border align-items-center my-2'>
            <i className="fa-solid fa-gas-pump fa-xl col-auto"/>
            <div className='col'>
                <h5>Posto Shell</h5>
                <p className='mb-1'>R$5,96</p>
            </div>
            <i className="fa-solid fa-pen-to-square fa-lg col-auto p-1"/>
        </div>
    );
}

export default BlocoPosto;
