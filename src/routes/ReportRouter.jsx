import { Routes, Route } from "react-router-dom";
// import ReportPage from "../pages/ReportPage";
import MenuReport from "../pages/MenuReport";
import ReportPage from "../pages/ReportPage"
const ReportRouter = () => {
  return (
    <>
      <Routes>
        {/* <Route path='/' element={<ReportPage />} /> */}
        <Route path='/' element={<ReportPage/>} />
        <Route path='/byEmployee' element={<ReportPage/>} />
      </Routes>
    </>
  );
};

export default ReportRouter;
