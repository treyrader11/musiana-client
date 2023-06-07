import React from "react";
import "./styles/buttons.css";

const ToggleSwitch = () => {
  return (
    <div className="switchcontainer">
        <input type="checkbox" id="switch" className="switchinput" />
        <label className="switchlabel" htmlFor="switch"></label>
    </div>
  )
}

export default ToggleSwitch;