import React from 'react';

interface ErrorAlertProps {
  type: 'error' | 'success' | 'warning'; // Define los tipos posibles para el tipo de alerta
  title: string;
  message: string;
  onClose: () => void;
}

interface CustomAlertStyle {
  alertStyle: string;
  closeBtn: string;
}

function handleAlertType( type: string ): CustomAlertStyle {
  const coreClass = 'customAlert'
  switch (type) {
    case 'error':
      return {
        alertStyle: coreClass + ' bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative',
        closeBtn: 'fill-current h-6 w-6 text-red-500'
      };
    case 'success':
      return {
        alertStyle: coreClass + ' bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative',
        closeBtn: 'fill-current h-6 w-6 text-green-500'
      };
    case 'warning':
      return {
        alertStyle: coreClass + ' bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative',
        closeBtn: 'fill-current h-6 w-6 text-yellow-500'
      };
    default:
      return { alertStyle: coreClass + '', closeBtn: '' };
  }
}

const CustomAlert: React.FC<ErrorAlertProps> = ({ type, title, message, onClose }) => {
  const alertType = handleAlertType(type);

  return (
    <div className={alertType.alertStyle} role="alert">
      <div className="grid">
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={onClose}>
          <svg className={alertType.closeBtn} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
        <strong className="font-bold">{title}</strong>
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
};

export default CustomAlert;
