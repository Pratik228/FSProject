import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { postAPI } from "../../utils/api";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { handleError, user } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostCreate = (newPost) => {
    // Add user info to new post
    const postWithUser = {
      ...newPost,
      user: {
        _id: user._id,
        name: user.name,
      },
    };
    setPosts((prev) => [postWithUser, ...prev]);
  };

  const loadPosts = async () => {
    try {
      const response = await postAPI.getPosts();
      setPosts(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await postAPI.deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <PostForm onPostCreate={handlePostCreate} />
      <h2 className="text-xl font-bold mt-6">Your Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
