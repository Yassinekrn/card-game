import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Deck from "./components/Deck";
import Header from "./components/Header";

import Confetti from "react-confetti";

function App() {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const [userWon, setUserWon] = useState(false);

    const handleWin = () => {
        setUserWon(true);
    };

    const handlePlayAgain = () => {
        setUserWon(false);
    };

    return (
        <>
            {userWon && <Confetti width={width} height={height} />}
            <Header />
            <div className="flex justify-center content-center">
                <Deck
                    onWin={handleWin}
                    onPlayAgain={handlePlayAgain}
                    userWon={userWon}
                />
            </div>
        </>
    );
}

export default App;
