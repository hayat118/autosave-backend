var express = require("express");
const { post } = require(".");
const app = require("../app");
const Post = require("../models/blogPost");
var router = express.Router();

var BlogPost = require("../models/blogPost");

// Create new blog post
router.post("/", async (req, res) => {
  const { content, title } = req.body;

  try {
    const blogPost = new BlogPost({ content, title });
    var savedPost = await blogPost.save();
    return res.json({ blogPost: savedPost });
  } catch (error) {
    console.error("Create post error:", error);
    return res.status(400).json({ message: "Failed to create post" });
  }
});

// find post
router.get("/", async (req, res) => {
  try {
    const blogPosts = await BlogPost.find({});
    return res.json({ blogPosts });
  } catch (error) {
    console.error("finding blog post error", error);
    res.status(400).json({ message: "Failled to retreive blog posts" });
  }
});

// get post details
router.get("/:id", async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    return res.json({ blogPost });
  } catch (error) {
    console.error("finding blog post error", error);
    res.status(400).json({ message: "Failled to retreive blog posts" });
  }
});

// Update the existing blog post

router.put("/:id", async (req, res) => {
  const postId = req.params.id;
  const { content, title } = req.body;
  try {
    const blogPost = await Post.findByIdAndUpdate(
      postId,
      { content, title },
      { new: true }
    );
    if (!blogPost) {
      throw new Error("Post not found");
    }
    return res.json({ blogPost });
  } catch (error) {
    console.error("Update post error:", error);
  }
});

// Delete a blog post
router.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const blogPost = await Post.findByIdAndDelete(postId);
    if (!blogPost) {
      throw new Error("Post not found");
    }
    return res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post" });
  }
});

module.exports = router;
