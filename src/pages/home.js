import '../assets/imports';
import Logo from '../assets/img/common/logonobg.png';
import img1 from '../assets/img/common/img_home_1.png';
import img2 from '../assets/img/common/img_home_2.png';

function Home() {
    const py = {
        paddingTop: '100px',
        paddingBottom: '25px',
      };
    return (
        <div className="container" style={py}>
            <div className="row px-4 pb-4">
                <div className="mx-auto shadow-lg bg-body rounded p-4 mt-4 col-xl-9 col-lg-9 col-md-8 col-sm-10 col-xs-11">
                    <div className="d-flex justify-content-center mb-4">
                        <img src={Logo} width="75" height="75" className="d-inline-block align-top" alt='Imagem indisponível :('/>
                    </div>
                    <hr className='w-75 mx-auto' />
                    <p className="text-center p-4">
                        Bem-vindo ao <b>SmartGas</b>, a ferramenta definitiva para quem busca otimizar suas viagens e reduzir custos.
                        Desenvolvemos este site com o objetivo de proporcionar uma experiência simples, eficiente e acessível para todos que precisam calcular o preço, a distância e o combustível gasto em suas jornadas.
                        Seja você um motorista autônomo, uma empresa de logística, ou apenas alguém planejando uma viagem, nossa plataforma oferece soluções práticas para ajudar você a tomar decisões mais informadas e econômicas.
                    </p>
                    <hr className='w-75 mx-auto' />
                    <div className="d-flex justify-content-center mb-4">
                        <img src={img1} className="img-fluid d-flex w-50" alt='Imagem indisponível :('/>
                    </div>
                    <p className="text-center p-4">
                        Nossa calculadora permite que você estime a distância do trajeto, o consumo de combustível e o custo total da viagem de forma rápida e precisa.
                        Com base nas informações do veículo e nas condições das rotas, oferecemos uma comparação entre diferentes trajetos, ajudando você a escolher a opção mais econômica e conveniente.
                        Além disso, você pode acessar o histórico de cálculos anteriores para facilitar o planejamento de futuras viagens.
                    </p>
                    <hr className='w-75 mx-auto' />
                    <div className="d-flex justify-content-center mb-4">
                        <img src={img2} height="" className="img-fluid d-flex w-75" alt='Imagem indisponível :('/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
