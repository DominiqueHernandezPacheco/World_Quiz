import { useState, useEffect } from "react";
import { fetchCountries } from "../api/Countries";

export default function useQuestionQuizPool() {
  // constante de estado
  const [quizCountries, setQuizCountries] = useState([]);
  const [quizOptions, setQuizOptions] = useState([]);
  
  useEffect(() => {
    async function getData() {
      const {quizCountries, quizOptions} = await fetchCountries();
      
      setQuizCountries(quizCountries);
      setQuizOptions(quizOptions);

      console.log("Quiz countries:", quizCountries);
      console.log ("Opciones:", quizOptions);
    }

    getData();
  }, []);

return{quizCountries, quizOptions};

}


