import axios from "axios";

export default ({ req }) => {
  const baseURL =
    typeof window === "undefined"
      ? "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local"
      : "/";

  const headers = req ? req.headers : undefined;

  return axios.create({
    baseURL,
    headers,
  });
};
