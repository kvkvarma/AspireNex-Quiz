import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { SyncLoader } from "react-spinners";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let number = location.state || 0;
  number = number + 1;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [questionNo, setQuestionNo] = useState(1);
  const value = "Quiz - " + number.toString();
  const [quizNumber, setQuizNumber] = useState(value);
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [crtAnswer, setCrtAnswer] = useState("");

  const [loader, setLoader] = useState(true);
  const [topicPage, setTopicPage] = useState(true);
  const [topic, setTopic] = useState("");
  const [questionsArray, setQuestionsArray] = useState([]);
  const [quesNo, setQuesNo] = useState(1);  

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(questionNo < 5 && isSubmitted){
      alert('Enter minimum 5 quuestions 👍');
      insertQuestion(e);
      setIsSubmitted(false)
    }
    else if(isSubmitted && questionNo>=5){
      submitFired(e);
    }
  }

  const insertQuestion = (e) => {
    e.preventDefault();
    setQuesNo(quesNo + 1);
    const newQuestion = {
      quizNumber: capitalize(quizNumber),
      questionNo: questionNo,
      question: capitalize(question),
      opt1: capitalize(option1),
      opt2: capitalize(option2),
      opt3: capitalize(option3),
      opt4: capitalize(option4),
      crtAnswer: capitalize(crtAnswer),
      topic: capitalize(topic),
    };

    setQuestionsArray((prevList) => {
      const updatedList = [...prevList, newQuestion];
      console.log(updatedList);
      return updatedList;
    });

    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCrtAnswer("");
    setQuestionNo((prevNo) => prevNo + 1);
  };

  const submitFired = async (e) => {
    setQuesNo(quesNo + 1);
    e.preventDefault();
    navigate("/");
    const newQuestion = {
      quizNumber: capitalize(quizNumber),
      questionNo: questionNo,
      question: capitalize(question),
      opt1: capitalize(option1),
      opt2: capitalize(option2),
      opt3: capitalize(option3),
      opt4: capitalize(option4),
      crtAnswer: capitalize(crtAnswer),
      topic: capitalize(topic),
    };

    const updatedQuestionsArray = [...questionsArray, newQuestion];

    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCrtAnswer("");
    setQuestionNo((prevNo) => prevNo + 1);
      for (let question of updatedQuestionsArray) {
        try {
          const { data, error } = await supabase
            .from("quiz")
            .insert({
              quizno: question.quizNumber,
              questionid: question.questionNo,
              question: question.question,
              opt1: question.opt1,
              opt2: question.opt2,
              opt3: question.opt3,
              opt4: question.opt4,
              crtanswer: question.crtAnswer,
              topic: question.topic,
            })
            .single();

          if (error) throw error;
        } catch (error) {
          console.log(error);
        }
      }
      
    };

  const editLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  };

  useEffect(() => {
    editLoader();
  }, []);

  if (loader) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <SyncLoader color="#6F459B" size={15} />
      </div>
    );
  } else if (topicPage) {
    return (
      <>
        <button
          onClick={() => navigate("/")}
          className="absolute px-4 font-bold text-white sm:hover:bg-red-600 py-2 rounded-md top-4 right-4 bg-red-500 sm:hover:scale-105 duration-200"
        >
          Exit
        </button>
        <div
          className="min-h-screen flex justify-center items-center bg-cover"
          style={{ backgroundImage: "url('/bgimage.jpg')" }}
        >
          <div className="bg-white p-10 shadow-md shadow-gray-600 rounded-lg w-full sm:max-w-md ml-5 mr-5">
            <div className="text-center mb-4 font-bold">Topic</div>
            <form
              className="flex flex-col sm:flex-row justify-center items-center"
              onSubmit={(e) => {
                e.preventDefault();
                setTopicPage(false);
              }}
            >
              <input
                required
                type="text"
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic name"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 sm:mb-0 sm:mr-2 md:w-full focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-defaultColor text-white font-bold py-2 px-4 rounded-lg shadow-md sm:hover:bg-hoverColor focus:outline-none"
              >
                Done
              </button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div
        className="bg-gray-700 flex items-center justify-center h-screen"
        style={{ backgroundImage: "url('/bgimage.jpg')" }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-900">
            Create Quiz
          </h1>
          <form
            onSubmit={isSubmitted ? handleSubmit:insertQuestion}
            className="bg-white p-6 rounded-lg shadow-md sm:mb-10"
          >
            <div className="mb-4">
              <label
                htmlFor="question"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Question {quesNo}
              </label>
              <input
                required
                type="text"
                id="question"
                name="question"
                placeholder="Enter your question"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-md"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="option1"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Option 1
                </label>
                <input
                  required
                  type="text"
                  id="option1"
                  name="option1"
                  placeholder="Option 1"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-400"
                  value={option1}
                  onChange={(e) => setOption1(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="option2"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Option 2
                </label>
                <input
                  required
                  type="text"
                  id="option2"
                  name="option2"
                  placeholder="Option 2"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={option2}
                  onChange={(e) => setOption2(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="option3"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Option 3
                </label>
                <input
                  required
                  type="text"
                  id="option3"
                  name="option3"
                  placeholder="Option 3"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={option3}
                  onChange={(e) => setOption3(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="option4"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Option 4
                </label>
                <input
                  required
                  type="text"
                  id="option4"
                  name="option4"
                  placeholder="Option 4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  onChange={(e) => setOption4(e.target.value)}
                  value={option4}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="answer"
                className="block text-gray-700 text-sm font-bold mt-3"
              >
                Answer
              </label>
              <input
                required
                type="text"
                id="answer"
                name="answer"
                placeholder="Enter the correct answer..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                onChange={(e) => setCrtAnswer(e.target.value)}
                value={crtAnswer}
              />
            </div>
            <div className="flex justify-around">
              <div>
                <button
                  type="submit"
                  className="bg-defaultColor sm:hover:bg-hoverColor text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                >
                  Next
                </button>
              </div>
              <div>
                <button
                  onClick={() => setIsSubmitted(true)}
                  className="bg-defaultColor sm:hover:bg-hoverColor text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="bg-red-500 sm:hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline sm:hover:scale-105"
              >
                Exit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default CreateQuiz;
