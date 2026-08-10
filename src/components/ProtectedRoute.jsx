import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Spinner from "./ui/Spinner.jsx";

export default function ProtectedRoute() {
  const { isAuthenticated, initialCheckDone } = useAuth();
  const location = useLocation();

  if (!initialCheckDone) {
    return <Spinner full label="Checking your session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
