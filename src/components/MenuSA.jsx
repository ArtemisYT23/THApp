import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  setEntityNameAction,
  setIsMenuOpenAction,
  setBusinessesAction,
  setUsersAction,
  setRolesAction,
  setBusinessAction,
  setRolAction,
} from "../states/saReducer";
import { setUserAction } from "../states/userReducer";
import "./css/menuSA.css";
const MenuSA = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menu = ["Empresa", "Usuario", "Rol"];
  const logout = () => {
    dispatch(setUserAction(null));
    dispatch(setEntityNameAction(null));
    dispatch(setIsMenuOpenAction(false));
    dispatch(setBusinessesAction([]));
    dispatch(setUsersAction([]));
    dispatch(setRolesAction([]));
    dispatch(setBusinessAction({}));
    dispatch(setRolAction({}));
    navigate("/login", { replace: true });
  };
  return (
    <nav className={`menu-container`}>
      <ul>
        <li>
          <NavLink
            to=''
            replace={true}
            onClick={() => {
              dispatch(setEntityNameAction(null));
              dispatch(setIsMenuOpenAction(false));
            }}
          >
            Inicio
          </NavLink>
        </li>
        {menu.map((item, index) => (
          <li key={index}>
            <NavLink
              to='entity'
              replace={false}
              onClick={() => {
                dispatch(setEntityNameAction(item.toUpperCase()));
                dispatch(setIsMenuOpenAction(false));
              }}
            >
              {item}
            </NavLink>
          </li>
        ))}
        <li>
          <button onClick={logout}>Cerrar Sesión</button>
        </li>
      </ul>
    </nav>
  );
};

export default MenuSA;
