import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Splash from './pages/Splash.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import History from './pages/History.jsx';

// Layouts
import DashboardLayout from './layouts/DashboardLayout.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />

        {/* Authenticated Routes wrapped in Sidebar Layout */}
        {/* We leave path empty here so children can use absolute paths like /dashboard and /history */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          {/* Add more authenticated pages here (e.g., /analytics, /settings) */}
        </Route>

        {/* Catch-all: Redirect unknown routes to Splash */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;