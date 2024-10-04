import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl, UserIdContext } from "../App";
import axios from "axios";

function PostList() {
  const navigate = useNavigate();
  const userId = useContext(UserIdContext);
  const [posts, setPosts] = useState([
    {
      id: 123,
      title: "test post",
      content: "some content",
      published: true,
      authorId: 112233,
    },
  ]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`, {
        withCredentials: true,
      });
      if (response.data.length) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>List of Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <Link to={`/post/${post.id}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
