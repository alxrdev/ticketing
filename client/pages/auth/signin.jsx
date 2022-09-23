import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <div className="container">
      <form className="mt-5" onSubmit={onSubmit}>
        <h1>Sign In</h1>

        <div className="form-group mt-3">
          <label>Email Address</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errors}

        <div className="form-group mt-3">
          <button className="btn btn-primary">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
