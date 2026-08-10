import { cn } from "../../utils/cn.js";

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn("bg-white rounded-xl border border-slate-200 shadow-card", className)}
      {...props}
    >
      {children}
    </div>
  );
}
