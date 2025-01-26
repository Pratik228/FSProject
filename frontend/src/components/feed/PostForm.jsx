/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { postAPI } from "../../utils/api";

const PostForm = ({ onPostCreate }) => {
  const [post, setPost] = useState({ caption: "", image: null });
  const { handleError, handleSuccess } = useAuth();
  const [isVisible, setIsVisible] = useState(false); // State to control visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", post.caption);
    formData.append("image", post.image);

    try {
      const response = await postAPI.createPost(formData);
      handleSuccess("Post created");
      onPostCreate(response.data); // Call the function to update the post list
      setPost({ caption: "", image: null });
      setIsVisible(false); // Hide the form after submission
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Excited to upload new world?</h2>
        <button className="btn btn-primary" onClick={() => setIsVisible(true)}>
          Upload
        </button>
      </div>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="card bg-base-100 shadow-xl p-6">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setIsVisible(false)}
            >
              ✕
            </button>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                className="file-input w-full mb-4"
                onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
              />
              <textarea
                className="textarea textarea-bordered w-full mb-4"
                placeholder="Write caption..."
                value={post.caption}
                onChange={(e) => setPost({ ...post, caption: e.target.value })}
              />
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostForm;
