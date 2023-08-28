import React, { useEffect, useState } from "react";

export const TypingEffect = ({ text, charDelay, pauseDuration }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let typingInterval;

    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(() => {
          setDisplayText(""); // Reset displayText
          setCurrentIndex(0); // Reset currentIndex
          setIsTyping(true);
        }, pauseDuration);
      }
    };

    if (isTyping) {
      typingInterval = setInterval(typeText, charDelay);
    }

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, charDelay, pauseDuration, currentIndex, isTyping]);

  return <span>{displayText}</span>;
};
