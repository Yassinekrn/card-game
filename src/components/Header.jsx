import React, { useEffect, useState, useRef } from "react";
import "../styles/Header.css";

function Header() {
    return (
        <div className="w-full flex justify-center items-center my-4">
            <div className="titleCard">
                <p className="text head">Hi there 👋🏼, Welcome to</p>

                <div className="textBox">
                    <p className="text head">Anime Card Game</p>
                    <span className="underline">Rules</span>
                    <p className="text">
                        Challenge your memory by clicking each card once until
                        you've clicked them all to win.
                    </p>
                    <p className="text">
                        "🎉 Have a blast playing! Best of luck! 🍀"
                    </p>
                    <span>
                        Note: Losing will trigger an automatic game reset, while
                        winning will increase the card count by 1.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Header;
