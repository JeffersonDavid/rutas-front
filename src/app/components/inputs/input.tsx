// components/inputs/Input.tsx
import React from 'react';

interface InputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ id, name, type, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-300">
      {name}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 mt-1 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-indigo-300"
      placeholder={placeholder}
      required
    />
  </div>
);

export default Input;
