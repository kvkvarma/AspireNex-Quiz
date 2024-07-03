import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {supabase} from "../supabaseClient"

//w1pjBhkbvvAwIDmN

const CreateQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const number = location.state || 0;

  const[questionNo,setQuestionNo] = useState(1);
  const value = "quiz" + number.toString();
  const [quizNumber,setQuizNumber] = useState(value);
  const [question,setQuestion] = useState('');
  const[option1,setOption1] = useState('');
  const[option2,setOption2] = useState('');
  const[option3,setOption3] = useState('');
  const[option4,setOption4] = useState('');
  const[crtAnswer,setCrtAnswer] = useState('');

const insertQuestion = async (e) => {
  e.preventDefault();
  try {
    const { data, error } = await supabase
      .from('quiz')
      .insert({
        quizno: quizNumber,
        questionid: questionNo,
        question: question,
        opt1: option1,
        opt2: option2,
        opt3: option3,
        opt4: option4,
        crtanswer: crtAnswer,
      })
      .single();

    if (error) throw error;
  } catch (error) {
   console.log(error)
  }
  setQuestion('');
  setOption1('');
  setOption2('');
  setOption3('');
  setOption4('');
  setCrtAnswer('');
  let num = questionNo+1;
  setQuestionNo(num)
};

  return (
    <div className="bg-gray-700 flex items-center justify-center h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Create Quiz
        </h1>
        <form className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label
              htmlFor="question"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Question
            </label>
            <input
              type="text"
              id="question"
              name="question"
              placeholder="Enter your question..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-md"
              value={question}
              onChange={(e)=>setQuestion(e.target.value)}
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
                type="text"
                id="option1"
                name="option1"
                placeholder="Option 1..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-400"
                value={option1}
                onChange={(e)=>setOption1(e.target.value)}
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
                type="text"
                id="option2"
                name="option2"
                placeholder="Option 2..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={option2}
                onChange={(e)=>setOption2(e.target.value)}
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
                type="text"
                id="option3"
                name="option3"
                placeholder="Option 3..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={option3}
                onChange={(e)=>setOption3(e.target.value)}
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
                type="text"
                id="option4"
                name="option4"
                placeholder="Option 4..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e)=>setOption4(e.target.value)}
                value={option4}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="answer"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Answer
            </label>
            <input
              type="text"
              id="answer"
              name="answer"
              placeholder="Enter the correct answer..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e)=>setCrtAnswer(e.target.value)}
              value={crtAnswer}
            />
          </div>  
          <div className="flex justify-around">
          <div>
            <button onClick={insertQuestion}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Done
            </button>
          </div>
          <div >
            <button onClick={()=>{navigate('/',{state:{newId:321,newName:'sdssdvdadasa',newTopic:'sasadada'}})}}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
          </div>
          <div className="absolute top-4 right-4">
            <button
              onClick={() => navigate("/")}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline lg:hover:scale-105"
            >
              Exit
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
