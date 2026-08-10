import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { examService } from "../services/examService.js";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import Spinner from "../components/ui/Spinner.jsx";

export default function AdminExamAttemptsPage() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([examService.getById(examId), examService.getExamAttempts(examId)]).then(
      ([examData, attemptData]) => {
        setExam(examData.exam);
        setAttempts(attemptData);
      }
    ).finally(() => setLoading(false));
  }, [examId]);

  if (loading) return <Spinner full label="Loading attempts..." />;

  const avgScore = attempts.length
    ? Math.round((attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length) * 100) / 100
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm text-navy-600 hover:underline mb-2">
          <ArrowLeft className="w-4 h-4" />
          Back to exams
        </Link>
        <h1 className="font-display text-2xl font-bold text-navy-900">{exam.title}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {attempts.length} attempt{attempts.length === 1 ? "" : "s"} &middot; Average score: {avgScore} /{" "}
          {exam.totalMarks}
        </p>
      </div>

      {attempts.length === 0 ? (
        <Card className="p-10 text-center text-sm text-slate-400 flex flex-col items-center gap-2">
          <Users className="w-6 h-6 text-slate-300" />
          No student has attempted this exam yet.
        </Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3 font-semibold">Rank</th>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Score</th>
                <th className="px-4 py-3 font-semibold">Correct</th>
                <th className="px-4 py-3 font-semibold">Wrong</th>
                <th className="px-4 py-3 font-semibold">Unanswered</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a, i) => (
                <tr key={a._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-navy-500">#{i + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy-900">{a.userId?.name}</p>
                    <p className="text-xs text-slate-400">{a.userId?.email}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold text-navy-800">
                    {a.score} / {exam.totalMarks}
                  </td>
                  <td className="px-4 py-3 text-green-600">{a.correctCount}</td>
                  <td className="px-4 py-3 text-red-500">{a.wrongCount}</td>
                  <td className="px-4 py-3 text-slate-500">{a.unansweredCount}</td>
                  <td className="px-4 py-3">
                    <Badge variant={a.status === "auto-submitted" ? "slate" : "green"}>
                      {a.status === "auto-submitted" ? "Auto" : "Manual"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                    {new Date(a.submittedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
