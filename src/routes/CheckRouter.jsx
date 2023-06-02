import { Routes, Route } from "react-router-dom";
import CheckPage from "../pages/CheckPage";
import CheckingPage from "../pages/CheckingPage";
import CheckedPage from "../pages/CheckedPage";
const CheckRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<CheckPage />} />
      <Route path='checking' element={<CheckingPage />} />
      <Route path='checked' element={<CheckedPage />} />
    </Routes>
  );
};

export default CheckRouter;
