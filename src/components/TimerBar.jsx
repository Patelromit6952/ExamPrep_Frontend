// import { Clock, GraduationCap, PanelRightOpen, AlertTriangle } from "lucide-react";
// import { cn } from "../utils/cn.js";

// export default function TimerBar({
//   examTitle,
//   formatted,
//   isCritical,
//   answeredCount,
//   totalCount,
//   onOpenPalette,
//   tabSwitchWarnings = 0,
//   maxTabSwitchWarnings = 3,
// }) {
//   return (
//     <header
//       className={cn(
//         "sticky top-0 z-30 flex items-center justify-between gap-3 px-4 sm:px-6 h-16 border-b shadow-card transition-colors",
//         isCritical ? "bg-red-600 border-red-700 text-white" : "bg-navy-800 border-navy-900 text-white"
//       )}
//     >
//       <div className="flex items-center gap-2 min-w-0">
//         <span className="hidden sm:flex items-center justify-center w-8 h-8 rounded-md bg-white/10 shrink-0">
//           <GraduationCap className="w-4.5 h-4.5" />
//         </span>
//         <div className="min-w-0">
//           <p className="text-sm font-semibold truncate">{examTitle}</p>
//           <p className="text-[11px] text-white/70 hidden sm:block">
//             {answeredCount} / {totalCount} answered
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center gap-3">
//         {tabSwitchWarnings > 0 && (
//           <div
//             className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-100 text-xs font-semibold"
//             title="Tab switch warnings"
//           >
//             <AlertTriangle className="w-3.5 h-3.5" />
//             {tabSwitchWarnings}/{maxTabSwitchWarnings} warnings
//           </div>
//         )}
//         <div
//           className={cn(
//             "flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-lg font-semibold tabular-nums",
//             isCritical ? "bg-white/15" : "bg-white/10"
//           )}
//         >
//           <Clock className={cn("w-4.5 h-4.5", isCritical && "animate-pulse-ring")} />
//           {formatted}
//         </div>
//         <button
//           onClick={onOpenPalette}
//           className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20"
//           aria-label="Open question palette"
//         >
//           <PanelRightOpen className="w-5 h-5" />
//         </button>
//       </div>
//     </header>
//   );
// }


import { Clock, GraduationCap, PanelRightOpen, AlertTriangle, Layers } from "lucide-react";
import { cn } from "../utils/cn.js";

export default function TimerBar({
  examTitle,
  formatted,
  isCritical,
  answeredCount,
  totalCount,
  onOpenPalette,
  tabSwitchWarnings = 0,
  maxTabSwitchWarnings = 3,
  sectionLabel,
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between gap-3 px-4 sm:px-6 h-16 border-b shadow-card transition-colors",
        isCritical ? "bg-red-600 border-red-700 text-white" : "bg-navy-800 border-navy-900 text-white"
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="hidden sm:flex items-center justify-center w-8 h-8 rounded-md bg-white/10 shrink-0">
          <GraduationCap className="w-4.5 h-4.5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{examTitle}</p>
          <p className="text-[11px] text-white/70  sm:flex items-center gap-1.5">
            {sectionLabel && (
              <>
                <Layers className="w-3 h-3" />
                <span className="font-medium">{sectionLabel}</span>
                <span className="text-white/40">&middot;</span>
              </>
            )}
            {answeredCount} / {totalCount} answered
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {tabSwitchWarnings > 0 && (
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-100 text-xs font-semibold"
            title="Tab switch warnings"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {tabSwitchWarnings}/{maxTabSwitchWarnings} warnings
          </div>
        )}
        <div
          className={cn(
            "flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-lg font-semibold tabular-nums",
            isCritical ? "bg-white/15" : "bg-white/10"
          )}
        >
          <Clock className={cn("w-4.5 h-4.5", isCritical && "animate-pulse-ring")} />
          {formatted}
        </div>
        <button
          onClick={onOpenPalette}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20"
          aria-label="Open question palette"
        >
          <PanelRightOpen className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}