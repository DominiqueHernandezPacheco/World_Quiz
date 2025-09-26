import React from "react";
import { useNavigate } from "react-router-dom";
import StarsBackground from "../components/StarsBackground";
import "./../StartPage.css";  // ✅ corregido

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="startpage">
      <StarsBackground />
      <div className="startpage-content">
        <h1>The World Quiz for dummies 🌍</h1>
        <p>not so dumb dummies</p>
        <button onClick={() => navigate("/quiz")}>Start</button>
      </div>
    </div>
  );
};

export default StartPage;
