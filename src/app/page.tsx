import Middleware from "./components/auth/middleware";

export default function Home() {
  return (
    <Middleware>Home page</Middleware>
  );
}
