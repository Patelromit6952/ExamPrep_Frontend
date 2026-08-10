import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GraduationCap, LayoutDashboard, ListChecks, History, LogOut, Menu, X, ShieldCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth.js";
import { logoutUser } from "../features/auth/authSlice.js";
import { cn } from "../utils/cn.js";

const studentLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/exams", label: "Exams", icon: ListChecks },
  { to: "/history", label: "History", icon: History },
];

export default function Navbar() {
  const { user, isAdmin } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-navy-800 text-white shadow-elevated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <NavLink to="/dashboard" className="flex items-center gap-2 shrink-0">
            <span className="flex items-center justify-center w-8 h-8 rounded-md bg-gold-400 text-navy-900">
              <GraduationCap className="w-5 h-5" />
            </span>
            <span className="font-display font-bold text-lg tracking-tight">ExamPrep</span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {studentLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive ? "bg-white/10 text-white" : "text-navy-100 hover:bg-white/5"
                  )
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive ? "bg-gold-400/20 text-gold-300" : "text-gold-300/90 hover:bg-white/5"
                  )
                }
              >
                <ShieldCheck className="w-4 h-4" />
                Admin
              </NavLink>
            )}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="text-right leading-tight">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-navy-200 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-navy-100 hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <button
          className="md:hidden p-2 rounded-md hover:bg-white/10"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-navy-800 px-4 py-3 space-y-1">
          {studentLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium",
                  isActive ? "bg-white/10 text-white" : "text-navy-100"
                )
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-gold-300"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin
            </NavLink>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-navy-100"
          >
            <LogOut className="w-4 h-4" />
            Logout ({user?.name})
          </button>
        </div>
      )}
    </header>
  );
}
