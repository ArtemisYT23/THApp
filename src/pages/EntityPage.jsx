import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonEntity from "../components/common/ButtonEntity";

import {
  getAllBusiness,
  getAllUsers,
  getAllRoles,
  getUserData,
} from "../functions/entities";
import {
  setBusinessesAction,
  setEntityNameAction,
  setRolesAction,
  setUsersAction,
  setUsersDataAction,
} from "../states/saReducer";

import "./css/entity.css";
const EntityPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { entityName, businesses, roles, usersData, users, filter } =
    useSelector((store) => store.sa);

  const [b, setB] = useState([]);
  const [u, setU] = useState([]);
  const [r, setR] = useState([]);
  //Title nav bar
  useEffect(() => {
    switch (entityName) {
      case "EMPRESA":
        if (businesses.length === 0) {
          getAllBusiness(entityName).then((res) => {
            dispatch(setBusinessesAction(res));
          });
        } 
        break;
      case "USUARIO":
        if (users.length === 0) {
          getAllUsers(entityName).then((res) => {
            dispatch(setUsersAction(res));
            getUserData().then((r) => {
              dispatch(setUsersDataAction(r.data));
            });
          });
        }
        break;
      case "ROL":
        if (roles.length === 0) {
          getAllRoles(entityName).then((res) => {
            dispatch(setRolesAction(res));
          });
        }
        break;
      default:
        break;
    }
  }, [dispatch, entityName, businesses, roles, users]);

  useEffect(() => {
    if (businesses.length !== 0) {
      setB(businesses);
    }
    if (usersData.length !== 0) {
      setU(usersData);
    }
    if (roles.length !== 0) {
      setR(roles);
    }
  }, [businesses, usersData, roles]);

  useEffect(() => {
    switch (entityName) {
      case "EMPRESA":
        setB(
          businesses.filter((business) =>
            business.name.toUpperCase().includes(filter.toUpperCase())
          )
        );
        break;
      case "USUARIO":
        setU(
          usersData.filter((user) =>
            user.name
              .substring(0, user.name.indexOf(" "))
              .concat(" " + user.surName.substring(0, user.name.indexOf(" ")))
              .toUpperCase()
              .includes(filter.toUpperCase())
          )
        );
        break;
      case "ROL":
        setR(
          roles.filter((rol) =>
            rol.name.toUpperCase().includes(filter.toUpperCase())
          )
        );
        break;
      default:
        break;
    }
  }, [filter, businesses, entityName, roles, usersData]);

  useEffect(() => {
    return () => {
      dispatch(setEntityNameAction(null));
    };
  }, [dispatch]);

  // To see all user
  return (
    <div className="entity-container">              
       {u.length !== 0 && entityName === "USUARIO" ? (
        u.map((userData) => (
          <div key={userData.id} className="entity-button-container">
            <ButtonEntity
              name={`${userData.name.substring(
                0,
                userData.name.indexOf(" ")
              )} ${userData.surName.substring(
                0,
                userData.surName.indexOf(" ")
              )}`.toUpperCase()}
              backgroundColor="--comex-primary-color"
              color="--white"
              entity={userData}
              action={() => navigate("edit", { replace: true })}
            />
          </div>
        ))
      ) : (
        <></>
      )}      
      
      {b !== 0 && entityName === "EMPRESA" ? (
        b.map((business) => (
          <div key={business.id} className="entity-button-container">
            <ButtonEntity
              name={business.name}
              backgroundColor="--comex-primary-color"
              color="--white"
              entity={business}
              action={() => navigate("edit", { replace: true })}
            />
          </div>
        ))
      ) : (
        <></>
      )}           
      {r !== 0 && entityName === "ROL" ? (
        r.map((rol) => (
          <div key={rol.id} className="entity-button-container">
            <ButtonEntity
              key={rol.id}
              name={rol.name}
              backgroundColor="--comex-primary-color"
              color="--white"
              entity={rol}
              action={() => navigate("edit", { replace: false })}
            />
          </div>
        ))
      ) : (
        <></>
      )}
       </div>          
  );
};

export default EntityPage;
