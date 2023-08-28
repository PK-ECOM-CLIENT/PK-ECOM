import React, { useEffect, useState } from "react";

export const TypingEffect = ({ text, charDelay, pauseDuration }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setDisplayText("");
        }, pauseDuration);
      }
    }, charDelay);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, charDelay, pauseDuration]);

  return <span>{displayText}</span>;
};
