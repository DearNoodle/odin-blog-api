import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import axios from "axios";

export const apiUrl = "https://odin-blog-api-production-225a.up.railway.app";
export const UserIdContext = createContext(null);

function App() {
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUserId() {
    try {
      const response = await axios.get(`${apiUrl}/user`, {
        withCredentials: true,
      });
      setUserId(response.data.userId);
      console.log(response.data.userId);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserId();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route
            path="/login"
            element={<LoginPage fetchUserId={fetchUserId} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/edit-post/:postId" element={<EditPostPage />} />
        </Routes>
      </BrowserRouter>
    </UserIdContext.Provider>
  );
}

export default App;
