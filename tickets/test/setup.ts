import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

global.signin = () => {
  const payload = {
    id: 1,
    email: "test@test.com",
  };

  const token = jwt.sign(payload, process.env.JWT_KEY || "");

  const sessionJSON = JSON.stringify({ token });

  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`session=${base64}`];
};
