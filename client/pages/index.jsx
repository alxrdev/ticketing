import buildClient from "../api/build-client";

const Home = ({ user }) => {
  return user ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>;
};

Home.getInitialProps = async (ctx) => {
  const client = buildClient(ctx);
  const { data } = await client.get("/api/users/my-user");

  return {
    user: data.currentUser,
  };
};

export default Home;
