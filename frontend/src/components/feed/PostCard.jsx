/* eslint-disable react/prop-types */
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const PostCard = ({ post, onDelete }) => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    setIsDeleting(true);
    await onDelete(id);
    setIsDeleting(false);
  };

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

        {user?._id === post.user._id && (
          <div className="card-actions justify-end mt-2">
            <button
              className={`btn btn-error btn-sm ${isDeleting ? "loading" : ""}`}
              onClick={() => handleDelete(post._id)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
