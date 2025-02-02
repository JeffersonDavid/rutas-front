interface KingProps {
    color: "black" | "white"; // El color de la pieza
  }
  
  export const King: React.FC<KingProps> = ({ color }) => {
    // Ruta de la imagen para el color negro
    const blackKingImage = "/images/king-b.png"; // Asegúrate de que esta imagen exista en `public/images`
    const whiteKingImage = "/images/king-w.png";

    if (color === "black") {
      return (
        <img
          src={blackKingImage}
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
        src={whiteKingImage}
        alt="Black Pawn"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    );
  };
  