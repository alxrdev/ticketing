import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      name,
      email,
      password,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await doRequest();
    if (response) Router.push("/");
  };

  return (
    <div className="container">
      <form className="mt-5" onSubmit={onSubmit}>
        <h1>Sign Up</h1>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
