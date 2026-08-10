import { Outlet } from "react-router-dom";

export default function ExamLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Outlet />
    </div>
  );
}
