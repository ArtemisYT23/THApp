import { HashRouter, Routes, Route } from "react-router-dom";
import CheckRouter from "./CheckRouter";
import SARouter from "./SARouter";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AdminRouter from "./AdminRoute";
import ReportRouter from "./ReportRouter";
import LoadingSpinner from "../components/Spinner";
import { Suspense } from "react";
const AppRoute = () => {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
    <HashRouter>
      <Routes>
        <Route path='login' element={<LoginPage />} />
        <Route path='super-admin/*' element={<SARouter />} />
        <Route path='/' element={<HomePage />} />
        <Route path='check/*' element={<CheckRouter />} />
        <Route path='admin/*' element={<AdminRouter />} />
        <Route path='report/*' element={<ReportRouter />} />        
      </Routes>
    </HashRouter>
    </Suspense>
  );
};

export default AppRoute;
