import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, Flag, AlertTriangle, BarChart3 } from "lucide-react";
import { attemptService } from "../services/attemptService.js";
import ResultSummaryCard from "../components/ResultSummaryCard.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";

const AUTO_SUBMIT_MESSAGES = {
  "time-expired": "Time ran out, so your exam was submitted automatically.",
  "tab-switch-warnings":
    "Your exam was submitted automatically after 3 tab-switch warnings.",
  "tab-switch-timeout":
    "Your exam was submitted automatically because you left the exam tab for more than 5 seconds.",
};

export default function ResultPage() {
  const { attemptId } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const autoSubmitReason = location.state?.autoSubmitReason;

  useEffect(() => {
    let isMounted = true;

    attemptService
      .get(attemptId)
      .then((result) => {
        if (!isMounted) return;
        setData(result);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Could not load your result.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [attemptId]);

  const { attempt, exam, questions, answers, sections = [] } = data || {};
  const answerMap = new Map((answers || []).map((a) => [String(a.questionId), a]));
  const sectionTitleMap = useMemo(
    () => new Map((sections || []).map((section) => [String(section._id), section.title])),
    [sections]
  );

  const sectionGroups = useMemo(() => {
    const groups = new Map();
    const questionList = questions || [];

    questionList.forEach((q) => {
      const key = q.sectionId ? String(q.sectionId) : "overall";
      if (!groups.has(key)) {
        groups.set(key, {
          key,
          title: q.sectionId ? sectionTitleMap.get(key) || `Section ${groups.size + 1}` : "Overall",
          questions: [],
          correct: 0,
          wrong: 0,
          unanswered: 0,
        });
      }

      const group = groups.get(key);
      const answer = answerMap.get(String(q._id));
      const isCorrect = answer?.selectedOptionId === q.correctOptionId;

      if (!answer?.isAnswered) group.unanswered += 1;
      else if (isCorrect) group.correct += 1;
      else group.wrong += 1;

      group.questions.push({ q, answer, isCorrect });
    });

    return Array.from(groups.values());
  }, [questions, answerMap, sectionTitleMap]);

  if (loading) return <Spinner full label="Loading your result..." />;
  if (error) return <p className="text-center text-red-600 py-16">{error}</p>;
  if (!data || !attempt || !exam) {
    return <p className="text-center text-red-600 py-16">Could not load this result.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/history" className="inline-flex items-center gap-1.5 text-sm text-navy-600 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to history
      </Link>

      {autoSubmitReason && AUTO_SUBMIT_MESSAGES[autoSubmitReason] && (
        <div className="flex items-start gap-3 rounded-lg bg-gold-50 border border-gold-200 px-4 py-3.5">
          <AlertTriangle className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
          <p className="text-sm text-gold-800">{AUTO_SUBMIT_MESSAGES[autoSubmitReason]}</p>
        </div>
      )}

      <div>
        <h1 className="font-display text-2xl font-bold text-navy-900">{exam.title}</h1>
        <p className="text-sm text-slate-500 mt-1">
          Submitted on {new Date(attempt.submittedAt).toLocaleString()}
        </p>
      </div>

      <ResultSummaryCard attempt={attempt} exam={exam} />

      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 className="w-4 h-4 text-navy-600" />
          <h2 className="font-display text-lg font-semibold text-navy-900">Section-wise Performance</h2>
        </div>

        <div className="space-y-4">
          {sectionGroups.map((section) => {
            console.log(section.title);
            
            const total = section.questions.length;
            const percent = total ? Math.round((section.correct / total) * 100) : 0;            

            return (
              <div key={section.key}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-medium text-navy-800">{section.title}</span>
                  <span className="text-slate-500">
                    {section.correct}/{total} • <span className={percent >= 60 ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>{percent}%</span>
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${percent >= 60 ? "bg-green-500" : "bg-red-400"}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-navy-900">Answer Review</h2>
      </div>

      <div className="space-y-5">
        {sectionGroups.map((section) => (
          <Card key={section.key} className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <p className="font-display text-lg font-semibold text-navy-900">{section.title}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {section.questions.length} questions • {section.correct} correct • {section.wrong} wrong • {section.unanswered} unanswered
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="green">Correct: {section.correct}</Badge>
                <Badge variant="red">Wrong: {section.wrong}</Badge>
                <Badge variant="slate">Unanswered: {section.unanswered}</Badge>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {section.questions.map(({ q, answer, isCorrect }, index) => (
                <div key={q._id} className="rounded-xl border border-slate-200 bg-slate-50/40 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-1">
                    {answer?.markedForReview && (
                      <Badge variant="gold" className="flex items-center gap-1">
                        <Flag className="w-3 h-3" /> Marked
                      </Badge>
                    )}
                    {!answer?.isAnswered && <Badge variant="slate">Not Answered</Badge>}
                    {answer?.isAnswered && (
                      <Badge variant={isCorrect ? "green" : "red"}>{isCorrect ? "Correct" : "Incorrect"}</Badge>
                    )}
                  </div>
                  <QuestionCard
                    question={q}
                    index={index}
                    totalQuestions={section.questions.length}
                    selectedOptionId={answer?.selectedOptionId ?? null}
                    onSelect={() => { }}
                    revealAnswer
                  />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}