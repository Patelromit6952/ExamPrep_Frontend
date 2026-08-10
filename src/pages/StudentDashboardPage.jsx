import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListChecks, History, TrendingUp, ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/useAuth.js";
import { attemptService } from "../services/attemptService.js";
import { examService } from "../services/examService.js";
import Card from "../components/ui/Card.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import Badge from "../components/ui/Badge.jsx";
import TopicPerformanceBar from "../components/TopicPerformanceBar.jsx";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [topics, setTopics] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [historyData, topicData, examData] = await Promise.all([
          attemptService.history(),
          attemptService.topicPerformance(),
          examService.list(),
        ]);
        setHistory(historyData);
        setTopics(topicData);
        setExams(examData);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Spinner full label="Loading your dashboard..." />;

  const attemptsTaken = history.length;
  const avgScore = attemptsTaken
    ? Math.round(
        (history.reduce((sum, a) => sum + a.score / (a.examId?.totalMarks || 1), 0) / attemptsTaken) * 100
      )
    : null;
  const recentHistory = history.slice(0, 4);
  const recommendedExams = exams.filter((e) => e.isPublished).slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-900">Welcome back, {user?.name?.split(" ")[0]}</h1>
        <p className="text-sm text-slate-500 mt-1">Here's how your preparation is going.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-navy-50 text-navy-700 shrink-0">
            <History className="w-5 h-5" />
          </span>
          <div>
            <p className="text-2xl font-display font-bold text-navy-900">{attemptsTaken}</p>
            <p className="text-xs text-slate-500">Exams attempted</p>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-gold-50 text-gold-600 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </span>
          <div>
            <p className="text-2xl font-display font-bold text-navy-900">
              {avgScore !== null ? `${avgScore}%` : "—"}
            </p>
            <p className="text-xs text-slate-500">Average score</p>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-green-50 text-green-700 shrink-0">
            <ListChecks className="w-5 h-5" />
          </span>
          <div>
            <p className="text-2xl font-display font-bold text-navy-900">{exams.filter((e) => e.isPublished).length}</p>
            <p className="text-xs text-slate-500">Exams available</p>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-navy-900">Recommended Exams</h2>
            <Link to="/exams" className="text-xs font-semibold text-navy-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recommendedExams.length === 0 ? (
            <p className="text-sm text-slate-400">No exams available yet. Check back soon.</p>
          ) : (
            <ul className="space-y-3">
              {recommendedExams.map((exam) => (
                <li key={exam._id}>
                  <Link
                    to={`/exams/${exam._id}`}
                    className="flex items-center justify-between px-3.5 py-3 rounded-lg border border-slate-200 hover:border-navy-300 hover:bg-navy-50/40 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-navy-800">{exam.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {exam.durationMinutes} min &middot; {exam.questionCount} questions
                      </p>
                    </div>
                    <Badge variant="navy">{exam.category}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-navy-900">Recent Attempts</h2>
            <Link to="/history" className="text-xs font-semibold text-navy-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recentHistory.length === 0 ? (
            <p className="text-sm text-slate-400">You haven't attempted any exams yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentHistory.map((a) => (
                <li key={a._id}>
                  <Link
                    to={`/result/${a._id}`}
                    className="flex items-center justify-between px-3.5 py-3 rounded-lg border border-slate-200 hover:border-navy-300 hover:bg-navy-50/40 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-navy-800">{a.examId?.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {new Date(a.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-navy-700">
                      {a.score} / {a.examId?.totalMarks}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <TopicPerformanceBar topics={topics} />
    </div>
  );
}
