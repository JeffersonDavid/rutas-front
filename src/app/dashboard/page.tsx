
import Middleware from "../components/auth/pageMiddleware";
import Socket from "../components/sockets/conn";

const Dashboard = () => {
  return (
    <>
      <Middleware>
          <div className="mt-[10vh]">  </div>
          <Socket></Socket>
      </Middleware>
    </>
  );
};

export default Dashboard;
