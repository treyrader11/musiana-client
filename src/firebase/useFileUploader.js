import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";
import { setUploading, setProgress, setVideoDetails } from "../features/videoSlice";
import { storage } from "./config";

const useFileUploader = () => {
  const dispatch = useDispatch();
  
  const uploadFile = (file) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    dispatch(setVideoDetails({ title: parseFileName(file.name) }));
    
    uploadTask.on(
      "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            dispatch(setUploading(true));
            dispatch(setProgress(Math.round(progress)));
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
        },
        (err) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            dispatch(setVideoDetails({ videoUrl: downloadURL }));
            dispatch(setUploading(false));
          });
        }
      );
  };

  return uploadFile;
};

function parseFileName(file) {
  const fileExtensionReg = /\.[^.]+$/; 
  const specialCharsReg = /[^A-Za-z0-9\s]/g;
  return file.replace(fileExtensionReg, "").replace(specialCharsReg, " ");
};

export default useFileUploader;
