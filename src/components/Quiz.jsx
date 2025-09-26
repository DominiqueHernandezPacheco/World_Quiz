import React, { useState, useEffect } from "react";
import useQuestionQuizPool from "../hooks/useQuestionQuizPool";
import { generateQuestion } from "../helpers/questionGenerator";
import Question from "./Question";
import Congratulation from "./Congratulation";

export default function Quiz() {
  // --- ESTADO DEL COMPONENTE ---
  const { quizCountries, quizOptions } = useQuestionQuizPool();
  
  // Estados para la lógica del quiz
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  
  // Estados para manejar el final del quiz
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  // --- EFECTO PARA GENERAR PREGUNTAS ---
  useEffect(() => {
    // Genera las 10 preguntas una sola vez cuando los datos están listos.
    if (quizCountries.length && quizOptions.length && questions.length === 0) {
      const generated = quizCountries.map((_, index) =>
        generateQuestion(quizCountries, quizOptions, index)
      );
      setQuestions(generated);
    }
  }, [quizCountries, quizOptions, questions]);

  // Muestra un mensaje de carga mientras se preparan las preguntas.
  if (!questions.length) {
    return <p style={{ color: 'white', fontSize: '1.2rem' }}>Cargando preguntas...</p>;
  }


  // --- MANEJADORES DE EVENTOS ---
  
  /**
   * Se ejecuta cuando el usuario selecciona una respuesta.
   */
  const handleAnswer = (option) => {
    // No permitir cambiar la respuesta si ya se mostró el resultado.
    if (showResult) return; 
    
    setSelected(option);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);
    setShowResult(true); // Muestra si la respuesta fue correcta o incorrecta.
  };

  /**
   * Se ejecuta al hacer clic en "Siguiente" o "Terminar".
   */
  const handleNext = () => {
    setShowResult(false);
    setSelected(null);

    // Si aún quedan preguntas, avanza al siguiente índice.
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Si es la última pregunta, calcula el puntaje y termina el quiz.
      const finalScore = questions.reduce(
        (acc, q, idx) => acc + (answers[idx] === q.answer ? 1 : 0),
        0
      );
      setScore(finalScore);
      setQuizFinished(true); // Activa la pantalla de felicitaciones.
    }
  };

  /**
   * Se ejecuta al hacer clic en "Jugar de Nuevo" en la pantalla de felicitaciones.
   */
  const handleRestart = () => {
    // La forma más fácil y segura de reiniciar es recargar la página.
    // Esto asegura que se pidan nuevas preguntas y todo el estado se limpie.
    window.location.reload();
  };


  // --- RENDERIZADO DEL COMPONENTE ---
  
  return (
    <>
      {quizFinished ? (
        // Si el quiz ha terminado, muestra la pantalla de felicitaciones.
        <Congratulation 
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      ) : (
        // Si el quiz está en curso, muestra el contenedor del quiz.
        <div className="quiz-container">
          {/* Barra de Progreso */}
          <div className="number-question">
            {questions.map((_, idx) => {
              let questionClass = 'question-section';
              if (idx === currentIndex) questionClass += ' active';
              else if (answers[idx] !== undefined) questionClass += ' answered';
              return (
                <div key={idx} className={questionClass}>
                  {idx + 1}
                </div>
              );
            })}
          </div>

          {/* Componente de Pregunta y Opciones */}
          <Question
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
            selected={selected}
            showResult={showResult}
          />

          {/* Botón de Siguiente/Terminar */}
          <div className="next-button-container">
            {/* Solo muestra el botón después de que el usuario ha respondido */}
            <button onClick={handleNext} disabled={!showResult}>
                {currentIndex < questions.length - 1 ? 'Siguiente' : 'Terminar'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}