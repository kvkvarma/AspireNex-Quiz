import React from "react";
import { MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const quiz = [
    {
      id:1,
      name: "Quiz1",
      topic: "games",
    },
    {
      id:2,
      name: "Quiz2",
      topic: "dance",
    },
    {
      id:3,
      name: "Quiz3",
      topic: "GK",
    },
    {
      id:4,
      name: "Quiz4",
      topic: "english",
    },
    {
      id:5,
      name: "Quiz5",
      topic: "Fitness",
    },
    {
      id:6,
      name: "Quiz6",
      topic: "Science",
    },
    {
      id:7,
      name: "Quiz7",
      topic: "Math",
    },
    {
      id:8,
      name: "Quiz",
      topic: "Coding",
    },
  ];
  const navigate = useNavigate();
  // console.log(quiz.length)
  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">Quizz</div>
          <div className="ml-auto">
            <button
              onClick={() => {
                navigate("/createquiz",{state:quiz.length});
              }}
              className="bg-white border-2 flex items-center border-green-600 text-green-500 font-bold py-2 px-4 rounded-md shadow-lgfocus:outline-none hover:border-white focus:shadow-outline md:hover:text-white md:hover:bg-green-500 md:hover:scale-105 md:duration-200 "
            >
              <MdOutlineAdd size={20} className="mr-1" />
              Create Quiz
            </button>
          </div>
        </div>
      </nav>
      {quiz.map(({ id,name, topic }) => (
        <div key={id} className="w-full mt-8 px-5 lg:px-60 sm:px-24  ">
          <div className="w-full h-20 bg-green-500 rounded-lg shadow-md p-4 flex justify-between items-center">
            <div className="text-lg font-bold">{name}</div>
            <div className="text-lg font-bold">Topic:{topic}</div>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
              Start Quiz
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
