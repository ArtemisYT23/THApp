import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  setIsMenuOpenAction,
  setIsCheckDayAction,
} from "../states/homeReducer";
import { setUserAction } from "../states/userReducer";
import { setEmployeeAction } from "../states/employeeReducer";
const Menu = () => {
  const dispatch = useDispatch();

  const resetStates = () => {
    dispatch(setIsMenuOpenAction(false));
    dispatch(setUserAction(null));
    dispatch(setEmployeeAction(null));
    dispatch(setIsCheckDayAction(true));
  };

  return (
    <nav className='menu-container'>
      <ul>
        <li>
          <NavLink to='/login' replace onClick={resetStates}>
            Cerrar Sesión 
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
