function BottomConfig() {
    return (
      <div class="menu shadow-lg bg-body rounded col-9 m-2 d-flex flex-row-reverse position-fixed bottom-0 end-0">
        <button className="confirma w-25 m-3" type="submit">Salvar alterações</button>
        <button className="cancela w-25 m-3" type="submit">Cancelar alterações</button>
      </div>
    );
  }
  
export default BottomConfig;