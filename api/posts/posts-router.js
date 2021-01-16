//* Import express and setup router
const express = require("express");
const router = express.Router();

//* Import the DB helper
const DB = require("../db-helpers");

//* Handle Endpoints

// POST - Create a new post
router.post("/", (req, res) => {
  // New post to insert
  const newPost = req.body;

  // Ensure that the title or contents are specified
  if (
    newPost.title === undefined ||
    newPost.title === "" ||
    newPost.contents === undefined ||
    newPost.contents === ""
  ) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
    return;
  }

  DB.insert(newPost)
    .then((post) => {
      res.status(201).json({ ...post, ...newPost });
    })
    .catch(() => {
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

// GET - Get all posts from the Database
router.get("/", (req, res) => {
  DB.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// GET - Post by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  DB.findById(id)
    .then((post) => {
      if (post[0] === undefined) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//* Export Modules
module.exports = router;
