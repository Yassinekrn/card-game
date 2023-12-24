// GameStatus.js
import React from "react";

import "../styles/GameStatus.css";

const GameStatus = ({ score, maxScore, onPlayAgain, userWon }) => {
    return (
        <div className="mt-4 text-center scoreCard">
            <p className="text-xl font-bold mb-2 text-white underline">
                Game Status
            </p>
            <div className=" flex justify-center content-center gap-6">
                <p className="text-lg text-gray-300">Score: {score}</p>
                <p className="text-lg text-gray-300">Max Score: {maxScore}</p>
            </div>
            {userWon && (
                <button
                    onClick={onPlayAgain}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                    Next Level
                </button>
            )}
        </div>
    );
};

export default GameStatus;
