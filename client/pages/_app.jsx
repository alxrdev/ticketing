import buildClient from "../api/build-client";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/Header";

const App = ({ Component, pageProps, user }) => {
  return (
    <div>
      <Header user={user} />
      <Component {...pageProps} />
    </div>
  );
};

App.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/my-user");

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    user: data.currentUser,
  };
};

export default App;
