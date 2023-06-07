import React, { useRef } from "react";
import "./stepper.scss";
import { FaCircle, FaCheckCircle } from 'react-icons/fa';

const Stepper = ({ steps, activeStep, hasError, handleClickStep }) => {
  const stepRefs = useRef([]);
  const handleStepClick = index => handleClickStep(index);

  return (
    <>
      <ul className="steps">
        {steps.map((stepLabel, index) => {
          const stepClasses = `step step-${index + 1} ${
            index < activeStep ? "-completed" :
            index === activeStep ? "-active" : "-incomplete"
          } ${index === activeStep && hasError && "-error"}`;
          
          return (
            <li key={index}>
              <div
                className={stepClasses}
                ref={ref => (stepRefs.current[index] = ref)}
                onClick={() => handleStepClick(index)}
              >
                <p className="step-label">{stepLabel}</p>
                <div className="step-content">
                    {index < activeStep ? (
                      <FaCheckCircle className="checkmark check" />
                    ) : (
                      <FaCircle className="checkmark circle" />
                    )}
                    {hasError && index === activeStep ? (
                      <p className="badge">!</p>
                    ) : (
                      <p className="badge"></p>
                    )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Stepper;