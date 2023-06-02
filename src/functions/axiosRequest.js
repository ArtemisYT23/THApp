import { apiFrontend } from "../config/axios";
import { v4 as uuidv4 } from 'uuid';
export const getEmployeeById = async user => {
  return await apiFrontend.get(
    `Employee/${user.id}?BusinessId=${user.businessId}`
  );
};

export const createEmployee = async user => {
  return await apiFrontend.post(
    `Employee/Insert?BusinessId=${user.businessId}`,
    {
      // id: user.id,
      id: uuidv4(),
      idCard: user.idCard,
      userName:user.idCard,
      name: user.name,
      surName: user.surName,
      area: user.area,
      departament: user.departament,
      photo: user.photo,
    }
  );
};

export const getAllMarks = async businessId => {
  return await apiFrontend.get(`Mark?BusinessId=${businessId}`);
};

export const dailyControlCheckGenerator = async businessId => {
  return await apiFrontend.get(
    `Actions/DailyControlCheckGenerator?BusinessId=${businessId}`
  );
};

export const checkIn = async (businessId, check) => {
  return await apiFrontend.post(`Check/In?BusinessId=${businessId}`, check);
};

export const marked = async (businessId, employeeId) => {
  return await apiFrontend.get(
    `Check/Marked/${employeeId}?BusinessId=${businessId}`
  );
};

export const verifyEmployeeDay = async (businessId, employeeId) => {
  return await apiFrontend.get(
    `Check/VerifyEmployeeDay/${employeeId}?BusinessId=${businessId}`
  );
};

export const createEmployeeDay = async (businessId, employeeId, dailyHours) => {
  return await apiFrontend.post(
    `Check/CreateEmployeeDay/${employeeId}?BusinessId=${businessId}`,
    { inHour: dailyHours.inHour, outHour: dailyHours.outHour }
  );
};

export const reportGenerator = async (businessId, report) => {
  return await apiFrontend.post(
    `Report/Generator?BusinessId=${businessId}`,
    report
  );
};

export const getAllAreaDepartament = async businessId => {
  return await apiFrontend.get(
    `Report/AreaDepartament?BusinessId=${businessId}`
  );
};

export const AreaGetAll = async businessId => {
  const results = await apiFrontend.get(`Area?BusinessId=${businessId}`);
  console.log(results);
  return results
};

export const AreaGetById = async (businessId, userId) => {
  return await apiFrontend.get(`Area/${userId}?BusinessId=${businessId}`);
};

export const DepartamentGetAll = async businessId => {
  return await apiFrontend.get(`Departament?BusinessId=${businessId}`);
};

export const DepartamentGetById = async (businessId, userId) => {
  return await apiFrontend.get(
    `Departament/${userId}?BusinessId=${businessId}`
  );
};

export const gelAllEmployeeNoCheckToday = async businessId => {
  return await apiFrontend.get(
    `Actions/GelAllEmployeeNoCheckToday?BusinessId=${businessId}`
  );
};
