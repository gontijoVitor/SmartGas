function Resumo() {
  const pTop = {
    paddingTop: '100px',
  };
  return (
    <div className="row col-10 mx-auto" style={pTop}>
      <div className='shadow-lg bg-body rounded row mt-4 col-12 col-sm-10 col-md-6 p-4'>
        <h5 className=''>Gráfico</h5>
        <div className='mx-auto p-2 rounded row border'>
        </div>
      </div>
      <div className="ms-auto mt-4 col-md-5">
        <div className='shadow-lg bg-body rounded row mb-4 p-4'>
          <h5 className=''>Ranking posto</h5>
          <div className='mx-auto p-2 rounded row border'>
          </div>
        </div>
        <div className='shadow-lg bg-body rounded row p-4'>
          <h5 className=''>Ranking veículo</h5>
          <div className='mx-auto p-2 rounded row border'>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resumo;
