import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import GameStatus from "./GameStatus";

import "../styles/Deck.css";
const types = ["sfw", "nsfw"];
const nsfwCategories = ["neko", "waifu", "trap", "blowjob"];
const categories = [
    "waifu",
    "neko",
    "shinobu",
    "megumin",
    "bully",
    "cuddle",
    "cry",
    "hug",
    "awoo",
    "kiss",
    "lick",
    "pat",
    "smug",
    "bonk",
    "yeet",
    "blush",
    "smile",
    "wave",
    "highfive",
    "handhold",
    "nom",
    "bite",
    "glomp",
    "slap",
    "kill",
    "kick",
    "happy",
    "wink",
    "poke",
    "dance",
    "cringe",
];
const url = "https://api.waifu.pics"; /* /type/category */
// const limit = 10;

function Deck({ onWin, onPlayAgain, userWon }) {
    const [limit, setLimit] = useState(5);
    const [deck, setDeck] = useState([]);
    const [loading, setLoading] = useState(true);
    const categorieNumber = Math.round(Math.random() * categories.length);
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);

    const fetchData = async () => {
        try {
            const cardPromises = Array.from({ length: limit }, async () => {
                let card = await fetch(`${url}/sfw/waifu`);
                let res = await card.json();
                return { url: res.url, id: uuidv4(), isClicked: false };
            });

            const newCards = await Promise.all(cardPromises);
            setDeck((prevDeck) => [...prevDeck, ...newCards]);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const gameEngine = (clickedCard) => {
        console.log("Card clicked:", clickedCard.id);

        if (clickedCard.isClicked) {
            console.log("game over");
            setScore(0);
            setDeck((prevDeck) => {
                return prevDeck.map((card) => {
                    return { ...card, isClicked: false };
                });
            });
            return;
        }

        setDeck((prevDeck) => {
            return prevDeck.map((card) => {
                if (card.id === clickedCard.id) {
                    return { ...card, isClicked: true };
                }
                return card;
            });
        });

        setScore((prevScore) => prevScore + 1);

        setDeck((prevDeck) => {
            const didWin = prevDeck.every((card) => card.isClicked);

            if (didWin) {
                console.log("you win");
                onWin();
            }
            return shuffle(prevDeck);
        });

        setMaxScore((prevMaxScore) => Math.max(prevMaxScore, score + 1));
    };

    const handlePlayAgain = () => {
        onPlayAgain(); // Notify App component that the user clicked play again
        setDeck([]);
        setLoading(true);
        setScore(0);
        setLimit((prevCount) => prevCount + 1);
    };

    useEffect(() => {
        fetchData();
    }, [limit]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="flex justify-center items-center flex-wrap gap-10">
                {loading && (
                    <div className="center">
                        <div className="loader">
                            <svg viewBox="0 0 80 80">
                                <circle
                                    id="test"
                                    cx="40"
                                    cy="40"
                                    r="32"
                                ></circle>
                            </svg>
                        </div>

                        <div className="loader triangle">
                            <svg viewBox="0 0 86 80">
                                <polygon points="43 8 79 72 7 72"></polygon>
                            </svg>
                        </div>

                        <div className="loader">
                            <svg viewBox="0 0 80 80">
                                <rect x="8" y="8" width="64" height="64"></rect>
                            </svg>
                        </div>
                    </div>
                )}
                {!loading &&
                    deck.map((card) => (
                        <Card
                            onClick={() => gameEngine(card)}
                            key={card.id}
                            url={card.url}
                        />
                    ))}
            </div>
            <GameStatus
                score={score}
                maxScore={maxScore}
                onPlayAgain={handlePlayAgain}
                userWon={userWon}
            />
        </div>
    );
}

export default Deck;
