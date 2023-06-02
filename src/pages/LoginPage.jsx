import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sessions } from "../config/axios";
import { setUserAction } from "../states/userReducer";
import "./css/login.css";
const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [idCard, setIdCard] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  
  const onlyNumber = (value) => {
    setIdCard(value.replace(/[^0-9]/g, ""));
  };
  const login = async (e) => {
    e.preventDefault();    
    if (!userName && !password) {
      if (idCard.length === 10) {
        try {
          const res = await sessions.post("Login/Employee", { idCard });
          const user = res.data;
          dispatch(setUserAction(user));          
          navigate("/", { replace: true},          
          );          
        } catch (error) {
          setErrorMessage("USUARIO NO ENCONTRADO EN EL SISTEMA");
        }        
      } else {
        setErrorMessage("INGRESE LOS 10 DÍGITOS DE LA CÉDULA");
        setIdCard("");
      }
    } else {
      const res = await sessions.post("Login", { userName, password });
      const user = res.data;
      dispatch(setUserAction(user));
      navigate("/super-admin", { replace: true });
    }
  };
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  }, [errorMessage]);
  return (
    <>
      {idCard !== "0000000000" ? (
        <div className="login-container">
          <form onSubmit={(e) => login(e)}>
            <img
              src="/resources/images/logoGrupoCalderon.png"
              alt="logoGrupoCalderon"
            />
            <input
              type="text"
              maxLength={10}
              placeholder="Ingrese Cédula"
              value={idCard}
              onInput={(e) => onlyNumber(e.currentTarget.value)}
            />
            <input
              type="submit"
              value="Iniciar Sesión"
              onClick={(e) => login(e)}
            />
          </form>
        </div>
      ) : (
        <>
          <div className="login-container">
            <form onSubmit={(e) => login(e)}>
              <input
                type="text"
                placeholder="Ingrese Usuario"
                onInput={(e) => setUserName(e.currentTarget.value)}
              />
              <input
                type="password"
                placeholder="Ingrese Contraseña"
                onInput={(e) => setPassword(e.currentTarget.value)}
              />
              <input
                type="submit"
                value="Iniciar Sesión"
                onClick={(e) => login(e)}
                style={{ background: "linear-gradient(90deg, var(--primaryColor) 0%, var(--degradeColor) 100%)" }}
              />
            </form>
          </div>
        </>
      )}
      {errorMessage ? (
        <div className="error-container">{errorMessage}</div>
      ) : (
        <></>
      )}
    </>
  );
};

export default LoginPage;
