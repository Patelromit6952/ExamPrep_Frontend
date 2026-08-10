import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "../utils/cn.js";

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"];

export default function QuestionCard({
  question,
  index,
  totalQuestions,
  selectedOptionId,
  onSelect,
  revealAnswer = false,
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
          Question {index + 1} of {totalQuestions}
        </p>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-navy-50 text-navy-600">
          +{question.marks} marks
        </span>
      </div>

      <h2 className="text-lg sm:text-xl font-medium text-navy-900 leading-relaxed mb-6">
        {question.questionText}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, i) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = revealAnswer && option.id === question.correctOptionId;
          const isWrongSelected = revealAnswer && isSelected && option.id !== question.correctOptionId;

          return (
            <button
              key={option.id}
              type="button"
              disabled={revealAnswer}
              onClick={() => onSelect(option.id)}
              className={cn(
                "w-full flex items-start gap-3 text-left px-4 py-3.5 rounded-lg border transition-colors",
                "disabled:cursor-default",
                isCorrect && "border-green-500 bg-green-50",
                isWrongSelected && "border-red-400 bg-red-50",
                !revealAnswer && isSelected && "border-navy-600 bg-navy-50",
                !revealAnswer && !isSelected && "border-slate-200 hover:border-navy-300 hover:bg-navy-50/40"
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold shrink-0 border",
                  isCorrect && "bg-green-600 text-white border-green-600",
                  isWrongSelected && "bg-red-500 text-white border-red-500",
                  !revealAnswer && isSelected && "bg-navy-700 text-white border-navy-700",
                  !revealAnswer && !isSelected && "border-slate-300 text-slate-500"
                )}
              >
                {OPTION_LABELS[i] || i + 1}
              </span>
              <span className="text-sm sm:text-base text-navy-800 pt-0.5">{option.text}</span>
              {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto shrink-0" />}
              {isWrongSelected && <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />}
            </button>
          );
        })}
      </div>

      {revealAnswer && question.explanation && (
        <div className="mt-5 px-4 py-3.5 rounded-lg bg-navy-50 border border-navy-100">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-500 mb-1">Explanation</p>
          <p className="text-sm text-navy-800 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
