import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import ForgotPassword from "./pages/forgotpass";
import ConfirmPassword from "./pages/ConfirmPassword"; 

//Admin imports
import AdminHome from "./pages/admin/admin_home";
import Menu from "./pages/admin/menu";
import Menuu from "./pages/admin/menuu";

//Customer imports
import CustomerHome from "./pages/customer/customerhome";
import CMenu from "./pages/customer/menu"; 
import Ccart from "./pages/customer/customercart";
import Corders from "./pages/customer/myorders";
import Mcategories from "./pages/customer/Mcategories";
import Profile from "./pages/customer/profile";

function App() {
  return (
    <Router basename="/Restaurant-Management-System">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />      
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ConfirmPassword />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/Mcategories" element={<Menu />} />
        <Route path="/admin/menu" element={<Menuu />} />

        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/customer/Mcategories" element={<Mcategories />} />
        <Route path="/customer/menu" element={<CMenu />} />
        <Route path="/customer/cart" element={<Ccart />} />
        <Route path="/customer/myorders" element={<Corders />} />
        <Route path="/customer/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
export default App;
