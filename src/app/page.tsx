import Middleware from "./components/auth/pageMiddleware";

export default function Home() {
  return (
    <Middleware>Home page</Middleware>
  );
}
