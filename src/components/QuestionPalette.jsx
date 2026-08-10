import { STATUS_META, QUESTION_STATUS } from "../utils/constants.js";
import { cn } from "../utils/cn.js";

/**
 * Renders the numbered question grid with color-coded status, plus the
 * legend explaining each color. This is the single most recognizable piece
 * of UI on a real government-exam portal, so it gets the most polish.
 */
export default function QuestionPalette({ statuses, currentIndex, onNavigate, className }) {
  const counts = statuses.reduce((acc, s) => {
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="px-4 pt-4 pb-3 border-b border-slate-200">
        <h3 className="font-display font-semibold text-navy-900 text-sm">Question Palette</h3>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4">
        <div className="grid grid-cols-5 gap-2">
          {statuses.map((status, index) => {
            const meta = STATUS_META[status];
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => onNavigate(index)}
                aria-label={`Question ${index + 1}, ${meta.label}`}
                aria-current={isActive}
                className={cn(
                  "relative w-9 h-9 rounded-md text-xs font-semibold flex items-center justify-center border transition-transform",
                  "hover:scale-105 focus-visible:scale-105",
                  meta.chip,
                  isActive && "ring-2 ring-offset-1 ring-gold-500"
                )}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-4 space-y-2 text-xs">
        {Object.entries(STATUS_META).map(([key, meta]) => (
          <div key={key} className="flex items-center justify-between text-navy-700">
            <span className="flex items-center gap-2">
              <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", meta.dot)} />
              {meta.label}
            </span>
            <span className="font-mono text-slate-400">{counts[key] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { QUESTION_STATUS };
