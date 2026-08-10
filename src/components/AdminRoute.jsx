import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Spinner from "./ui/Spinner.jsx";

export default function AdminRoute() {
  const { isAuthenticated, isAdmin, initialCheckDone } = useAuth();

  if (!initialCheckDone) {
    return <Spinner full label="Checking your session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
