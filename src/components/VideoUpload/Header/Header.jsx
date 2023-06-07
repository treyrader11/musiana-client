import React from "react";
import "./header.scss";
import { openWizard } from "../../../features/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "../../Tooltip/Tooltip";
import { reportIcon, closeIcon } from "../../../assets";
import shortenText from "../../../utils/shortenText";

const Header = ({ title }) => {
  const { videoDetails } = useSelector(state => state.video);
  const dispatch = useDispatch();

  return (
    <header>
        <p>{shortenText(title, 60) || shortenText(videoDetails.title, 60)}</p>
        <Tooltip position="bottom" text="Send Feedback">
            <img src={reportIcon} className="report" alt="Report" />
        </Tooltip>
        <button onClick={() => dispatch(openWizard(false))}>
            <img className="closeicon" src={closeIcon} alt="Close Modal" />
        </button>
    </header>
  );
};

export default Header;
