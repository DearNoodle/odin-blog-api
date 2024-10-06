import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl, UserIdContext } from "../App";
import axios from "axios";

function PostList() {
  const navigate = useNavigate();
  const { userId } = useContext(UserIdContext);
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    try {
      const response = await axios.get(`${apiUrl}/posts`, {
        withCredentials: true,
      });
      setPosts(response.data);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Posts</h1>
      {posts.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to={`/post/${post.id}`} className="block">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 text-sm">
                    by{" "}
                    <span className="font-medium">{post.author.username}</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          No posts available yet. Stay tuned!
        </p>
      )}
    </div>
  );
}

export default PostList;
