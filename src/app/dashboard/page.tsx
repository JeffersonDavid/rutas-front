
import Middleware from "../components/auth/pageMiddleware";
import UsersTable from "../components/sockets/users/usertTable";

const Dashboard = () => {
  
  return (
    <>
          <div className="mt-[10vh]">
              <UsersTable></UsersTable>
          </div>
    </>
  );
};

export default Dashboard;
