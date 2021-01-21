//* Import express and setup router
const express = require("express");
const { route } = require("../comments/comments-router");
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

// DELETE - Delete a post by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  DB.findById(id)
    .then((post) => {
      if (post[0] === undefined) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        DB.remove(id)
          .then((post) => {
            res.status(200).json({ message: "Post has been deleted" });
          })
          .catch(() => {
            res.status(500).json({ error: "The post could not be removed" });
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// PUT - Edit a post
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const newPostData = req.body;

  DB.findById(id)
    .then((post) => {
      if (post[0] === undefined) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        if (
          newPostData.title === undefined ||
          newPostData.title === "" ||
          newPostData.contents === undefined ||
          newPostData.contents === ""
        ) {
          res.status(400).json({
            errorMessage: "Please provide title and contents for the post.",
          });
          return;
        }

        DB.update(id, newPostData)
          .then(() => {
            res.status(200).json({ ...post[0], ...newPostData });
          })
          .catch(() => {
            res
              .status(500)
              .json({ error: "The post information could not be modified." });
          });
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
