//Home page User
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployeeById, createEmployee } from "../functions/axiosRequest";
import { hourlyGreeting } from "../functions/hourlyGreeting";
import { setEmployeeAction } from "../states/employeeReducer";
import {
  setIsMenuOpenAction,
  setIsCheckDayAction,
} from "../states/homeReducer";
import {
  FaBars
} from "react-icons/fa";

import { verifyEmployeeDay } from "../functions/axiosRequest";
import Button from "../components/common/Button";
import Menu from "../components/Menu";
import "./css/home.css";
import LoadingApp from "../components/LoadingApp";


const HomePage = () => {
  const r = document.querySelector(":root");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((store) => store.user);
  const { employee } = useSelector((store) => store.employee);
  const { isMenuOpen, isCheckDay } = useSelector((store) => store.home);

  const [rol, setRol] = useState({});

  const logoComex = "/resources/images/logoCOMEXPORT.png";
  const logoCentral = "/resources/images/logoCENTRALFILE.png";
  const goToCheck = () => {
    setIsLoading(true);
    navigate("check", { replace: false });
  };

  const goToAdmin = () => {
    navigate("admin", { replace: false });
  };
  const goToReport = () => {
    navigate("report", { replace: false });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      console.log(user);
    } else {
      if (!employee) {
        setIsLoading(true);
        getEmployeeById(user).then(async (res) => {
          if (res.status === 204) {
            res = await createEmployee(user);
            setIsLoading(false);
            console.log(res);
            if (res.status === 200) {
              res = await getEmployeeById(user);
              setIsLoading(false);
              console.log(res);
            }
          }
          dispatch(setEmployeeAction(res.data));
        });
      }
    }
  }, [user, navigate, dispatch, employee]);

  useEffect(() => {
    if (user) {
      verifyEmployeeDay(user.businessId, user.id).then((res) => {
        if (res.data === "00000000-0000-0000-0000-000000000000") {
          dispatch(setIsCheckDayAction(false));
        }
      });
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      setRol(user.roles.find((rol) => rol.id === 1));
    }
  }, [user]);


  useEffect(() => {
    if(user?.businessId == '33a72cf9-e989-4e3b-9f7e-388e2dcae266') {
      r.style.setProperty("--primaryColor", "#F68A20")
    } else {
      r.style.setProperty("--primaryColor", "#4c607f")
    }
  }, [user]);

  return (
    <>
      {employee ? (
        <>
          <header
            className="home-header"
            style={{ background: "linear-gradient(90deg, var(--primaryColor) 0%, var(--degradeColor) 100%)" }}
          >
            {/* Nombre del usuario */}
            <span>
              {hourlyGreeting()}{" "}
              {`${employee.name} ${employee.surName}`}
            </span>
            <div
              className="home-menu-container"
              onClick={() => dispatch(setIsMenuOpenAction(!isMenuOpen))}
            >
              <FaBars style={{ color: "#fff", width: "90%", height: "90%"}}/>
            </div>
            {isMenuOpen ? <Menu /> : <></>}
          </header>

          <main className="home-main">
            {isCheckDay ? (
              <div className="home-button-container">
                <Button
                  name="Marcar Asistencia"
                  background="--primaryColor"
                  color="--white"
                  action={goToCheck}
                />
              </div>
            ) : (
              <></>
            )}
            {rol ? (
              <>
                <div className="home-button-container">
                  <Button
                    name="Administrar"
                    background="--primaryColor"
                    color="--white"
                    action={goToAdmin}
                  />
                </div>
                <div className="home-button-container">
                  <Button
                    name="Reportería"
                    background="--primaryColor"
                    color="--white"
                    action={goToReport}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </main>
          <footer className="home-footer">
            <img src={logoComex} alt="logo"></img>
            <img src={logoCentral} alt="logo"></img>
          </footer>
        </>
      ) : (
        <span>{isLoading ? <LoadingApp /> : employee}</span>
      )}
    </>
  );
};

export default HomePage;
