import { BrowserRouter, Routes, Route } from "react-router-dom"
import StartPage from "./pages/StartPage";
import QuizPage from "./pages/QuizPage";
import Congratulation from './components/Congratulation.jsx';
import "./App.css";

function App() {

  return (
   
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
    </BrowserRouter>
 )
}

export default App
