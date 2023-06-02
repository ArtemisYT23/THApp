import { Routes, Route } from "react-router-dom";
import EntityRoute from "./EntityRoute";
import SAPage from "../pages/SAPage";
import SAMenu from "../pages/SAMenu";
import HeaderSA from "../components/HeaderSA";
const SARouter = () => {
  return (
    <>
      <HeaderSA />
      <Routes>
        <Route path='/' element={<SAPage />} />
        <Route path='entity/*' element={<EntityRoute />} />
      </Routes>
    </>
  );
};

export default SARouter;
