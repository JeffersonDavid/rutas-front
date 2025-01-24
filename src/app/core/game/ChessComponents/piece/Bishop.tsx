interface BishopProps {
    color: "black" | "white"; // El color de la pieza
  }
  
  export const Bishop: React.FC<BishopProps> = ({ color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      fill={color} // Usamos el color pasado como prop
    >
      {/* Base del alfil */}
      <ellipse cx="50" cy="80" rx="25" ry="8" />
      {/* Cuerpo del alfil */}
      <rect x="40" y="45" width="20" height="35" />
      {/* Cabeza del alfil */}
      <circle cx="50" cy="30" r="10" />
      {/* Detalle de la cruz en la cabeza */}
      <line x1="50" y1="15" x2="50" y2="25" stroke="white" strokeWidth="2" />
      <line x1="45" y1="20" x2="55" y2="20" stroke="white" strokeWidth="2" />
    </svg>
  );
  