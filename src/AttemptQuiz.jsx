import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";

const AttemptQuiz = () => {
  const location = useLocation();
  const quizNo = location.state || "";
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (currentQuestionIndex === questions.length - 2) {
        setShowSubmit(true);
      }
    } else {
      alert('You have completed the quiz!');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex >= 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowSubmit(false)
    }
  };

  const getData = async () => {
    try {
      const { data, error } = await supabase
        .from("quiz")
        .select("*")
        .eq("quizno", quizNo);
      if (error) console.log(error);
      if (data != null) setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full relative">
        {currentQuestion && (
          <div>
            <button
              onClick={() => navigate("/")}
              className="absolute top-4 right-4 py-1 px-3 rounded-lg bg-red-500 text-white hover:bg-red-700 focus:outline-none"
            >
              x
            </button>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Question {currentQuestionIndex + 1}
            </h1>
            <p className="text-lg mb-6 text-gray-700">{currentQuestion.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button className="bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none">
                {currentQuestion.opt1}
              </button>
              <button className="bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none">
                {currentQuestion.opt2}
              </button>
              <button className="bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none">
                {currentQuestion.opt3}
              </button>
              <button className="bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none">
                {currentQuestion.opt4}
              </button>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-900 focus:outline-none"
              >
                Prev
              </button>
              <button
                onClick={showSubmit ? handleNext : handleNext}
                className="bg-green-500 text-white py-4 px-6 rounded-lg hover:bg-green-700 focus:outline-none"
              >
                {showSubmit ? "Next" : "Submit"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttemptQuiz;
