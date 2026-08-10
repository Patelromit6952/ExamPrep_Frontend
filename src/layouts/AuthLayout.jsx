import { Outlet } from "react-router-dom";
import { GraduationCap, CheckCircle2 } from "lucide-react";

const highlights = [
  "Full-length mock tests for SSC, Banking, Railway, GPSC & UPSC prelims",
  "Real exam interface with palette, timer and negative marking",
  "Topic-wise performance analysis after every attempt",
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-slate-50">
      <div className="relative hidden md:flex flex-col justify-between bg-navy-800 text-white px-12 py-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative flex items-center gap-2">
          <span className="flex items-center justify-center w-9 h-9 rounded-md bg-gold-400 text-navy-900">
            <GraduationCap className="w-5 h-5" />
          </span>
          <span className="font-display font-bold text-xl tracking-tight">ExamPrep</span>
        </div>

        <div className="relative space-y-8 max-w-md">
          <h1 className="font-display text-4xl font-bold leading-tight">
            Practice like it's <span className="text-gold-400">exam day.</span>
          </h1>
          <p className="text-navy-200 text-base leading-relaxed">
            A no-nonsense mock test platform built for competitive government exam aspirants —
            timed sections, negative marking, and the same palette-driven interface you'll see on
            exam day.
          </p>
          <ul className="space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-navy-100">
                <CheckCircle2 className="w-4.5 h-4.5 text-gold-400 shrink-0 mt-0.5" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-navy-300">
          © {new Date().getFullYear()} ExamPrep. Built for serious aspirants.
        </p>
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="md:hidden flex items-center gap-2 justify-center mb-8">
            <span className="flex items-center justify-center w-9 h-9 rounded-md bg-navy-700 text-gold-400">
              <GraduationCap className="w-5 h-5" />
            </span>
            <span className="font-display font-bold text-xl text-navy-900">ExamPrep</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
