import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {supabase} from "../supabaseClient"

//w1pjBhkbvvAwIDmN

const CreateQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const number = location.state || 0;
  const quizNumber = "quiz"+number.toString();
  const [quiz,setQuiz] = useState([]);
  const [quizno,setQuizno] = useState(null);

  const getQuiz = async(callback)=>{
    try{    
        const {data,error} = await supabase.from("quiz").select('*').limit(10);
        if(error) throw error;
        if(data!=null){
            setQuiz(data);
            
                callback(data[0].quizno);
            
        }
    }
    catch(error){
        alert(error.message)
    }
  }
const ans=((getNo)=>{
    console.log(getNo);
})

  useEffect(()=>{
    getQuiz(ans);//passing the callback function
},[])

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
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
          <div className="absolute top-4 right-4">
            <button
              onClick={() => navigate("/")}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline lg:hover:scale-105"
            >
              Exit
            </button>

            {/* <button onClick={insertQuestion}>Next</button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
