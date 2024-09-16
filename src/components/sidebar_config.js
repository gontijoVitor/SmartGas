function Sidebar() {
    return (
      <div class="menu shadow-lg bg-body rounded col-2 p-2 h-75 position-fixed start-0 bottom-0">
        <div class="d-flex align-items-center p-4">
          <i class="fa-solid fa-user me-2"></i>
          <h4 class="mb-0">Usuários</h4>
        </div>
        <div class="d-flex align-items-center p-4">
          <i class="fa-solid fa-ruler me-2"></i>
          <h4 class="mb-0">Unidades de medida</h4>
        </div>
        <div class="d-flex align-items-center p-4">
          <i class="fa-solid fa-calculator me-2"></i>
          <h4 class="mb-0">Conversores</h4>
        </div>
        <hr className="mx-4 my-1"/>
        <div class="d-flex align-items-center p-4">
          <i class="fa-solid fa-right-from-bracket me-2"></i>
          <h4 class="mb-0">Logout</h4>
        </div>
      </div>
    );
  }
  
export default Sidebar;