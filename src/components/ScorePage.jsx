import React from 'react';
import {useLocation, useNavigate } from 'react-router-dom';

const ScorePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const score = location.state || 0;
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 bg-cover" style={{ backgroundImage: "url('/bgimage.jpg')"  }}>
            <div className="bg-white max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
                <div className="p-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Congratulations!🎉🎉</h2>
                    <div className="text-2xl text-center mb-6">Score: {score}</div>
                    <button
                        onClick={() => navigate('/')}
                        className="block w-full bg-defaultColor sm:hover:bg-hoverColor sm:hover:scale-105 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                        Exit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScorePage;
