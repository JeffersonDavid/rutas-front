
import Middleware from "../components/auth/pageMiddleware";
import UserConnection from "../components/sockets/users/setUserState";
import UsersTable from "../components/sockets/users/usertTable";

const Dashboard = () => {
  
  return (
    <>
      <Middleware>
          <div className="mt-[10vh]">
            <UsersTable></UsersTable>
           </div>
      </Middleware>
    </>
  );
};

export default Dashboard;
