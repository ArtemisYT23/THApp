import { sessions, apiFrontend } from "../config/axios";

export const getEntityByName = async (name) => {
  switch (name) {
    case "EMPRESA":
      return getAllBusiness();
    case "USUARIO":
      return getAllUsers();
    case "ROL":
      return getAllRoles();
    default:
      break;
  }
};

export const getAllBusiness = async () => {
  let res = await sessions.get("Business");
  return res.data;
};

export const getAllUsers = async () => {
  let res = await sessions.get("User");
  return res.data;
};

export const getAllRoles = async () => {
  let res = await sessions.get("Rol");
  return res.data;
};

export const getClientUsers = async (BusinessId) => {
  let res = await sessions.get(`User/Insert?BusinessId=${BusinessId}`);
  return res.data;
};

export const getUserData = async () => {
  return await sessions.get("UserData");
};

export const createUser = async (values) => {
  console.log("From form");
  console.log(`Id ${values.id}`);
  // console.log(`IdCard ${values.idCard}`)
  // console.log(`Email ${values.email}`)
  // console.log(`Business ${values.businessId}`)
  // console.log(`Name ${values.name}`)
  // console.log(`SurName ${values.surName}`)
  // console.log(`Area ${values.area}`)
  // console.log(`Departament ${values.departament}`)
  // console.log(`UserName ${values.userName}`)
  // let res = await sessions.post('user',values);
  let res = await sessions.post("user", {
    id: values.id,
    email: values.email,
    idCard: values.idCard,
    password: values.password,
    businessId: values.businessId,
    userName: values.idCard,
    name: values.name,
    surName: values.surName,
    area: values.area,
    departament: values.departament,
    photo: null,
  });
  console.log(res);
  return res.data;
  //return null;
};

export const createEmployee = async (values) => {
  let res = await apiFrontend.post(
    `Employee/Insert?BusinessId=${values.businessId}`,
    {
      id: values.id,
      idCard: values.idCard,
      name: values.name,
      surName: values.surName,
      photo: null,
      area: values.area,
      departament:values.departament,
    }
  );
  console.log(res);
  return res.data;
};
