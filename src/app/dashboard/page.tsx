
import Middleware from "../components/auth/pageMiddleware";
import ChessBoard from "../core/ChessComponents/table/table";

const Dashboard = () => {
  return (
    <>
      <Middleware>
          <div className="mt-[10vh]">
              <ChessBoard />
          </div>
      </Middleware>
    </>
  );
};

export default Dashboard;
