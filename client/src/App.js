

import {
  Routes,
  Route,
} from "react-router-dom";

// ROUTES FOR PUBLIC DOMAIN
import Home from "./pages/Home";
import Search from "./pages/Search";


function App() {

  return (
    <>
      <Routes>
        {/* PUBLIC DOMAIN ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
