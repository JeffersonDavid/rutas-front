
import Middleware from "../components/auth/pageMiddleware";
import UserConnection from "../components/sockets/users/setUserState";

const Dashboard = () => {
  
  return (
    <>
      <Middleware>
        <UserConnection/>
          <div className="mt-[10vh]">
           </div>
      </Middleware>
    </>
  );
};

export default Dashboard;
