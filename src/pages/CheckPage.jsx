import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAllMarks, marked } from "../functions/axiosRequest";

import Clock from "../components/Clock";
import ButtonMark from "../components/common/ButtonMark";
import LoadingSpinner from "../components/Spinner";
import "./css/check.css";
import InputMark from "../components/common/InputMark";
import { ClimbingBoxLoader } from "react-spinners";
const CheckPage = () => {
  const navigate = useNavigate();

  const { user } = useSelector(store => store.user);
  const [isLoading, setIsLoading] = useState(false);
  const [marks, setMarks] = useState([]);
  const [markeds, setMarkeds] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const checking = () => {
    navigate(`checking`, { replace: false });
  };

  const checked = () => {
    navigate(`checked`, { replace: false });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: false });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {      
      getAllMarks(user.businessId).then(res => setMarks(res.data));
      marked(user.businessId, user.id).then(res => setMarkeds(res.data));      
    }
  }, [user]);

  useEffect(() => {
    if (markeds) {      
      setIsLoading(true)
      if (markeds.includes(4)) {
        setDisabled(disabled => ({
          ...disabled,
          disabled1: true,
          disabled2: true,
          disabled3: true,
          disabled4: true,
        }));
      } else if (markeds.includes(3)) {
        setDisabled(disabled => ({
          ...disabled,
          disabled1: true,
          disabled2: true,
          disabled3: true,
          disabled4: false,
        }));
      } else if (markeds.includes(2)) {
        setDisabled(disabled => ({
          ...disabled,
          disabled1: true,
          disabled2: true,
          disabled3: false,
          disabled4: false,
        }));
      } else if (markeds.includes(1)) {
        setDisabled(disabled => ({
          ...disabled,
          disabled1: true,
          disabled2: false,
          disabled3: true,
          disabled4: false,
        }));
      } else if (markeds.length === 0) {
        setDisabled(disabled => ({
          ...disabled,
          disabled1: false,
          disabled2: true,
          disabled3: true,
          disabled4: true,
        }));
      }
      setIsLoading(false)
    }
  }, [markeds]);

  return (
    <>
      {marks ? (
        <div className='check-container'>
          <div className='clock-container'>
            <div
              className='return-container'
              onClick={() => navigate("/", { replace: false })}
            >
              <svg
                viewBox='0 0 64 64'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_4_100)'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M26.6274 60.2843L1.17157 34.8284C-0.390526 33.2663 -0.390526 30.7337 1.17157 29.1716L26.6274 3.71572C28.1895 2.15363 30.7222 2.15363 32.2843 3.71572C33.8464 5.27782 33.8464 7.81048 32.2843 9.37258L13.6569 28L60 28C62.2091 28 64 29.7909 64 32C64 34.2091 62.2091 36 60 36L13.6569 36L32.2843 54.6274C33.8464 56.1895 33.8464 58.7222 32.2843 60.2843C30.7222 61.8464 28.1895 61.8464 26.6274 60.2843Z'
                    fill='white'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_4_100'>
                    <rect width='64' height='64' fill='none' />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <Clock />
          </div>
          <div className='marks-container'>
            {marks.length !== 0 ? (              
              marks.map(mark => {
                if (
                  !(
                    navigator.userAgent.match(/Android/i) ||
                    navigator.userAgent.match(/webOS/i) ||
                    navigator.userAgent.match(/iPhone/i) ||
                    navigator.userAgent.match(/iPod/i) ||
                    navigator.userAgent.match(/iPad/i) ||
                    navigator.userAgent.match(/BlackBerry/i)
                  )
                ) {
                  return (
                    <ButtonMark
                      key={mark.id}
                      index={mark.id}
                      name={mark.name}
                      color='--white'
                      background='--primaryColor'
                      action={checking}
                      disabled={disabled}
                    />
                  );
                } else {
                  return (
                    <InputMark
                      key={mark.id}
                      index={mark.id}
                      name={mark.name}
                      color='--white'
                      backgroundColor='--primaryColor'
                      disabled={disabled}
                      action={checked}
                    />
                  );
                }
              })
            ) : (
              <span>     
              cargando...                       
              {/* {isLoading ? <LoadingSpinner/>: CheckPage} */}
              </span>
            )}
          </div>
        </div>
      ) : (
        <span>Cargando...</span>
      )}
    </>
  );
};

export default CheckPage;
