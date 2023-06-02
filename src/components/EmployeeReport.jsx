import { useState, useRef } from "react";
import "./css/employeeReport.css";
const EmployeeReport = ({ employee = null }) => {
  const [isPress, setIsPress] = useState(true);
  const refTable = useRef();

  return (
    <>
      <tbody>
        {employee.checks.map((check, index) => (
          <tr key={index} style={{ textAlign: "center" }}>
            <td>{employee.name}</td>
            <td>{employee.surName}</td>
            <td>{check.date.substring(0, check.date.indexOf("T"))}
            </td>
            {check.details.map((detail, index) => (
              <td key={index}>
                {detail.hour.substring(0, detail.hour.lastIndexOf(":"))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default EmployeeReport;
