import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Camera from "../components/Camera";
import Clock from "../components/Clock";
import "./css/checking.css";
const CheckingPage = () => {
  const navigate = useNavigate();

  const { user } = useSelector(store => store.user);

  const checked = () => {
    navigate("/check/checked", { replace: true });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: false });
    }
  }, [user, navigate]);

  return (
    <div className='checking-container'>
      <div className='camera-container'>
        <Camera />
      </div>
      <div className='clock-container'>
        <Clock />
      </div>
      <div className='button-container'>
        <button onClick={checked}>MARCAR</button>
      </div>
    </div>
  );
};

export default CheckingPage;
