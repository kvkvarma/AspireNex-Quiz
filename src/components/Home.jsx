import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { MdOutlineAdd } from 'react-icons/md';
import { SyncLoader } from 'react-spinners';
import { FaSearch } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";

const Home = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [quizList, setQuizList] = useState([]);
  const [searchedTopic, setSearchedTopic] = useState('');
  const [searchedList, setSearchedList] = useState([]);
  const getDistinctQuizzes = async () => {
    try {
      const { data, error } = await supabase.from('quiz').select("*").order('quizno', { ascending: true });
      if (error) throw error;

      const distinctQuiz = data.reduce((acc, current) => {
        const x = acc.find(item => item.quizno === current.quizno);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      setQuizList(distinctQuiz);
    } catch (error) {
      console.log(error);
    }
  };

  const editLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  };

  useEffect(() => {
    getDistinctQuizzes();
    editLoader();
  }, []);

  useEffect(() => {
    setSearchedList(quizList.filter(item => item.topic.toLowerCase().includes(searchedTopic.toLowerCase())));
  }, [quizList, searchedTopic]);

  if (loader) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <SyncLoader color="#6F459B" size={15} />
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-cover top-0" style={{ backgroundImage: "url('/bgimage.jpg')" }}>
        <nav className="bg-white p-4 shadow-lg fixed w-full top-0 z-10">
          <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold flex text-defaultColor">
  QUIZ PORTAL 
  <FaGraduationCap style={{ marginTop: '-5px', marginLeft: '-7px', transform: 'rotate(25deg)' }} />
</div>

            <div className="ml-auto">
              <button
                onClick={() => {
                  navigate("/createquiz", { state: quizList.length });
                }}
                className="bg-defaultColor text-white font-bold py-2 px-4 rounded-md flex items-center shadow-m focus:outline-none transition duration-200 sm:hover:bg-hoverColor sm:hover:scale-105"
              >
                <MdOutlineAdd size={20} className="mr-1" />
                Create Quiz
              </button>
            </div>
          </div>
        </nav>
    
        <div className="pt-16">
          <div className="container flex justify-center items-center mx-auto my-8">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchedTopic(e.target.value)}
              className="border rounded p-2 w-96 mx-1 shadow-md focus:border-blue-500 focus:outline-none transition duration-300 h-12 ml-6 mr-2 "
            />
            <button
              onClick={() => setSearchedList(quizList.filter(item => item.topic.toLowerCase().includes(searchedTopic.toLowerCase())))}
              className="bg-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md sm:hover:bg-purple-600 focus:outline-none transition duration-300 mr-6 "
            >
              <FaSearch size={20}/>
            </button>
          </div>
    
          <div className="container mx-auto px-5 lg:px-48 sm:px-16">
  {searchedList.map(({ id, quizno, topic }) => (
    <div key={id} className="w-full mt-8">
    <div className="w-full h-44 flex flex-col sm:flex-row sm:h-28 border border-defaultColor rounded-lg shadow-2xl p-4 sm:p-4 sm:justify-between sm:items-center bg-white transition duration-300 mb-2">
      <div>
        <div className="mt-1 text-lg font-bold text-purple-900">{quizno}</div>
        <div className="mt-1 font-light text-hoverColor">Time: 15 min</div>
      </div>
      <div className="mt-1 text-defaultColor justify-end font-semibold mb-1">{topic}</div>
      <button
        onClick={() => navigate('/attemptquiz', { state: quizno })}
        className="mt-1 bg-defaultColor border-b-4 border-hoverColor w-full sm:w-32 text-white font-bold py-2 px-4 rounded-md sm:hover:bg-hoverColor sm:hover:border-defaultColor focus:outline-none transition duration-300"
      >
        Start Quiz
      </button>
    </div>
  </div>
  ))}
</div>
        </div>
      </div>
    );    
  }
};

export default Home;
