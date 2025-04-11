import React from 'react';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>x</button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;