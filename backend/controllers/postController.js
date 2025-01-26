const Post = require("../models/post");
const { cloudinary } = require("../utils/upload");

const createPost = async (req, res) => {
  try {
    console.log("Request file:", req.file); // Add this
    console.log("Request body:", req.body);
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "posts" }
    );

    const post = await Post.create({
      caption: req.body.caption,
      imageUrl: result.secure_url,
      user: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name").sort("-createdAt");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, // Ensure user owns post
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }

    // Delete image from Cloudinary
    const publicId = post.imageUrl.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`posts/${publicId}`);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
};
