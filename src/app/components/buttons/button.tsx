// components/buttons/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
  >
    {text}
  </button>
);

export default Button;
