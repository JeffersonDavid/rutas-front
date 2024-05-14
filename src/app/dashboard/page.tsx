
import Middleware from "../components/auth/pageMiddleware";
import ChessBoard from "../core/chessComponets/ChessBoard";

const Dashboard = () => {
  return (
    <>
      <Middleware>
          <div>
              <h1>Tablero de Ajedrez</h1>
              <ChessBoard />
          </div>
      </Middleware>
    </>
  );
};

export default Dashboard;
