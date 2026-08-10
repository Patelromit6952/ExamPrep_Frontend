import { CheckCircle2, XCircle, MinusCircle, Award } from "lucide-react";
import Card from "./ui/Card.jsx";

export default function ResultSummaryCard({ attempt, exam }) {
  const percentage = exam.totalMarks > 0 ? Math.max(0, Math.round((attempt.score / exam.totalMarks) * 100)) : 0;

  const stats = [
    { label: "Correct", value: attempt.correctCount, icon: CheckCircle2, tone: "text-green-600 bg-green-50" },
    { label: "Wrong", value: attempt.wrongCount, icon: XCircle, tone: "text-red-600 bg-red-50" },
    { label: "Unanswered", value: attempt.unansweredCount, icon: MinusCircle, tone: "text-slate-500 bg-slate-100" },
  ];

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative shrink-0">
          <svg viewBox="0 0 120 120" className="w-32 h-32 -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="12" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={percentage >= 50 ? "#16a34a" : "#dc4545"}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={2 * Math.PI * 52 * (1 - percentage / 100)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-display font-bold text-navy-900">{percentage}%</span>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-gold-500" />
            <p className="text-sm font-medium text-slate-500">Your Score</p>
          </div>
          <p className="text-3xl font-display font-bold text-navy-900 mb-4">
            {attempt.score} <span className="text-lg font-medium text-slate-400">/ {exam.totalMarks}</span>
          </p>

          <div className="grid grid-cols-3 gap-3">
            {stats.map(({ label, value, icon: Icon, tone }) => (
              <div key={label} className={`rounded-lg px-3 py-3 text-center ${tone}`}>
                <Icon className="w-4 h-4 mx-auto mb-1" />
                <p className="text-lg font-bold">{value}</p>
                <p className="text-[11px] font-medium opacity-80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
