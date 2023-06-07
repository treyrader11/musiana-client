import React from "react"
import "./popover.scss";

const Popover = ({ children }) => {
  return (
    // <div className="popover-container">
        <span className="qs">
            {children}
            <span className="popover above">Hey bro, cool popover!</span>
        </span>
    // </div>
  )
}

export default Popover;