interface RookProps {
    color: "black" | "white"; // El color de la pieza
  }
  
  export const Rook: React.FC<RookProps> = ({ color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      fill={color} // Usamos el color pasado como prop
    >
      {/* Base de la torre */}
      <rect x="30" y="70" width="40" height="20" />
      {/* Cuerpo de la torre */}
      <rect x="40" y="40" width="20" height="30" />
      {/* Parte superior de la torre */}
      <rect x="35" y="30" width="30" height="10" />
      {/* Tres almenas */}
      <rect x="35" y="20" width="5" height="10" />
      <rect x="45" y="20" width="10" height="10" />
      <rect x="60" y="20" width="5" height="10" />
    </svg>
  );
  