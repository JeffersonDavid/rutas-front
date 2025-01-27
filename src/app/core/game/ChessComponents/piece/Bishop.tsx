interface BishopProps {
    color: "black" | "white"; // El color de la pieza
  }
  
  export const Bishop: React.FC<BishopProps> = ({ color }) => {
    // Ruta de la imagen para el color negro
    const blackPawnImage = "/images/bishopb.png"; // Asegúrate de que esta imagen exista en `public/images`
    const whitePawnImage = "/images/bishopw.png";

    if (color === "black") {
      return (
        <img
          src={blackPawnImage}
          alt="Black Pawn"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      );
    }
  
    // Para el color blanco, se usa el SVG predeterminado
    return (
      <img
        src={whitePawnImage}
        alt="Black Pawn"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    );
  };
  