import React from "react";
import { apiUrl } from "../App";
import PostList from "../components/PostList";
import axios from "axios";

function UserPage() {
  async function handleLogout(event) {
    event.preventDefault();
    try {
      await axios.post(`${apiUrl}/logout`, null, {
        withCredentials: true,
      });
      navigate("/");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return (
    <div>
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
      <PostList />
    </div>
  );
}

export default UserPage;
