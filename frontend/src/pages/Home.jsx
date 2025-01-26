/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { postAPI } from "../utils/api";

const PostCard = ({ post }) => {
  const isNew = Date.now() - new Date(post.createdAt) < 24 * 60 * 60 * 1000;

  return (
    <div className="card bg-base-100 hover:scale-105 hover:shadow-2xl transition-all">
      <figure className="relative">
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="w-full h-64 object-cover"
        />
        {isNew && (
          <div className="absolute top-2 right-2">
            <span className="badge badge-secondary">NEW</span>
          </div>
        )}
      </figure>

      <div className="card-body">
        <p className="font-medium text-lg">{post.caption}</p>
        <div className="text-sm opacity-75">
          <p>Posted by {post.user.name}</p>
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postAPI.getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Hello! Enjoy your and your friends&apos; posts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
