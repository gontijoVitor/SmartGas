function Resumo() {
  const pTop = {
    paddingTop: '100px',
  };
  return (
    <div className="row col-10 mx-auto mt-4" style={pTop}>
      <div className='shadow-lg bg-body rounded row mb-4 col-12 col-md-6 p-4'>
        <h5 className=''>Gráfico</h5>
        <div className='mx-auto p-2 rounded row border'>
          {/* Conteudo */}
        </div>
      </div>
      <div className="ms-auto col-md-5 px-0">
        <div className='shadow-lg bg-body rounded row mb-4 col-12 p-4'>
          <h5 className=''>Ranking posto</h5>
          <div className='mx-auto p-2 rounded row border'>
            {/* Conteudo */}
          </div>
        </div>
        <div className='shadow-lg bg-body rounded row mb-4 col-12 p-4'>
          <h5 className=''>Ranking veículo</h5>
          <div className='mx-auto p-2 rounded row border'>
            {/* Conteudo */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resumo;
