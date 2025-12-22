import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Overview from "./components/Dashboard/Overview";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Logout from "./components/Auth/Logout";
import TenantsList from "./components/Tenants/TenantsList";
import LeasesList from "./components/Leases/LeasesList";
import TenantDashboard from "./components/Tenants/TenantsDashboard/TenantDashboard";
import ChangePassword from "./components/Auth/ChangePassword";
import AnnouncementsAdmin from "./components/Announcements/AnnouncementsAdmin";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/logout" element={<Logout />} />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout>
                <Overview />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Pages */}
        <Route
          path="/tenants"
          element={
            <ProtectedRoute role="admin">
              <TenantsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leases"
          element={
            <ProtectedRoute role="admin">
              <LeasesList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/announcements"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout>
                <AnnouncementsAdmin />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />

        {/* Tenant Dashboard */}
        <Route
          path="/tenant/dashboard"
          element={
            <ProtectedRoute role="tenant">
              <TenantDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

