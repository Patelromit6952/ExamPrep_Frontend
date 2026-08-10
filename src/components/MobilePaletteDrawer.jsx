import { X } from "lucide-react";
import QuestionPalette from "./QuestionPalette.jsx";

export default function MobilePaletteDrawer({ open, onClose, ...paletteProps }) {
  if (!open) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-navy-950/50" onClick={onClose} />
      <div className="relative w-[85%] max-w-xs bg-white h-full shadow-elevated flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <p className="font-display font-semibold text-navy-900 text-sm">Navigate Questions</p>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-100" aria-label="Close palette">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <QuestionPalette
          {...paletteProps}
          onNavigate={(i) => {
            paletteProps.onNavigate(i);
            onClose();
          }}
          className="flex-1"
        />
      </div>
    </div>
  );
}
