import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import ForgotPassword from "./pages/forgotpass";
import ConfirmPassword from "./pages/ConfirmPassword"; 

//Admin imports
import AdminHome from "./pages/admin/admin_home";
import AddItem from "./pages/admin/additem";
import Menu from "./pages/admin/menu";
import DeleteItem from "./pages/admin/deleteitem";





//Customer imports
import CustomerHome from "./pages/customer/customerhome";
import CMenu from "./pages/customer/menu"; 
import Ccart from "./pages/customer/customercart";
import Corders from "./pages/customer/myorders";




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
        


        {/*Customer routes*/}
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/customer/menu" element={<CMenu />} /> 
        <Route path="/customer/cart" element={<Ccart />} />
        <Route path="/customer/myorders" element={<Corders />} />
      </Routes>
    </Router>
  );
}
export default App;

