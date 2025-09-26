import React from "react";
import "./../StarsBackground.css"; // ✅ corregido

const StarsBackground = () => (
  <div className="stars-background">
    <div className="stars"></div>
    <div className="shooting-star"></div>
    <div className="shooting-star"></div>
    <div className="shooting-star"></div>
  </div>
);

export default StarsBackground;
