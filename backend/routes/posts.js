import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByAuthor
} from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const posts = getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const post = getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post", error: err.message });
  }
});

router.post("/", authMiddleware, (req, res) => {
  try {
    const { title, content } = req.body;
    const post = createPost(title, content, req.user.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  try {
    const post = getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author_id !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    const { title, content } = req.body;
    const updatedPost = updatePost(req.params.id, title, content);
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err.message });
  }
});

router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const post = getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author_id !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    deletePost(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err.message });
  }
});

export default router;
