import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, FilePlus2, ArrowLeftCircle } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { cn } from "../utils/cn.js";

const adminLinks = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/exams/new", label: "Create Exam", icon: FilePlus2 },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row gap-6">
        <aside className="md:w-56 shrink-0">
          <div className="md:sticky md:top-24 bg-white rounded-xl border border-slate-200 shadow-card p-3">
            <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Admin Panel
            </p>
            <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
              {adminLinks.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                      isActive ? "bg-navy-700 text-white" : "text-navy-700 hover:bg-navy-50"
                    )
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              ))}
              <NavLink
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 whitespace-nowrap"
              >
                <ArrowLeftCircle className="w-4 h-4" />
                Student view
              </NavLink>
            </nav>
          </div>
        </aside>
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
