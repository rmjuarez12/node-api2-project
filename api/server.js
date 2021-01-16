//* Import Express and setup server
const express = require("express");
const server = express();
const DB = require("./db-helpers");

//* Import the routers
const Post = require("./posts/posts-router");
const Comments = require("./comments/comments-router");

//* Ensure it parses the JSON
server.use(express.json());

//* Setup the routers
server.use("/api/posts", Post);
server.use("/api/posts", Comments);

//* Export modules
module.exports = server;
