import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import EmployeeReport from "../components/EmployeeReport";
import Button from "../components/common/Button";
import "./css/report.css";

const MenuReport = ()=>{
    const navigate = useNavigate();
    
    const goToReport = () => {
        navigate("/report/byEmployee", { replace: false });
      };
    return (
        <div>            
            <Button
                  name='Reporte Consolidado'
                  backgroundColor='--comex-primary-color'
                  color='--white'
                  action={goToReport}
                />            
        </div>
        )
    };
export default MenuReport

