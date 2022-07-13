
import {useContext} from 'react';
import {
  Routes,
  Route,
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


function App() {

  const {loggedIn} = useContext(AuthContext)

  return (
    <>
      <Routes>

        {/* PUBLIC DOMAIN ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/description" element={<Description/>} />

        {/* ADMIN ROUTES */}
        <Route path="/admin"  element={loggedIn ? <Index /> : <AdminLogin /> } />
        <Route path="/admin"  element={loggedIn ? <Index /> : <AdminLogin /> } />
        <Route path="/admin/newfield"  element={loggedIn ? <NewField /> : <AdminLogin /> } />
        <Route path="/admin/myfields"  element={loggedIn ? <MyFields /> : <AdminLogin /> } />
        <Route path="/admin/password"  element={loggedIn ? <AdminPassword /> : <AdminLogin /> } />
        <Route path="/admin/email"  element={loggedIn ? <AdminEmail /> : <AdminLogin /> } />
        <Route path="/admin/login"  element={loggedIn ? <Index /> : <AdminLogin /> } />
        <Route path="/admin/profile"  element={loggedIn ? <AdminProfile /> : <AdminLogin /> } />
        <Route path="/admin/update"  element={loggedIn ? <UpdateField /> : <AdminLogin /> } />

      </Routes>
    </>
  );
}

export default App;
