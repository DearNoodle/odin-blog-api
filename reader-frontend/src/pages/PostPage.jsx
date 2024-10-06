import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { apiUrl, UserIdContext } from "../App";
import axios from "axios";

function PostPage() {
  const navigate = useNavigate();
  const { userId } = useContext(UserIdContext);
  const { postId } = useParams();
  const [post, setPost] = useState();

  const [comments, setComments] = useState([]);

  const [isWritingComment, setIsWritingComment] = useState(false);
  const [content, setContent] = useState("");

  async function fetchPost() {
    try {
      const response = await axios.get(`${apiUrl}/post/${postId}`, {
        withCredentials: true,
      });
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }

  async function fetchComments() {
    try {
      const response = await axios.get(`${apiUrl}/post/${postId}/comments`, {
        withCredentials: true,
      });
      if (response.data.length) {
        setComments(response.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }
  // CreateNewComment testing incomplete without making post data
  async function CreateNewComment(event) {
    event.preventDefault();

    try {
      await axios.post(
        `${apiUrl}/comment`,
        {
          content,
          userId,
          postId,
        },
        {
          withCredentials: true,
        }
      );
      await fetchComments();
      console.log("Add Comment Successful");
    } catch (error) {
      console.error(error);
    }
    setIsWritingComment(false);
  }

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
    fetchPost();
    fetchComments();
  }, [postId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/user"
        className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Go Back
      </Link>

      {post && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700">{post.content}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {isWritingComment ? (
          <form onSubmit={CreateNewComment}>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="3"
              placeholder="Write your comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Send
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsWritingComment(true)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Write a Comment
          </button>
        )}

        <ul className="mt-4">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-800">{comment.content}</p>
                <p className="text-sm text-gray-600 mt-2">
                  by{" "}
                  <span className="font-medium">{comment.user.username}</span>{" "}
                  on {formatDate(comment.createdAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostPage;
