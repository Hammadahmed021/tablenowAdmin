import React, { useEffect } from 'react';

const Modal = ({ title, onYes, onClose }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id === 'modal-overlay') {
        onClose();
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div id="modal-overlay" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 w-full bg-admin_light_grey text-admin_text_grey rounded hover:bg-gray-300"
          >
            No
          </button>
          <button
            onClick={() => { onYes(); onClose(); }}
            className="px-4 py-2 w-full bg-admin_dark text-white rounded hover:bg-admin_primary"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
