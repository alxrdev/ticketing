import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) onSuccess();

      return response.data;
    } catch (err) {
      const errors = err.response.data.errors;
      setErrors(
        <div className="alert alert-danger mt-3">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {errors.map((error, key) => (
              <li key={key}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
