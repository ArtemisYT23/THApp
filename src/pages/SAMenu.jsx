import "./css/samainmenu.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuButton from "../components/common/MenuButton";
import { replace } from "formik";

const SAMenu = () => {
  const navigate = useNavigate();
  const goToCheck = () => {
    navigate("check", { replace: false });
  };

  const goToUsers = () =>{
    navigate("/super-admin/entity",{replace:false});
  };
  return (
    <div className="menu-container">
      <MenuButton
        name={"Usuarios por Empresa"}
        action={goToCheck}
      ></MenuButton>
      <MenuButton name={"Empresas"}></MenuButton>
      <MenuButton name={"Usuarios"} action={goToUsers}></MenuButton>
      <MenuButton name={"Roles"}></MenuButton>
    </div>
  );
};

export default SAMenu;
