import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBusiness, getClientUsers } from "../functions/entities";
import { setBusinessesAction } from "../states/saReducer";
import "./css/sa.css";
//Home Admin
const SAPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(store => store.user);
  const { businesses } = useSelector(store => store.sa);

  const [businessId, setBusinessId] = useState("");

  const getUsers = async () => {
    await getClientUsers(businessId);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      if (businesses.length === 0) {
        getAllBusiness().then(res => dispatch(setBusinessesAction(res)));
      }
    }
  }, [user, navigate, dispatch, businesses]);

  return (
    <div className='super-admin-container'>
      <form className='user-form-container'>
        <h2>Usuarios por Empresa</h2>
        <select
          value={businessId}
          onChange={e => setBusinessId(e.target.value)}
        >
          <option hidden value=''>
            Seleccione Empresa
          </option>
          {businesses.map(business => (
            <option key={business.id} value={business.id}>
              {business.name}
            </option>
          ))}
        </select>
        <input type='button' value='Traer' onClick={getUsers} />        
      </form>
    </div>
  );
};

export default SAPage;
