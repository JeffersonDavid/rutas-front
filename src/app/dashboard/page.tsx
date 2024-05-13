
import Middleware from "../components/auth/pageMiddleware";

const Dashboard = () => {
  return (
    <>
      <Middleware>
          <h1>Dashboard</h1>
      </Middleware>
    </>
  );
};

export default Dashboard;
