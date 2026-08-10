import { cn } from "../../utils/cn.js";

const VARIANTS = {
  navy: "bg-navy-100 text-navy-700",
  gold: "bg-gold-100 text-gold-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  slate: "bg-slate-100 text-slate-600",
};

export default function Badge({ children, variant = "navy", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
