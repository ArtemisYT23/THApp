import axios from "axios";

// export const sessions = axios.create({
//    baseURL: "http://localhost:5045/api/"
//   //baseURL: "https://thapp.comexport.com.ec:10012/api/",
// });

// export const apiFrontend = axios.create({
//    baseURL: "http://localhost:10013/api/",
//   //baseURL: "https://thapp.comexport.com.ec:10014/api/",
//   withCredentials: false,
// });

export const sessions = axios.create({
  // baseURL: "http://localhost:5069/api/"
   //baseURL: "https://localhost:7069/api/"
  baseURL: "https://thapp.comexport.com.ec:10012/api/",
});

export const apiFrontend = axios.create({
  // baseURL: "http://localhost:5091/api/",
    // baseURL: "https://localhost:19199/api/",
  //  //baseURL: "http://localhost:10013/api/",
  baseURL: "https://thapp.comexport.com.ec:10014/api/",
  withCredentials: false,
});

export const apiFrontendExtends = 'https://thapp.comexport.com.ec:10014/api/';

// https://checkapp.comexport.com.ec:480/login
// APIFrontend 10014
// Sessions 10012