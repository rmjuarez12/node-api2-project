//* Import Express and setup server
const express = require("express");
const server = express();

//* Ensure it parses the JSON
server.use(express.json());

module.exports = server;
