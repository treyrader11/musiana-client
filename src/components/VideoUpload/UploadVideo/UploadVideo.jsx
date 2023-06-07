import React, { useCallback } from "react";
import "./uploadvideo.scss";
import { useDropzone } from 'react-dropzone';
import { MdFileUpload } from "react-icons/md";
import useFileUploader from "../../../firebase/useFileUploader";
import { useSelector } from "react-redux";

const UploadVideo = ({ showDone }) => {
  const uploadFile = useFileUploader();
  const { uploading } = useSelector(state => state.video);
  
  const onDrop = useCallback(droppedFiles => uploadFile(droppedFiles[0]));
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'video/*':[]}
  });

  return (
    <div className="upload__video">
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {showDone ? (
          <div className="icon-container"></div>
        ) : (
          <>
            <div className={`${isDragActive && "dragging"}`}>
              <MdFileUpload size={180} className={`cloudicon btn ${uploading && "fadeout"}`} />
            </div>
            <div className="info">
              <p>Drag and drop video files to upload</p>
              <p>Videos will be in a pending state until Trey approves them.</p> 
              <p>This means students will not yet have access.</p>
            </div> 
            <button className="btn" disabled={uploading}>
              SELECT FILES
            </button> 
          </>
        )}
      </div>
    </div>
  );
};

export default UploadVideo;