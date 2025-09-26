import React from "react";

export default function Question({ question, onAnswer, selected, showResult }) {
  // Si por alguna razón la pregunta no ha cargado, no mostramos nada.
  if (!question) {
    return null;
  }

  /**
   * Determina qué clase CSS (correct, incorrect) debe tener cada botón.
   */
  const getButtonClass = (option) => {
    if (!showResult) {
      return "";
    }
    if (option === question.answer) {
      return "correct";
    }
    if (option === selected && option !== question.answer) {
      return "incorrect";
    }
    return "";
  };

  return (
    <>
      {/* Contenedor para la bandera */}
      <div className="flag-container">
        {question.type === "flag" && question.flag && (
          <img
            src={question.flag}
            alt="Bandera del país"
            className="flag-image"
          />
        )}
      </div>

      {/* El texto de la pregunta */}
      <h2 className="country-question">{question.question}</h2>

      {/* El contenedor de los 4 botones de respuesta */}
      <div className="posible-answers">
        {question.options.map((opt, idx) => {
          const optionLetters = ['A', 'B', 'C', 'D'];

          return (
            <button
              key={idx}
              className={getButtonClass(opt)}
              onClick={() => onAnswer(opt)}
              disabled={showResult}
            >
              <span className="option-letter">{optionLetters[idx]}</span>
              <span className="option-text">{opt}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}