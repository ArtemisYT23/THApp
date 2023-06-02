import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  gelAllEmployeeNoCheckToday,
  createEmployeeDay,  
} from "../functions/axiosRequest";

import "./css/admin.css";

const AdminPage = () => {
  const navigate = useNavigate();

  const { user } = useSelector(store => store.user);

  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);

  const [message, setMessage] = useState("");

  const createDay = async e => {
    e.preventDefault();
    let res = await createEmployeeDay(user.businessId, employeeId, {
      inHour: null,
      outHour: null,
    });
    if (res.status === 200) {
      setMessage("Día Generado Correctamente");
      gelAllEmployeeNoCheckToday(user.businessId).then(res => {
        setEmployees(res.data);
      });
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      gelAllEmployeeNoCheckToday(user.businessId).then(res => {
        setEmployees(res.data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

  return (
    <div className='admin-container'>
      <header className='header-admin-container'>
        <Link to='/'>
          <img src='/resources/icons/Atras.svg' alt='return'></img>
        </Link>
        <span>ADMINISTRACIÓN</span>
      </header>
      <form className='daily-generate-form'>
        <span>Generar día del empleado</span>
        <select onChange={e => setEmployeeId(e.target.value)}>
          <option value='' hidden>
            Seleccione...
          </option>
          {employees.map((employee, index) => (
            <option key={index} value={employee.id}>
              {`${employee.name.substring(
                0,
                employee.name.indexOf(" ")
              )} ${employee.surName.substring(
                0,
                employee.surName.indexOf(" ")
              )}`.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          style={{ background: "linear-gradient(90deg, var(--primaryColor) 0%, var(--degradeColor) 100%)" }}
          onClick={e => createDay(e)}
          disabled={employees.length === 0 ? true : false}
        >
          Generar
        </button>
      </form>
      {message ? (
        <span className='notification-message'>{message}</span>
      ) : (
        <></>
      )}
    </div>
  );
};
export default AdminPage;
