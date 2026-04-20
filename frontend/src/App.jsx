import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AircraftType from "./pages/AircraftTypes";
import FleetManagement from "./pages/FleetManagement";
import FlightMonitor from "./pages/FlightMonitor";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<FlightMonitor />} />
          <Route path="fleet" element={<FleetManagement />} />
          <Route path="types" element={<AircraftType />} />
          <Route path="*" element={<h1>Page Not Found 404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
