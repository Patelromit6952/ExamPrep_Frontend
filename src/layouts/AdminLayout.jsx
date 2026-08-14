// // import { NavLink, Outlet } from "react-router-dom";
// // import { LayoutDashboard, FilePlus2, ArrowLeftCircle } from "lucide-react";
// // import Navbar from "../components/Navbar.jsx";
// // import { cn } from "../utils/cn.js";

// // const adminLinks = [
// //   { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
// //   { to: "/admin/exams/new", label: "Create Exam", icon: FilePlus2 },
// // ];

// // export default function AdminLayout() {
// //   return (
// //     <div className="min-h-screen flex flex-col bg-slate-50">
// //       <Navbar />
// //       <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row gap-6">
// //         <aside className="md:w-56 shrink-0">
// //           <div className="md:sticky md:top-24 bg-white rounded-xl border border-slate-200 shadow-card p-3">
// //             <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
// //               Admin Panel
// //             </p>
// //             <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
// //               {adminLinks.map(({ to, label, icon: Icon, end }) => (
// //                 <NavLink
// //                   key={to}
// //                   to={to}
// //                   end={end}
// //                   className={({ isActive }) =>
// //                     cn(
// //                       "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
// //                       isActive ? "bg-navy-700 text-white" : "text-navy-700 hover:bg-navy-50"
// //                     )
// //                   }
// //                 >
// //                   <Icon className="w-4 h-4" />
// //                   {label}
// //                 </NavLink>
// //               ))}
// //               <NavLink
// //                 to="/dashboard"
// //                 className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 whitespace-nowrap"
// //               >
// //                 <ArrowLeftCircle className="w-4 h-4" />
// //                 Student view
// //               </NavLink>
// //             </nav>
// //           </div>
// //         </aside>
// //         <div className="flex-1 min-w-0">
// //           <Outlet />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { NavLink, Outlet } from "react-router-dom";
// import { LayoutDashboard, FilePlus2, ArrowLeftCircle, Tag, Receipt } from "lucide-react";
// import Navbar from "../components/Navbar.jsx";
// import { cn } from "../utils/cn.js";

// const adminLinks = [
//   { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
//   { to: "/admin/exams/new", label: "Create Exam", icon: FilePlus2 },
//   { to: "/admin/plans", label: "Plans", icon: Tag },
//   { to: "/admin/subscriptions", label: "Payments", icon: Receipt },
// ];

// export default function AdminLayout() {
//   return (
//     <div className="min-h-screen flex flex-col bg-slate-50">
//       <Navbar />
//       <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row gap-6">
//         <aside className="md:w-56 shrink-0">
//           <div className="md:sticky md:top-24 bg-white rounded-xl border border-slate-200 shadow-card p-3">
//             <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
//               Admin Panel
//             </p>
//             <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
//               {adminLinks.map(({ to, label, icon: Icon, end }) => (
//                 <NavLink
//                   key={to}
//                   to={to}
//                   end={end}
//                   className={({ isActive }) =>
//                     cn(
//                       "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
//                       isActive ? "bg-navy-700 text-white" : "text-navy-700 hover:bg-navy-50"
//                     )
//                   }
//                 >
//                   <Icon className="w-4 h-4" />
//                   {label}
//                 </NavLink>
//               ))}
//               <NavLink
//                 to="/dashboard"
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 whitespace-nowrap"
//               >
//                 <ArrowLeftCircle className="w-4 h-4" />
//                 Student view
//               </NavLink>
//             </nav>
//           </div>
//         </aside>
//         <div className="flex-1 min-w-0">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }


import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, FilePlus2, ArrowLeftCircle, Tag, Receipt } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { cn } from "../utils/cn.js";

const adminLinks = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/exams/new", label: "Create Exam", icon: FilePlus2 },
  { to: "/admin/plans", label: "Plans", icon: Tag },
  { to: "/admin/subscriptions", label: "Payments", icon: Receipt },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Main Container */}
      <div className="flex-1 w-full max-w-8xl mx-auto flex flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="md:w-64 shrink-0 bg-white md:bg-transparent border-b md:border-b-0 md:border-r border-slate-200">
          <div className="md:sticky md:top-20 p-4 md:py-8 md:pr-8 md:pl-4 flex flex-col gap-6">

            <div className="hidden md:block">
              <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Admin Panel
              </p>
            </div>

            {/* Navigation Links */}
            <nav className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
              {adminLinks.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200",
                      isActive
                        ? "bg-white shadow-sm ring-1 ring-slate-200/60 text-navy-900"
                        : "text-slate-500 hover:text-navy-900 hover:bg-slate-200/50"
                    )
                  }
                >
                  <Icon className={cn("w-4 h-4 shrink-0", "opacity-80")} />
                  {label}
                </NavLink>
              ))}

              {/* Mobile-only Student View Link (inline with top nav) */}
              <div className="md:hidden block w-[1px] h-6 bg-slate-200 mx-2 self-center shrink-0" />
              <NavLink
                to="/dashboard"
                className="md:hidden flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-500 hover:bg-slate-100 whitespace-nowrap"
              >
                <ArrowLeftCircle className="w-4 h-4" />
                Student View
              </NavLink>
            </nav>

            {/* Desktop-only Student View Link (separated at the bottom) */}
            <div className="hidden md:block pt-4 border-t border-slate-200/60">
              <NavLink
                to="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-500 hover:text-navy-900 hover:bg-slate-200/50 transition-colors"
              >
                <ArrowLeftCircle className="w-4 h-4 opacity-80" />
                Return to Student View
              </NavLink>
            </div>

          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8">
          <div className="w-full">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}