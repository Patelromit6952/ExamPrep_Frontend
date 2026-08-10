import Card from "./ui/Card.jsx";
import { BarChart3 } from "lucide-react";

export default function TopicPerformanceBar({ topics }) {
  if (!topics || topics.length === 0) {
    return (
      <Card className="p-6 text-center text-sm text-slate-500">
        Complete an exam to see your topic-wise performance here.
      </Card>
    );
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 className="w-4.5 h-4.5 text-navy-600" />
        <h3 className="font-display font-semibold text-navy-900">Topic-wise Performance</h3>
      </div>

      <div className="space-y-4">
        {topics.map((t) => (
          <div key={t.topic}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-medium text-navy-800">{t.topic}</span>
              <span className="text-slate-500">
                {t.correct}/{t.attempted} &middot;{" "}
                <span className={t.accuracy >= 60 ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                  {t.accuracy}%
                </span>
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full ${t.accuracy >= 60 ? "bg-green-500" : "bg-red-400"}`}
                style={{ width: `${t.accuracy}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
