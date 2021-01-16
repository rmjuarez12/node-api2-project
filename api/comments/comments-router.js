//* Import express and setup router
const express = require("express");
const router = express.Router();

//* Import the DB helper
const DB = require("../db-helpers");

//* Handle Endpoints

// POST - Create a new comment
router.post("/:id/comments", (req, res) => {
  // Get the ID from the request
  const { id } = req.params;

  // Get data from the request for comment to create
  const newComment = {
    ...req.body,
    post_id: id,
  };

  DB.findById(id)
    .then((post) => {
      if (post[0] === undefined) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        // Ensure that the request has a message
        if (newComment.text === undefined || newComment.text === "") {
          res
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." });
          return;
        }

        // Insert comment
        DB.insertComment(newComment)
          .then((comment) => {
            res.status(201).json({ ...comment, ...newComment });
          })
          .catch((err) => {
            res.status(500).json(err.message);
          });
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// GET - Get all comments of a specific post
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  DB.findById(id)
    .then((post) => {
      if (post[0] === undefined) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        DB.findPostComments(id)
          .then((comments) => {
            res.status(200).json(comments);
          })
          .catch(() => {
            res.status(500).json({
              error: "The comments information could not be retrieved.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//* Export modules
module.exports = router;
