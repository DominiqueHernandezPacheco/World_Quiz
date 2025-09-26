import axios from "axios";

export async function fetchCountries() {

    try {
       const res = await axios.get("https://restcountries.com/v3.1/all?fields=name,capital,languages,flags");
    
       const allCountries=res.data;

       const shuffled=allCountries.sort(()  => 0.5 - Math.random());
       
       const quizCountries=shuffled.slice(0,10);
       const quizOptions=shuffled.slice(10,40);
       
       return{quizCountries, quizOptions};
    } catch (error) {
        console.error("Error al traer los paises:", error);
        return {quizCountries:[], quizOptions:[]};
    }
    
}


