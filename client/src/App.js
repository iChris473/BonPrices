
import {useContext} from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import AuthContext from './context/AuthContext'

// ROUTES FOR PUBLIC DOMAIN
import Home from "./pages/Home";
import Search from "./pages/Search";
import Description from "./pages/Description";

// ROUTES FOR FIELD AGENTS DOMAINS
import Index from "./adminPages/Index";
import NewField from "./adminPages/NewField";
import MyFields from "./adminPages/MyFields";
import AdminPassword from "./adminPages/AdminPassword";
import AdminEmail from "./adminPages/AdminEmail";
import AdminLogin from "./adminPages/AdminLogin";
import AdminProfile from "./adminPages/AdminProfile";
import UpdateField from "./adminPages/UpdateField";

// IMPORTS FOR SUPER ADMIN
import SuperAdminHome from "./superPages/Home"
import CreateAgent from './superPages/CreateAgent';
import SuperContext from './context/SuperContext';
import SuperLogin from './superPages/SuperLogin';
import TotalAgents from './superPages/TotalAgents';
import UpdateAgent from './superPages/UpdateAgent';
import AllProducts from './superPages/AllProducts';
import UpdateSuperProduct from './superPages/UpdateSuperProduct';
import SuperNewField from './superPages/SuperNewField';
import MySuperField from './superPages/MySuperField';
import Deactivated from './adminPages/Deactivated';


function App() {

  const mainUserProfile = window.location.href

  const {loggedIn} = useContext(mainUserProfile.includes('admin') ? AuthContext : SuperContext)

  return (
    <>
      <Routes>

        {/* PUBLIC DOMAIN ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/description" element={<Description/>} />

        {/* ADMIN ROUTES */}
        <Route path="/admin"  element={loggedIn ? <Index /> : <Navigate to="/admin/login" /> } />
        <Route path="/admin/newfield"  element={loggedIn ? <NewField /> : <Navigate to="/admin/login" /> } />
        <Route path="/admin/myfields"  element={loggedIn ? <MyFields /> : <Navigate to="/admin/login" /> } />
        <Route path="/admin/password"  element={loggedIn ? <AdminPassword /> : <Navigate to="/admin/login" /> } />
        <Route path="/admin/email"  element={loggedIn ? <AdminEmail /> : <Navigate to="/admin/login" /> } />
        <Route path="/admin/login"  element={!loggedIn ? <AdminLogin /> : <Navigate to="/admin" /> } />
        <Route path="/admin/profile"  element={loggedIn ? <AdminProfile /> : <Navigate to="/admin/login" /> } />
        <Route path="/admin/update"  element={loggedIn ? <UpdateField /> : <Navigate to="/admin/login" /> } />
        <Route path="/admin/deactivated"  element={ <Deactivated /> } />

        {/* SUPER ADMIN ROUTES */}
        <Route path="/super/page"  element={ loggedIn ? <SuperAdminHome /> : <Navigate to="/super/login" /> } /> 
        <Route path="/super/newagent"  element={ loggedIn ? <CreateAgent /> : <Navigate to="/super/login" /> } /> 
        <Route path="/super/login"  element={ !loggedIn ? <SuperLogin /> : <Navigate to="/super/page" /> } /> 
        <Route path="/super/myagents"  element={ loggedIn ? <TotalAgents /> : <Navigate to="/super/login" /> } /> 
        <Route path="/super/agemt/update"  element={ loggedIn ? <UpdateAgent /> : <Navigate to="/super/login" /> } /> 
        <Route path="/super/product/all"  element={ loggedIn ? <AllProducts /> : <Navigate to="/super/login" /> } /> 
        <Route path="/super/product/update"  element={ loggedIn ? <UpdateSuperProduct /> : <Navigate to="/super/login" /> } /> 
        <Route path="/super/newfield"  element={ loggedIn ? <SuperNewField /> : <Navigate to="/super/login" /> } /> 
        <Route path="/super/myfield"  element={ loggedIn ? <MySuperField /> : <Navigate to="/super/login" /> } /> 

      </Routes>
    </>
  );
}

export default App;
