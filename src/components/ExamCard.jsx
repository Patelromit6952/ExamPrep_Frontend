import { Clock, ListChecks, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "./ui/Card.jsx";
import Badge from "./ui/Badge.jsx";
import Button from "./ui/Button.jsx";

export default function ExamCard({ exam }) {
  const navigate = useNavigate();

  return (
    <Card className="p-5 flex flex-col gap-4 hover:shadow-elevated transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <Badge variant="navy">{exam.category}</Badge>
        {!exam.isPublished && <Badge variant="slate">Draft</Badge>}
      </div>

      <div>
        <h3 className="font-display font-semibold text-navy-900 leading-snug mb-1.5">{exam.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2">{exam.description}</p>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 border-t border-slate-100">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {exam.durationMinutes} min
        </span>
        <span className="flex items-center gap-1.5">
          <ListChecks className="w-3.5 h-3.5" />
          {exam.questionCount} questions
        </span>
        <span className="ml-auto font-semibold text-navy-700">{exam.totalMarks} marks</span>
      </div>

      <Button variant="primary" className="w-full" onClick={() => navigate(`/exams/${exam._id}`)}>
        View Details
        <ArrowRight className="w-4 h-4" />
      </Button>
    </Card>
  );
}
