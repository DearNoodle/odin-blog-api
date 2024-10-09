import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl, UserIdContext } from "../App";
import axios from "axios";

function PostList() {
  const navigate = useNavigate();
  const { userId } = useContext(UserIdContext);
  const [posts, setPosts] = useState([]);

  const [isWritingPost, setIsWritingPost] = useState(false);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [isPublished, setIsPublished] = useState();

  async function fetchPosts() {
    try {
      const response = await axios.get(`${apiUrl}/user/posts`, {
        withCredentials: true,
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async function createPost(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${apiUrl}/post`,
        {
          title,
          content,
          published: isPublished,
        },
        {
          withCredentials: true,
        }
      );

      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async function deletePost(postId) {
    try {
      await axios.delete(`${apiUrl}/post/${postId}`, {
        withCredentials: true,
      });
      await fetchPosts();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
    fetchPosts();
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Posts</h1>
      {posts.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <li key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="mb-2">{post.content}</p>
              <div className="text-gray-600 text-sm mb-4">
                <p>Created at: {formatDate(post.createdAt)}</p>
                <p>Published: {post.published ? "Yes" : "No"}</p>
              </div>
              <div className="flex space-x-3">
                <Link
                  to={`/edit-post/${post.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                >
                  Edit Post
                </Link>
                <button
                  onClick={() => deletePost(post.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
                >
                  Delete Post
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">You have no posts yet.</p>
      )}

      <div className="mt-8 text-center">
        {isWritingPost ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={createPost}>
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
                  onChange={(e) => setContent(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="mr-2"
                />
                <label
                  htmlFor="published"
                  className="text-gray-700 font-medium"
                >
                  Published
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
                >
                  Create Post
                </button>
                <button
                  onClick={() => setIsWritingPost(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setIsWritingPost(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Write New Post
          </button>
        )}
      </div>
    </div>
  );
}

export default PostList;
