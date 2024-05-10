import { redirect } from 'next/navigation'
import Middleware from "../components/auth/middleware";

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
