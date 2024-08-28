import React from 'react';

const SearchButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    className="bg-gray-800 text-white p-4 rounded mb-4 hover:bg-gray-700 transition duration-300"
    onClick={onClick}
  >
    Buscar partida
  </button>
);

export default SearchButton;
