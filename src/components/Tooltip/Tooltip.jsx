import React from "react";
import "./tooltip.scss";

const Tooltip = ({ children, position, text }) => {
  return (
    <div className="tooltip">
      {children}
      <span className={`tooltip-text ${position}`}>{text}</span>
    </div>
  )
}

export default Tooltip;

