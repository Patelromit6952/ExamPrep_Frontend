import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn.js";

export default function Spinner({ className, full = false, label = "Loading..." }) {
  if (full) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-navy-600">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    );
  }
  return <Loader2 className={cn("w-5 h-5 animate-spin", className)} />;
}
