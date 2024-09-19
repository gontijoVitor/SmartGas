import "../assets/styles/styles.css"

function Sidebar({ onSelect }) {
    return (
      <div class="menu shadow-lg bg-body rounded col-2 ms-4 mt-5 p-2 h-75 position-fixed start-0">
        <div class="d-flex align-items-center p-4 pointer" onClick={() => onSelect('usuario')}>
          <i class="fa-solid fa-user me-2"></i>
          <h4 class="mb-0">Usuários</h4>
        </div>
        <div class="d-flex align-items-center p-4 pointer" onClick={() => onSelect('unidade')}>
          <i class="fa-solid fa-ruler me-2"></i>
          <h4 class="mb-0">Unidades de medida</h4>
        </div>
        <div class="d-flex align-items-center p-4 pointer" onClick={() => onSelect('conversores')}>
          <i class="fa-solid fa-calculator me-2"></i>
          <h4 class="mb-0">Conversores</h4>
        </div>
        <hr className="mx-4 my-1"/>
        <div class="d-flex align-items-center p-4 pointer">
          <i class="fa-solid fa-right-from-bracket me-2"></i>
          <h4 class="mb-0">Logout</h4>
        </div>
      </div>
    );
  }
  
export default Sidebar;