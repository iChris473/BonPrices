

import {
  Routes,
  Route,
} from "react-router-dom";

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


function App() {

  const user = false

  return (
    <>
      <Routes>

        {/* PUBLIC DOMAIN ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/description" element={<Description/>} />

        {/* ADMIN ROUTES */}
        <Route path="/admin"  element={<Index />} />
        <Route path="/admin"  element={<Index />} />
        <Route path="/admin/newfield"  element={<NewField />} />
        <Route path="/admin/myfields"  element={<MyFields />} />
        <Route path="/admin/password"  element={<AdminPassword />} />
        <Route path="/admin/email"  element={<AdminEmail />} />
        <Route path="/admin/login"  element={<AdminLogin />} />
        <Route path="/admin/profile"  element={<AdminProfile />} />

      </Routes>
    </>
  );
}

export default App;
