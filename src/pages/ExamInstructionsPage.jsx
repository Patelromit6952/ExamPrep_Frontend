import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, ListChecks, AlertCircle, ShieldAlert, PlayCircle } from "lucide-react";
import { examService } from "../services/examService.js";
import { attemptService } from "../services/attemptService.js";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Spinner from "../components/ui/Spinner.jsx";

export default function ExamInstructionsPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    examService
      .getById(examId)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [examId]);

  const handleStart = async () => {
    setStarting(true);
    setError("");
    try {
      const { attemptId } = await attemptService.start(examId);
      navigate(`/exam/${attemptId}`);
    } catch (err) {
      setError(err.message || "Could not start the exam");
      setStarting(false);
    }
  };

  if (loading) return <Spinner full label="Loading exam details..." />;
  if (error && !data) {
    return <p className="text-center text-red-600 py-16">{error}</p>;
  }

  const { exam, questionCount } = data;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-900">{exam.title}</h1>
        <p className="text-sm text-slate-500 mt-1.5">{exam.description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Duration", value: `${exam.durationMinutes} min`, icon: Clock },
          { label: "Questions", value: questionCount, icon: ListChecks },
          { label: "Total Marks", value: exam.totalMarks, icon: ShieldAlert },
          { label: "Negative Marking", value: exam.negativeMarks || "None", icon: AlertCircle },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="p-4 text-center">
            <Icon className="w-4.5 h-4.5 text-navy-500 mx-auto mb-1.5" />
            <p className="text-lg font-display font-bold text-navy-900">{value}</p>
            <p className="text-[11px] text-slate-500">{label}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="font-display font-semibold text-navy-900 mb-3">Instructions</h2>
        {exam.instructions?.length > 0 ? (
          <ul className="space-y-2.5 text-sm text-navy-700 list-decimal list-inside">
            {exam.instructions.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">No special instructions provided for this exam.</p>
        )}

        <label className="flex items-start gap-2.5 mt-6 pt-5 border-t border-slate-200 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-navy-700 focus:ring-navy-500"
          />
          <span className="text-sm text-navy-700">
            I have read the instructions and understand the timer cannot be paused once I start.
          </span>
        </label>
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        size="lg"
        className="w-full"
        icon={PlayCircle}
        disabled={!agreed}
        isLoading={starting}
        onClick={handleStart}
      >
        Start Exam
      </Button>
    </div>
  );
}
