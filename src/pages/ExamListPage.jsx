import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { examService } from "../services/examService.js";
import { EXAM_CATEGORIES } from "../utils/constants.js";
import ExamCard from "../components/ExamCard.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import { cn } from "../utils/cn.js";

export default function ExamListPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    examService.list().then(setExams).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return exams.filter((e) => {
      const matchesQuery = e.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || e.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [exams, query, category]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-900">Available Exams</h1>
        <p className="text-sm text-slate-500 mt-1">Pick a mock test and start practicing.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exams..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-500/30 focus:border-navy-500"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-thin pb-1 sm:pb-0">
          {["All", ...EXAM_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap border transition-colors",
                category === cat
                  ? "bg-navy-700 text-white border-navy-700"
                  : "bg-white text-navy-600 border-slate-300 hover:bg-navy-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Spinner full />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-sm">No exams match your search.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((exam) => (
            <ExamCard key={exam._id} exam={exam} />
          ))}
        </div>
      )}
    </div>
  );
}
