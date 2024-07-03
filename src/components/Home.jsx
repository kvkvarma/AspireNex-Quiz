import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { MdOutlineAdd } from 'react-icons/md';
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [quizList, setQuizList] = useState([]);
  const getDistinctQuizzes = async()=>{
    try{
      const{data,error} = await supabase.from('quiz').select("*");
      if(error) 
          throw error;
      const distinctQuiz = data.reduce((acc,current)=>{
          const x = acc.find(item => item.quizno === current.quizno);
          if(!x){
            return acc.concat([current]);
          }
          else{
            return acc;
          }
      },[])
    setQuizList(distinctQuiz)
    console.log(quizList)
  }
  catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getDistinctQuizzes();
  },[])

  return (
    <>
      
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">Quizz</div>
          <div className="ml-auto">
            <button
              onClick={() => {
                navigate("/createquiz", { state: quizList.length });
              }}
              className="bg-white border-2 flex items-center border-green-600 text-green-500 font-bold py-2 px-4 rounded-md shadow-lgfocus:outline-none hover:border-white focus:shadow-outline md:hover:text-white md:hover:bg-green-500 md:hover:scale-105 md:duration-200 "
            >
              <MdOutlineAdd size={20} className="mr-1" />
              Create Quiz
            </button>
          </div>
        </div>
      </nav>

      {quizList.map(({ id, quizno, question }) => (
        <div key={id} className="w-full mt-8 px-5 lg:px-60 sm:px-24">
          <div className="w-full h-20 bg-green-500 rounded-lg shadow-md p-4 flex justify-between items-center">
            <div className="text-lg font-bold">{quizno}</div>
            <div className="text-lg font-bold">Topic: {question}</div>
            <button onClick={()=>navigate('/attemptquiz',{state:quizno})} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
              Start Quiz
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
