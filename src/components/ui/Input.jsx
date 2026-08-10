import React from "react";
import { cn } from "../../utils/cn.js";

const Input = React.forwardRef(({ label, error, className, id, ...props }, ref) => {
  const inputId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-navy-800">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={cn(
          "w-full rounded-lg border px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate-400",
          "bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500/30 focus:border-navy-500",
          error ? "border-red-400" : "border-slate-300",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
