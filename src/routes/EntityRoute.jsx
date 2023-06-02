import { Routes, Route } from "react-router";
import FooterSA from "../components/FooterSA";
import EntityCreate from "../pages/EntityCreate";
import EntityEdit from "../pages/EntityEdit";
import EntityPage from "../pages/EntityPage";
import EntityDelete from "../pages/EntityDelete";
import ListUsers from "../pages/Users/listUsers";
const EntityRoute = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<EntityPage />} />
        <Route path="/users" element={<ListUsers/>}></Route>
        {/* <Route path='create' element={<EntityCreate />} />
        <Route path='edit' element={<EntityEdit />} />
        <Route path='delete' element={<EntityDelete />} /> */}
      </Routes>
      <FooterSA />
    </>
  );
};

export default EntityRoute;
