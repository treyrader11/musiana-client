import React, { useState } from "react";
import "./videoeditor.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addVideo, openWizard } from "../../../features/videoSlice";
import { HiUpload } from "react-icons/hi";
import { MdDoneAll } from "react-icons/md";
import { SDIcon } from "../../../assets";
import StepperPanels from "../StepperPanels/StepperPanels";
import Stepper from "../../Stepper/Stepper";
import Header from "../Header/Header";

const steps = ["details", "elements", "visibility"];

const VideoEditor = () => {
  const { progress, uploading, videoDetails } = useSelector((state) => state.video);
  const [activeStep, setActiveStep] = useState(0);
  const [inputs, setInputs] = useState({ title: videoDetails.title });
  const [tags, setTags] = useState([]);
  const [scrolling, setScrolling] = useState(0);

  const hasError = !inputs.title || inputs.title.trim().length === 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => !hasError && setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleGoBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleClickStep = (stepIndex) => !hasError && setActiveStep(stepIndex);
  const handleScroll = (e) => setScrolling(e.target.scrollTop);
  const handleTags = (e) => setTags(e.target.value.split(","));

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  async function handleUpload() {
    await dispatch(addVideo({ ...inputs, tags }));
    await dispatch(openWizard(false));
    navigate("/videos");
  }

  return (
    <div className="video__editor">
      <Header title={inputs?.title} />
      <div className={`stepper ${scrolling && "bottomBorder"}`}>
        <Stepper 
            steps={steps} 
            activeStep={activeStep} 
            hasError={hasError} 
            handleClickStep={handleClickStep} 
        />
      </div>
      <div className="panels">
        <StepperPanels
          step={steps[activeStep]}
          videoDetails={inputs}
          hasError={hasError}
          handleScroll={handleScroll}
          handleVideoDetails={handleChange}
          handleTags={handleTags}
        />
      </div>
      <div className="footer">
        <div className="icon-group">
          <HiUpload size={25} />
          <img src={SDIcon} className="icon" />
          {!uploading ? (
            <>
              <MdDoneAll size={25} />
              <p>Checks complete. No issues found.</p>
            </>
          ) : (
            progress + "%"
          )}
        </div>
        <div className="btn-group">
          {activeStep !== 0 && (
            <button className="btn back-btn" onClick={handleGoBack}>
                Back
            </button>
          )}
          <button className="btn" onClick={activeStep === steps.length - 1 ? handleUpload : handleNext} disabled={hasError}>
            {activeStep === steps.length - 1 ? "Save" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
