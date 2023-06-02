import { Routes, Route } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<AdminPage />} />
      </Routes>
    </>
  );
};

export default AdminRouter;
