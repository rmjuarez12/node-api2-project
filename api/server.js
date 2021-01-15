//* Import Express and setup server
const express = require("express");
const server = express();
const DB = require("./db-helpers");

//* Import the routers
const Post = require("./posts/posts-router");

//* Ensure it parses the JSON
server.use(express.json());

//* Setup the routers
server.use("/api/posts", Post);

//* Export modules
module.exports = server;
