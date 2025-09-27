import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function WelcomePage() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Trigger fade-out after 3 seconds
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 2200);

    // Navigate after fade-out finishes (0.5s later)
    const timer2 = setTimeout(() => {
      navigate("/home"); 
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <div className={`welcome-container ${fadeOut ? "fade-out" : ""}`}>
      <div className="overlay"></div>
      <div className="welcome-content">
        <h1 className="main-title">TRENDS FOR YOU</h1>
        <p className="subtitle">Discover. Shop. Shine </p>
      </div>
    </div>
  );
}

export default WelcomePage;
