const express = require("express");

const router = express.Router();

const BlogPost = require("../models/blogPost");

// Routes
router.get("/", (req, res) => {
  BlogPost.find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
});

// POST Request - save data in database
router.post("/save", (req, res) => {
  const data = req.body;

  const newBlogPost = new BlogPost(data);

  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({
        msg: "Internal Server Error! Data NOT Saved!",
      });
      return;
    }

    return res.json({
      msg: "Data Saved!!",
    });
  });
});

router.get("/name", (req, res) => {
  const data = {
    username: "niiiiiice",
    age: 2,
  };
  res.json(data);
});

module.exports = router;
