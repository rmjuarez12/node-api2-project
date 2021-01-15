//* Import express and setup router
const express = require("express");
const router = express.Router();

//* Import the DB helper
const DB = require("../db-helpers");

//* Handle Endpoints
router.get("/", (req, res) => {
  DB.find().then((posts) => {
    res.status(200).json(posts);
  });
});

//* Export Modules
module.exports = router;
