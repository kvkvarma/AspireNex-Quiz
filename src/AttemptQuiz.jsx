import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useAsyncError } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { SyncLoader } from "react-spinners";

const AttemptQuiz = () => {
  const location = useLocation();
  const quizNo = location.state || "";
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const [answerArray, setAnswerArray] = useState([]);
  const [crtAnswerArray, setCrtAnswerArray] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [anyOne, setAnyOne] = useState(true);
  const [loader,setLoader] = useState(true);

  const editLoader = ()=>{
      setTimeout(()=>{
          setLoader(false)
      },1000)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const answer = answerArray.find((item) => item.id === currentQuestionIndex + 1);
      setSelectedAnswer(answer ? answer.selectedAnswer : "");
      setAnyOne(!answer);
      if (currentQuestionIndex === questions.length - 2) {
        setShowSubmit(true);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex >= 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const answer = answerArray.find((item) => item.id === currentQuestionIndex - 1);
      setSelectedAnswer(answer ? answer.selectedAnswer : "");
      setAnyOne(!answer);
      setShowSubmit(false);
    }
  };

  const result = () => {
    const updatedArray = questions.map((item) => ({
      id: item.questionid,
      correctAnswer: item.crtanswer,
    }));
    setCrtAnswerArray(updatedArray);
    console.log(crtAnswerArray);
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
    editLoader();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      result();
    }
  }, [questions]);

  const currentQuestion = questions[currentQuestionIndex];
  const clickedOption = (e) => {
    const selectedAnswer = e.target.value;
    setSelectedAnswer(selectedAnswer);
    setAnyOne(false);
    const isPresent = answerArray.findIndex(
      (item) => item.id === currentQuestionIndex
    );

    if (isPresent !== -1) {
      const updatedArray = answerArray.map((item) =>
        item.id === currentQuestionIndex
          ? { ...item, selectedAnswer: selectedAnswer }
          : item
      );
      setAnswerArray(updatedArray);
    } else {
      setAnswerArray([
        ...answerArray,
        { id: currentQuestionIndex, selectedAnswer: selectedAnswer },
      ]);
    }
  };

  let cnt = 0;
  const submitQuiz = (e) => {
    for (let i = 0; i < questions.length; i++) {
      if (
        answerArray[i]?.selectedAnswer.trim() ===
        crtAnswerArray[i]?.correctAnswer.trim()
      ) {
        cnt++;
      }
    }
    console.log(cnt);
    navigate('/')
  };
  if(loader){
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <SyncLoader color="#131842" size={20} />
      </div>
      </>
    );
  }
  else{
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
            <p className="text-lg mb-6 text-gray-700">
              {currentQuestion.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                value={currentQuestion.opt1}
                onClick={clickedOption}
                className={`${
                  selectedAnswer === currentQuestion.opt1
                    ? "bg-gray-400"
                    : "bg-white"
                } text-black py-4 px-6 rounded-lg hover:bg-gray-300 border-2 border-gray-500`}
              >
                {currentQuestion.opt1}
              </button>

              <button
                value={currentQuestion.opt2}
                onClick={clickedOption}
                className={`${
                  selectedAnswer === currentQuestion.opt2
                    ? "bg-gray-400"
                    : "bg-white"
                } text-black py-4 px-6 rounded-lg hover:bg-gray-300 border-2 border-gray-500`}
              >
                {currentQuestion.opt2}
              </button>

              <button
                value={currentQuestion.opt3}
                onClick={clickedOption}
                className={`${
                  selectedAnswer === currentQuestion.opt3
                    ? "bg-gray-400"
                    : "bg-white"
                } text-black py-4 px-6 rounded-lg hover:bg-gray-300 border-2 border-gray-500`}
              >
                {currentQuestion.opt3}
              </button>

              <button
                value={currentQuestion.opt4}
                onClick={clickedOption}
                className={`${
                  selectedAnswer === currentQuestion.opt4
                    ? "bg-gray-400"
                    : "bg-white"
                } text-black py-4 px-6 rounded-lg hover:bg-gray-300 border-2 border-gray-500`}
              >
                {currentQuestion.opt4}
              </button>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                className={`${anyOne ? 'cursor-not-allowed' : 'cursor-pointer'}  bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-900 focus:outline-none`}
              >
                Prev
              </button>

              <button
                disabled={anyOne}
                onClick={showSubmit ? submitQuiz : handleNext}

                className={`${
                  anyOne ? 'cursor-not-allowed' : 'cursor-pointer'
                } bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 focus:outline-none`}
              >
                {showSubmit ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
};

export default AttemptQuiz;
