import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { apiUrl, UserIdContext } from "../App";
import axios from "axios";

function EditPostPage() {
  const navigate = useNavigate();
  const { userId } = useContext(UserIdContext);
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  async function updatePost(event) {
    event.preventDefault();
    try {
      await axios.put(
        `${apiUrl}/post/${postId}`,
        {
          title,
          content,
          published: isPublished,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/user");
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async function fetchPost() {
    try {
      const response = await axios.get(`${apiUrl}/post/${postId}`, {
        withCredentials: true,
      });
      const post = response.data;
      setTitle(post.title);
      setContent(post.content);
      setIsPublished(post.published);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
    fetchPost();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Edit Your Masterpiece
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={updatePost}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-gray-700 font-medium mb-2"
            >
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="published" className="text-gray-700 font-medium">
              Published
            </label>
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Update Post
            </button>
            <Link
              to="/user"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md"
            >
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditPostPage;
