import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl, UserIdContext } from "../App";
import PostList from "../components/PostList";
import axios from "axios";

function UserPage() {
  const navigate = useNavigate();
  const { setUserId } = useContext(UserIdContext);
  async function handleLogout(event) {
    event.preventDefault();
    try {
      await axios.post(`${apiUrl}/logout`, null, {
        withCredentials: true,
      });
      setUserId(null);
      navigate("/");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-6">
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Logout
          </button>
        </form>
      </div>
      <PostList />
    </div>
  );
}

export default UserPage;
