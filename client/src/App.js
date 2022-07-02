

import {
  Routes,
  Route,
} from "react-router-dom";

// ROUTES FOR PUBLIC DOMAIN
import Home from "./pages/Home";


function App() {

  return (
    <>
      <Routes>
        {/* PUBLIC DOMAIN ROUTES */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
