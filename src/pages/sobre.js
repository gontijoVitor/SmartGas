import '../assets/imports';
import imgSobre from '../assets/img/common/pagina_sobre.png';

function Sobre() {
    return (
        <div className="container">
            <div className="row px-4 pb-4">
                <div className="mx-auto shadow-lg bg-body rounded row mt-4 col-xl-9 col-lg-9 col-md-8 col-sm-10 col-xs-11 p-4">
                    <h3 className='text-center mx-auto mt-4'><b>SOBRE</b></h3>
                    <p className="text-center p-4">
                        Essa é a página sobre o nosso site capaz de realizar cálculos para que você economize seu dinheiro com combustível.
                    </p>
                    <hr className='w-75 mx-auto' />
                    <img src={imgSobre} alt='Imagem indisponível :(' className='img-fluid mx-auto m-2 w-50' />
                    <p className="text-center p-4">
                        O SmartGas foi desenvolvido com o objetivo de proporcionar uma solução prática e eficiente para o cálculo de combustível.
                        O projeto utiliza a tecnologia React para a construção da interface do usuário, garantindo uma experiência moderna e interativa.
                        Para o design responsivo e a estilização, foi empregado o Bootstrap, assegurando que o site seja acessível e funcional em diferentes dispositivos.
                        O banco de dados foi estruturado em MySQL, permitindo um gerenciamento eficaz das informações, enquanto o backend foi implementado em Node.js, facilitando a comunicação entre o frontend e o banco de dados.
                        As linguagens HTML, CSS e JavaScript foram utilizadas para criar uma experiência de usuário atraente e intuitiva.
                        Com o SmartGas, os usuários podem calcular o consumo de combustível de maneira precisa, levando em conta diversos fatores, o que facilita a gestão de despesas e a otimização de rotas.
                    </p>
                    <hr className='w-75 mx-auto' />
                    <div className='w-75 mx-auto mt-4 mb-5 d-flex justify-content-between'>
                        <a href="https://www.w3schools.com/html/" className='text-dark' target='_blank' rel="noopener noreferrer"><i className="fa-brands fa-html5 fa-2xl" /></a>
                        <a href="https://www.w3schools.com/css/" className='text-dark' target='_blank' rel="noopener noreferrer"><i className="fa-brands fa-css3-alt fa-2xl" /></a>
                        <a href="https://www.w3schools.com/js/default.asp" className='text-dark' target='_blank' rel="noopener noreferrer"><i className="fa-brands fa-square-js fa-2xl" /></a>
                        <a href="https://getbootstrap.com/" className='text-dark' target='_blank' rel="noopener noreferrer"><i className="fa-brands fa-bootstrap fa-2xl" /></a>
                        <a href="https://nodejs.org/en" className='text-dark' target='_blank' rel="noopener noreferrer"><i className="fa-brands fa-node-js fa-2xl" /></a>
                        <a href="https://react.dev/" className='text-dark' target='_blank' rel="noopener noreferrer"><i className="fa-brands fa-react fa-2xl" /></a>
                        <a href="https://www.mysql.com/" className='text-dark' target='_blank' rel="noopener noreferrer"><i className="fa-solid fa-database fa-2xl" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sobre;
