// helper/questionGenerator.js

/**
 * Función de utilidad para barajar (revolver) un array.
 * @param {Array} array - El array que se va a barajar.
 * @returns {Array} - El array barajado.
 */
function shuffleArray(array) {
  // Crea una copia para no modificar el array original.
  const newArray = [...array];
  // Algoritmo de barajado Fisher-Yates
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Función genérica y robusta para crear 4 opciones únicas para una pregunta.
 * @param {string} correctAnswer - La respuesta correcta que debe estar incluida.
 * @param {Array} optionsPool - El array de países de donde sacar opciones incorrectas.
 * @param {function} getter - Una función que extrae el dato deseado de un país (ej: c => c.name.common).
 * @returns {Array} - Un array de 4 opciones únicas y barajadas.
 */
function generateUniqueOptions(correctAnswer, optionsPool, getter) {
  // 1. Usamos un Set para garantizar que las opciones sean siempre únicas.
  const optionsSet = new Set([correctAnswer]);

  // 2. Filtramos el pool de opciones para solo usar países que tengan el dato que necesitamos.
  //    Esto evita botones vacíos o con datos extraños.
  const validOptionsPool = optionsPool.filter(country => {
    const value = getter(country);
    // Un valor es válido si existe y no es la respuesta correcta (para no añadirla dos veces).
    return value && value !== correctAnswer;
  });

  // 3. Barajamos el pool válido para que las opciones incorrectas sean diferentes cada vez.
  const shuffledPool = shuffleArray(validOptionsPool);

  // 4. Llenamos el Set con opciones del pool barajado hasta tener 4.
  for (const country of shuffledPool) {
    if (optionsSet.size >= 4) {
      break; // Salimos del bucle si ya tenemos 4 opciones.
    }
    const optionValue = getter(country);
    if (optionValue) {
      optionsSet.add(optionValue);
    }
  }

  // 5. Convertimos el Set de nuevo a un array y lo barajamos una última vez.
  return shuffleArray(Array.from(optionsSet));
}

/**
 * Genera un objeto de pregunta completo, validando los datos y asegurando opciones únicas.
 * @param {Array} quizCountries - La lista de 10 países para las preguntas.
 * @param {Array} quizOptions - La lista de 30 países para generar opciones incorrectas.
 * @param {number} index - El índice de la pregunta actual.
 * @returns {object|null} - El objeto de la pregunta o null si no se puede generar.
 */
export function generateQuestion(quizCountries, quizOptions, index = 0) {
  if (!quizCountries || !quizCountries.length || !quizOptions || !quizOptions.length) {
    return null;
  }

  const country = quizCountries[index];

  // 1. Determinar qué tipos de pregunta son VÁLIDOS para el país actual.
  const possibleTypes = [];
  if (country.flags && country.flags.svg) {
    possibleTypes.push('flag');
  }
  if (country.capital && country.capital[0]) {
    possibleTypes.push('capital');
  }
  if (country.languages && Object.values(country.languages).length > 0) {
    possibleTypes.push('language');
  }

  // Si por alguna razón un país no es válido para ninguna pregunta, salimos.
  if (possibleTypes.length === 0) {
    // En una app real, podrías intentar con el siguiente país o mostrar un error.
    return generateQuestion(quizCountries, quizOptions, index + 1);
  }

  // 2. Elegir un tipo de pregunta al azar de la lista de tipos VÁLIDOS.
  const type = possibleTypes[Math.floor(Math.random() * possibleTypes.length)];

  // 3. Preparar las variables que se llenarán en el switch.
  let questionText = "";
  let answer = "";
  let options = [];
  let flag = "";

  // 4. Construir la pregunta basándose en el tipo elegido.
  switch (type) {
    case "capital":
      answer = country.capital[0];
      questionText = `¿Cuál es la capital de ${country.name.common}?`;
      options = generateUniqueOptions(answer, quizOptions, c => c.capital ? c.capital[0] : null);
      break;

    case "language":
      answer = Object.values(country.languages)[0];
      questionText = `¿Qué idioma se habla en ${country.name.common}?`;
      options = generateUniqueOptions(answer, quizOptions, c => c.languages ? Object.values(c.languages)[0] : null);
      break;

    case "flag":
    default: // 'default' asegura que siempre se genere una pregunta si algo falla.
      answer = country.name.common;
      questionText = '¿A qué país pertenece esta bandera?';
      flag = country.flags.svg; // Usamos SVG para mejor calidad.
      options = generateUniqueOptions(answer, quizOptions, c => c.name.common);
      break;
  }

  // 5. Devolver el objeto de pregunta final.
  return {
    type,
    question: questionText,
    options,
    answer,
    flag,
  };
}