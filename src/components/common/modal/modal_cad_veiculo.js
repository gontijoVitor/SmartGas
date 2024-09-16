import React from 'react';
import ReactDOM from 'react-dom';

const Modal_Cad_Veiculo = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return ReactDOM.createPortal(
    <>
    </>
  );
};

export default Modal_Cad_Veiculo;