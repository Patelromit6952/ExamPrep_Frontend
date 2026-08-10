import { useSelector } from "react-redux";

/** Convenience hook for reading auth state anywhere in the component tree. */
export function useAuth() {
  const { user, status, initialCheckDone, error } = useSelector((state) => state.auth);
  return {
    user,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === "admin",
    status,
    initialCheckDone,
    error,
  };
}
