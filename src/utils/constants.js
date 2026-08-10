export const QUESTION_STATUS = {
  NOT_VISITED: "not-visited",
  NOT_ANSWERED: "not-answered",
  ANSWERED: "answered",
  MARKED: "marked",
  ANSWERED_MARKED: "answered-marked",
};

export const STATUS_META = {
  [QUESTION_STATUS.NOT_VISITED]: {
    label: "Not Visited",
    dot: "bg-slate-400",
    chip: "bg-slate-100 text-slate-600 border-slate-300",
  },
  [QUESTION_STATUS.NOT_ANSWERED]: {
    label: "Not Answered",
    dot: "bg-red-500",
    chip: "bg-red-500 text-white border-red-500",
  },
  [QUESTION_STATUS.ANSWERED]: {
    label: "Answered",
    dot: "bg-green-600",
    chip: "bg-green-600 text-white border-green-600",
  },
  [QUESTION_STATUS.MARKED]: {
    label: "Marked for Review",
    dot: "bg-purple-600",
    chip: "bg-purple-600 text-white border-purple-600",
  },
  [QUESTION_STATUS.ANSWERED_MARKED]: {
    label: "Answered & Marked",
    dot: "bg-indigo-600",
    chip: "bg-indigo-600 text-white border-indigo-600",
  },
};

/** Derives a question's palette status from its saved answer record. */
export const deriveQuestionStatus = (answer) => {
  if (!answer || !answer.isVisited) return QUESTION_STATUS.NOT_VISITED;
  if (answer.isAnswered && answer.markedForReview) return QUESTION_STATUS.ANSWERED_MARKED;
  if (answer.markedForReview) return QUESTION_STATUS.MARKED;
  if (answer.isAnswered) return QUESTION_STATUS.ANSWERED;
  return QUESTION_STATUS.NOT_ANSWERED;
};

export const EXAM_CATEGORIES = ["SSC", "Banking", "Railway", "GPSC", "UPSC", "Other"];
