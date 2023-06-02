import { useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setVideoRefAction } from "../states/checkReducer";
import "./css/camera.css";
const Camera = () => {
  const dispatch = useDispatch();

  const videoRef = useRef();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = stream;
      dispatch(setVideoRefAction(videoRef.current));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  return <video ref={videoRef} autoPlay></video>;
};

export default Camera;
