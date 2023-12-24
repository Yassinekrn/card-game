import React, { useState, useEffect, useRef } from "react";
import { Tilt } from "react-tilt";

import "../styles/Card.css";

// these options do not work for some reasons
const defaultOptions = {
    reverse: true, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

function Card({ url, onClick }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const handleImageLoad = () => {
            setImageLoaded(true);
        };

        const image = new Image();
        image.src = url;
        image.onload = handleImageLoad;

        return () => {
            image.onload = null;
        };
    }, [url]);

    return (
        <Tilt options={defaultOptions}>
            <div
                onClick={onClick}
                className={`card m-0 p-0 ${imageLoaded ? "loaded" : "loading"}`}
            >
                <div
                    className={`blurry-background ${
                        imageLoaded ? "loaded" : "loading"
                    }`}
                    style={{
                        backgroundImage: `url(${url})`,
                        filter: imageLoaded ? "blur(0)" : "blur(10px)", // Undo the blur effect when image is loaded
                        transition: "filter 0.5s ease", // Apply a smooth transition
                    }}
                ></div>
                <img
                    src={url}
                    alt="card_img"
                    className="w-full h-full rounded-lg object-cover"
                    loading="lazy"
                />
                {!imageLoaded && <p className="loading-text">Loading...</p>}
            </div>
        </Tilt>
    );
}

export default Card;
