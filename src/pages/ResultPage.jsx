import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, Flag, AlertTriangle } from "lucide-react";
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
    attemptService
      .get(attemptId)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [attemptId]);

  if (loading) return <Spinner full label="Loading your result..." />;
  if (error) return <p className="text-center text-red-600 py-16">{error}</p>;

  const { attempt, exam, questions, answers } = data;
  const answerMap = new Map(answers.map((a) => [String(a.questionId), a]));

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

      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-navy-900">Answer Review</h2>
      </div>

      <div className="space-y-4">
        {questions.map((q, index) => {
          const answer = answerMap.get(String(q._id));
          const isCorrect = answer?.selectedOptionId === q.correctOptionId;
          return (
            <Card key={q._id} className="p-5 sm:p-6">
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
                totalQuestions={questions.length}
                selectedOptionId={answer?.selectedOptionId ?? null}
                onSelect={() => { }}
                revealAnswer
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}