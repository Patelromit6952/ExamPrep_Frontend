import React from "react";
import { cn } from "../../utils/cn.js";

export const Select = React.forwardRef(({ label, error, className, id, children, ...props }, ref) => {
  const selectId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-navy-800">
          {label}
        </label>
      )}
      <select
        id={selectId}
        ref={ref}
        className={cn(
          "w-full rounded-lg border px-3.5 py-2.5 text-sm text-navy-900 bg-white",
          "transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500/30 focus:border-navy-500",
          error ? "border-red-400" : "border-slate-300",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
});
Select.displayName = "Select";

export const Textarea = React.forwardRef(({ label, error, className, id, ...props }, ref) => {
  const areaId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={areaId} className="text-sm font-medium text-navy-800">
          {label}
        </label>
      )}
      <textarea
        id={areaId}
        ref={ref}
        className={cn(
          "w-full rounded-lg border px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 bg-white",
          "transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500/30 focus:border-navy-500 resize-y",
          error ? "border-red-400" : "border-slate-300",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
});
Textarea.displayName = "Textarea";
