import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateQuiz from "./components/CreateQuiz";
import AttemptQuiz from "./AttemptQuiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createquiz" element={<CreateQuiz/>} />
        <Route path="/attemptquiz" element={<AttemptQuiz/>} />
      </Routes>
    </Router>
  );
}

export default App;
