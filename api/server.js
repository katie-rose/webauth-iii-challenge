const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

server.get("/token", (req, res) => {
  const role = "admin";
  const payload = {
    subject: "me",
    role
  };
  const secret = "is it secret, is it safe?";
  const options = {
    expiresIn: "8h"
  };
  const token = jwt.sign(payload, secret, options);

  res.status(200).json({ role: role, token });
});

module.exports = server;
