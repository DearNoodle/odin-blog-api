import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { apiUrl, UserIdContext } from "../App";
import axios from "axios";

function PostPage() {
  const navigate = useNavigate();
  const userId = useContext(UserIdContext);
  const { postId } = useParams();
  const [post, setPost] = useState({
    id: 123,
    title: "test post",
    content: "some content",
    published: true,
    authorId: 112233,
  });

  const [comments, setComments] = useState([
    { id: 321, content: "test comment", userId: 112233, postId: 123 },
    {
      id: 4321,
      content: "test comment 2",
      userId: "e1b79dc6-b960-476b-8afd-2d338de1b418",
      postId: 123,
    },
  ]);

  const [isWritingComment, setIsWritingComment] = useState(false);
  const [content, setContent] = useState("");

  async function fetchPost() {
    try {
      const response = await axios.get(`${apiUrl}/post/${postId},`, {
        withCredentials: true,
      });
      if (response.data) {
        setPost(response.data);
      }
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

  return (
    <div>
      <Link to="/user">Go Back</Link>
      <h1>Post</h1>
      {post && (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </>
      )}

      <h1>Comments</h1>
      {isWritingComment ? (
        <form action="" method="get" onSubmit={CreateNewComment}>
          <input
            type="text"
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      ) : (
        <button
          onClick={() => {
            setIsWritingComment(true);
          }}
        >
          Write a Comment
        </button>
      )}

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostPage;
