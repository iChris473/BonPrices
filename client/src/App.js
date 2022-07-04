

import {
  Routes,
  Route,
} from "react-router-dom";

// ROUTES FOR PUBLIC DOMAIN
import Home from "./pages/Home";
import Search from "./pages/Search";
import Description from "./pages/Description";


function App() {

  return (
    <>
      <Routes>
        {/* PUBLIC DOMAIN ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/description" element={<Description/>} />
      </Routes>
    </>
  );
}

export default App;
