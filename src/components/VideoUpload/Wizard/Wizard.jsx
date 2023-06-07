import React, { useState, useEffect } from "react";
import "./wizard.scss";
import { checkmarkIcon } from "../../../assets";
import VideoEditor from "../VideoEditor/VideoEditor";
import useFileUploader from "../../../firebase/useFileUploader";
import UploadVideo from "../UploadVideo/UploadVideo";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RESET } from "../../../features/videoSlice";

const Wizard = () => {
  const [showVideoEditor, setShowVideoEditor] = useState(false);
  const [showSyncing, setShowSyncing] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const { wizardOpen, videoDetails, uploading } = useSelector(state => state.video);

  const dispatch = useDispatch();

  useEffect(() => {
    if (uploading) {
      setShowSyncing(true);
      setShowDone(true);
      setTimeout(() => {
        setShowSyncing(false);
        setShowDone(false);
        setShowVideoEditor(true);
      }, 4700);
    }
  }, [uploading]);

  useEffect(() => {
    return () => {
      if (!wizardOpen) {
        dispatch(RESET());
        setShowVideoEditor(false);
      }
    }
  }, [wizardOpen]);

  return (
    <div className="wizard">
      {!showVideoEditor && (
        <>
          <Header title="Upload videos" />
          <div className={`loadingbar ${showSyncing && "active"}`}></div> 
        </>
      )}
      <main>
        {showSyncing && (
          <img 
            src="https://100dayscss.com/codepen/syncing.svg" 
            className="syncing" 
            alt="Syncing"
          />
        )}
        {showDone && <img src={checkmarkIcon} className="done"></img>}
          {showVideoEditor ? (
            <VideoEditor />
          ) : (
            <div className={`${showDone && "completed"}`}>
              <UploadVideo showDone={showDone} />
            </div>
          )}
      </main>
    </div>
  )
}

export default Wizard;