// import { useState } from "react";
// import { Plus, Trash2, Layers } from "lucide-react";
// import Card from "./ui/Card.jsx";
// import Button from "./ui/Button.jsx";
// import Input from "./ui/Input.jsx";
// import { examService } from "../services/examService.js";

// export default function SectionManager({ examId, sections, onChange }) {
//   const [title, setTitle] = useState("");
//   const [isAdding, setIsAdding] = useState(false);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;
//     setIsAdding(true);
//     try {
//       await examService.createSection(examId, { title: title.trim() });
//       setTitle("");
//       onChange?.();
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   const handleDelete = async (sectionId) => {
//     await examService.removeSection(examId, sectionId);
//     onChange?.();
//   };

//   return (
//     <Card className="p-5">
//       <div className="flex items-center gap-2 mb-4">
//         <Layers className="w-4.5 h-4.5 text-navy-600" />
//         <h3 className="font-display font-semibold text-navy-900">Sections</h3>
//       </div>

//       <form onSubmit={handleAdd} className="flex gap-2 mb-4">
//         <Input
//           placeholder="e.g. Quantitative Aptitude"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="flex-1"
//         />
//         <Button type="submit" size="md" icon={Plus} isLoading={isAdding}>
//           Add
//         </Button>
//       </form>

//       {sections.length === 0 ? (
//         <p className="text-sm text-slate-400">
//           No sections yet — questions can still be added without one.
//         </p>
//       ) : (
//         <ul className="space-y-2">
//           {sections.map((s) => (
//             <li
//               key={s._id}
//               className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200"
//             >
//               <span className="text-sm font-medium text-navy-800">{s.title}</span>
//               <button
//                 onClick={() => handleDelete(s._id)}
//                 className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50"
//                 aria-label={`Delete ${s.title}`}
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </Card>
//   );
// }


import { useState } from "react";
import { Plus, Trash2, Layers, Clock } from "lucide-react";
import Card from "./ui/Card.jsx";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import { examService } from "../services/examService.js";

export default function SectionManager({ examId, sections, onChange, isSectionTimed, examDurationMinutes = 0 }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const totalSectionMinutes = sections.reduce((sum, section) => sum + (Number(section.durationMinutes) || 0), 0);
  const durationLimitExceeded = isSectionTimed && examDurationMinutes > 0 && totalSectionMinutes > examDurationMinutes;

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsAdding(true);
    try {
      await examService.createSection(examId, {
        title: title.trim(),
        durationMinutes: duration ? Number(duration) : null,
      });
      setTitle("");
      setDuration("");
      onChange?.();
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (sectionId) => {
    await examService.removeSection(examId, sectionId);
    onChange?.();
  };

  const handleDurationBlur = async (section, value) => {
    const nextDuration = value ? Number(value) : null;
    if (nextDuration === (section.durationMinutes || null)) return;
    await examService.updateSection(examId, section._id, { durationMinutes: nextDuration });
    onChange?.();
  };

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-1">
        <Layers className="w-4.5 h-4.5 text-navy-600" />
        <h3 className="font-display font-semibold text-navy-900">Sections</h3>
      </div>
      {isSectionTimed && (
        <>
          <p className="text-xs text-gold-700 bg-gold-50 border border-gold-200 rounded-md px-2.5 py-1.5 mt-2 mb-1">
            Section-wise timing is on for this exam — every section with questions needs its own
            duration before you can publish.
          </p>
          <div className="text-xs text-slate-600 mb-2">
            Total section time: <span className={durationLimitExceeded ? "font-semibold text-red-600" : "font-semibold text-navy-700"}>{totalSectionMinutes}</span> / {examDurationMinutes} minutes
          </div>
        </>
      )}

      <form onSubmit={handleAdd} className="flex gap-2 mb-4 mt-3">
        <Input
          placeholder="e.g. Quantitative Aptitude"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1"
        />
        <Input
          type="number"
          min="1"
          placeholder="Minutes"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-28"
        />
        <Button type="submit" size="md" icon={Plus} isLoading={isAdding}>
          Add
        </Button>
      </form>

      {sections.length === 0 ? (
        <p className="text-sm text-slate-400">
          No sections yet — questions can still be added without one.
        </p>
      ) : (
        <ul className="space-y-2">
          {sections.map((s) => (
            <li
              key={s._id}
              className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200"
            >
              <span className="text-sm font-medium text-navy-800">{s.title}</span>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <input
                    type="number"
                    min="1"
                    defaultValue={s.durationMinutes || ""}
                    placeholder="min"
                    onBlur={(e) => handleDurationBlur(s, e.target.value)}
                    className="w-16 text-sm border border-slate-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-navy-500/30 focus:border-navy-500"
                  />
                </div>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50"
                  aria-label={`Delete ${s.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}