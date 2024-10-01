import React, { useState, useEffect } from "react";
import axios from "axios";
function MainPage() {
  useEffect(() => {
    const userId = axios.get("http://localhost:3000/api/user");
  }, []);
  if (userId) {
    return;
  } else {
    return;
  }
}

export default MainPage;
