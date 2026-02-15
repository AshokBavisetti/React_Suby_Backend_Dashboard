import "./App.css";
import NotFound from "./vendorDashboard/components/NotFound";
import LandingPage from "./vendorDashboard/pages/LandingPage";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
