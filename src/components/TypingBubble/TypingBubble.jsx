import React from "react";
import "./typingbubble.css";

const TypingBubble = () => {
  return (
    <div className="typing-bubble">
        <div className="loader">
            <div className="dot one"></div>
            <div className="dot two"></div>
            <div className="dot three"></div>
        </div>
        <div className="tail"></div>
    </div>
  )
}

export default TypingBubble;