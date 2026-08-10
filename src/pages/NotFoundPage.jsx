import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import Button from "../components/ui/Button.jsx";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-navy-700 text-gold-400 mb-5">
        <GraduationCap className="w-7 h-7" />
      </span>
      <h1 className="font-display text-5xl font-bold text-navy-900 mb-2">404</h1>
      <p className="text-slate-500 mb-6">This page doesn't exist or has been moved.</p>
      <Link to="/dashboard">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  );
}
