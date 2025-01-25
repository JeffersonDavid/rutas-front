interface KnightProps {
    color: "black" | "white"; // El color de la pieza
  }
  
  export const Knight: React.FC<KnightProps> = ({ color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      fill={color} // Usamos el color pasado como prop
    >
      {/* Cabeza del caballo */}
      <path d="M50 20 C60 10, 80 20, 70 40 Q65 50, 50 50 Q35 50, 30 40 C25 30, 40 20, 50 20" />
      {/* Base del caballo */}
      <rect x="35" y="50" width="30" height="30" />
      {/* Base elíptica del soporte */}
      <ellipse cx="50" cy="90" rx="25" ry="8" />
    </svg>
  );
  