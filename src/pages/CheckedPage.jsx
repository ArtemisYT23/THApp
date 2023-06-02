import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkIn } from "../functions/axiosRequest";
import "./css/checked.css";
const CheckedPage = () => {
  const imageContainerRef = useRef();
  const canvasRef = useRef();
  const mapContainerRef = useRef();

  const navigate = useNavigate();

  const [foto, setFoto] = useState("");
  const [map, setMap] = useState("");
  const [coordinates, setCoordinates] = useState("");

  const { videoRef, photo } = useSelector(store => store.check);
  const { user } = useSelector(store => store.user);
  const { markIndex } = useSelector(store => store.check);

  const takePhoto = useCallback(() => {
    const width = imageContainerRef.current.clientWidth;
    const height = imageContainerRef.current.clientHeight;
    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    if (photo) {
      setFoto(photo);
    } else {
      ctx.drawImage(videoRef, 0, 0, width, height);
      let image = canvasRef.current.toDataURL("image/png");
      setFoto(image);
    }
  }, [photo, videoRef]);

  const stopCamera = useCallback(() => {
    const stream = videoRef.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => {
      track.stop();
    });
  }, [videoRef]);

  const getMap = useCallback(() => {
    let apiKey = "AIzaSyASqGtypOXrnS0BeYxwNsoDczS5DR0LEho";
    window.navigator.geolocation.getCurrentPosition(
      position => {
        const coordinates = position.coords;
        console.log(`https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=${mapContainerRef.current.clientWidth}x${mapContainerRef.current.clientHeight}&maptype=roadmap&markers=color:red%7C${coordinates.latitude},${coordinates.longitude}&key=${apiKey}`)
        setMap(
          `https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=${mapContainerRef.current.clientWidth}x${mapContainerRef.current.clientHeight}&maptype=roadmap&markers=color:red%7C${coordinates.latitude},${coordinates.longitude}&key=${apiKey}`
        );
        setCoordinates(coordinates);
      },
      error => {
        console.log("Error Code = " + error.code + " - " + error.message);
      }
    );
  }, []);

  let now = useMemo(() => new Date(), []);

  useEffect(() => {
    takePhoto();
    if (videoRef) {
      stopCamera();
    }
    getMap();
  }, []);

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (foto && coordinates) {
      const data = {
        EmployeeId: user.id,
        MarkId: markIndex,
        Hour: now,
        Latitude: coordinates.latitude.toString(),
        Longitude: coordinates.longitude.toString(),
        Photo: foto.replace(/^data:image\/[a-z]+;base64,/, ""),
      };
      checkIn(user.businessId, data)
        .then(res => {
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
        })
        .catch(error => console.log(error));
    }
  }, [foto, coordinates]);

  return (
    <div className='checked-container'>
      <div ref={imageContainerRef} className='image-container'>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        <img src={foto} alt='foto'></img>
      </div>
      <div className='clock-container'>
        <span>{now.toLocaleTimeString()}</span>
      </div>
      <div ref={mapContainerRef} className='map-container'>
        {map ? <img src={map} alt='mapa'></img> : <></>}
      </div>
    </div>
  );
};

export default CheckedPage;
