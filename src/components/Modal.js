import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Modal = ({ children, onClose }) => {
  const el = document.createElement('div');

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(
    <ModalWrapper>
      {children}
      <button onClick={onClose}>Close Modal</button>
    </ModalWrapper>,
    el
  );
};

export default Modal;