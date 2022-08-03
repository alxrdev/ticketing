import { useState } from "react";
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
    } catch(error) {
      setErrors(error.response.data.errors);
    }
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <label>Email Address</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {errors.length > 0 && (
          <div className="alert alert-danger mt-3">
            <h4>Ooops...</h4>
            <ul className="my-0">
              {errors.map((error, key) => (
                <li key={key}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-group mt-3">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
