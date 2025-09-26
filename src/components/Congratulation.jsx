import React from 'react';
import '../Congratulation.css';

const Congratulation = ({ score, totalQuestions, onRestart }) => {
  // Calculamos el porcentaje para mostrarlo
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    // Capa oscura que cubre toda la pantalla
    <div className="congrats-overlay">
      {/* La tarjeta de resultados en sí */}
      <div className="congrats-card">
        <div className="congrats-icon">🏆</div>
        
        <h2>¡Felicitaciones!</h2>
        <p className="congrats-subtitle">Has completado el quiz.</p>
        
        {/* Sección para mostrar el puntaje */}
        <div className="congrats-score">
          <p>Tu puntaje</p>
          <span>{score} / {totalQuestions}</span>
        </div>
        
        <p className="congrats-percentage">
          Acertaste el {percentage}% de las preguntas.
        </p>
        
        {/* El botón para jugar de nuevo */}
        <button className="congrats-button" onClick={onRestart}>
          Jugar de Nuevo
        </button>
      </div>
    </div>
  );
};

export default Congratulation;