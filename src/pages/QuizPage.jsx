// QuizPage.jsx
import React from "react";
import Quiz from "../components/Quiz";
import StarsBackground from "../components/StarsBackground"; // 👈 Añade esta importación
import '../QuizPage.css';

export default function QuizPage() {
  return (
    <div className="quiz-page">
      <Quiz />
    </div>
  );
}