import { useState } from "react";
import { Plus, Trash2, Layers } from "lucide-react";
import Card from "./ui/Card.jsx";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import { examService } from "../services/examService.js";

export default function SectionManager({ examId, sections, onChange }) {
  const [title, setTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsAdding(true);
    try {
      await examService.createSection(examId, { title: title.trim() });
      setTitle("");
      onChange?.();
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (sectionId) => {
    await examService.removeSection(examId, sectionId);
    onChange?.();
  };

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-4.5 h-4.5 text-navy-600" />
        <h3 className="font-display font-semibold text-navy-900">Sections</h3>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <Input
          placeholder="e.g. Quantitative Aptitude"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1"
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
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200"
            >
              <span className="text-sm font-medium text-navy-800">{s.title}</span>
              <button
                onClick={() => handleDelete(s._id)}
                className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50"
                aria-label={`Delete ${s.title}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
