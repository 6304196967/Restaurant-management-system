import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import ForgotPassword from "./pages/forgotpass";
import ConfirmPassword from "./pages/ConfirmPassword"; 

//Admin routes
import AdminHome from "./pages/admin/admin_home";
import AddItem from "./pages/admin/additem";
import Menu from "./pages/admin/menu";
import DeleteItem from "./pages/admin/deleteitem";
import Specialoffers from "./pages/admin/specialoffers";
import Spadditem from "./pages/admin/addspecialoffer";
import Spdeleteitem from "./pages/admin/delspecialoffers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />      
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password/:token" element={<ConfirmPassword />} />
        {/*Admin routes*/}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/menu" element={<Menu />} />
        <Route path="/admin/menu/additem" element={<AddItem />} />
        <Route path="/admin/menu/deleteitem" element={<DeleteItem />} />
        <Route path="/admin/specialoffers" element={<Specialoffers />} />
        <Route path="/admin/specialoffers/additem" element={<Spadditem />} />
        <Route path="/admin/specialoffers/deleteitem" element={<Spdeleteitem />} />

      </Routes>
    </Router>
  );
}
export default App;

