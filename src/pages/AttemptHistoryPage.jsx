import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { attemptService } from "../services/attemptService.js";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import Spinner from "../components/ui/Spinner.jsx";

export default function AttemptHistoryPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    attemptService.history().then(setAttempts).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner full label="Loading your attempt history..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-900">Attempt History</h1>
        <p className="text-sm text-slate-500 mt-1">Review every mock test you've completed.</p>
      </div>

      {attempts.length === 0 ? (
        <Card className="p-10 text-center text-sm text-slate-400">
          You haven't completed any exams yet.{" "}
          <Link to="/exams" className="text-navy-600 font-semibold hover:underline">
            Browse exams
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {attempts.map((a) => {
            const percentage =
              a.examId?.totalMarks > 0 ? Math.max(0, Math.round((a.score / a.examId.totalMarks) * 100)) : 0;
            return (
              <Link key={a._id} to={`/result/${a._id}`}>
                <Card className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:shadow-elevated transition-shadow">
                  <div className="min-w-0">
                    <p className="font-medium text-navy-900 truncate">{a.examId?.title}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant={a.status === "auto-submitted" ? "slate" : "navy"}>
                        {a.status === "auto-submitted" ? "Auto-submitted" : "Submitted"}
                      </Badge>
                      <span className="text-xs text-slate-400">
                        {new Date(a.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="font-display font-bold text-navy-900">
                        {a.score} / {a.examId?.totalMarks}
                      </p>
                      <p className={`text-xs font-semibold ${percentage >= 50 ? "text-green-600" : "text-red-500"}`}>
                        {percentage}%
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
