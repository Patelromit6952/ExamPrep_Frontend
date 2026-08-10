import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn.js";

const VARIANTS = {
  primary: "bg-navy-700 text-white hover:bg-navy-800 active:bg-navy-900 shadow-card",
  secondary: "bg-white text-navy-700 border border-slate-300 hover:bg-slate-50",
  gold: "bg-gold-400 text-navy-900 hover:bg-gold-500 shadow-card",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "bg-transparent text-navy-700 hover:bg-navy-50",
  outline: "bg-transparent text-white border border-white/40 hover:bg-white/10",
};

const SIZES = {
  sm: "text-sm px-3 py-1.5 rounded-md gap-1.5",
  md: "text-sm px-4 py-2.5 rounded-lg gap-2",
  lg: "text-base px-6 py-3 rounded-lg gap-2",
};

const Button = React.forwardRef(
  (
    { children, variant = "primary", size = "md", className, isLoading, disabled, icon: Icon, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors duration-150",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          VARIANTS[variant],
          SIZES[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : Icon ? (
          <Icon className="w-4 h-4" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
