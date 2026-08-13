// // import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { ChevronLeft, ChevronRight, Bookmark, Eraser, Send } from "lucide-react";
// // import { attemptService } from "../services/attemptService.js";
// // import { useCountdown } from "../hooks/useCountdown.js";
// // import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts.js";
// // import { deriveQuestionStatus } from "../utils/constants.js";
// // import TimerBar from "../components/TimerBar.jsx";
// // import QuestionPalette from "../components/QuestionPalette.jsx";
// // import MobilePaletteDrawer from "../components/MobilePaletteDrawer.jsx";
// // import QuestionCard from "../components/QuestionCard.jsx";
// // import SubmitConfirmModal from "../components/SubmitConfirmModal.jsx";
// // import TabSwitchWarningModal from "../components/TabSwitchWarningModal.jsx";
// // import Button from "../components/ui/Button.jsx";
// // import Spinner from "../components/ui/Spinner.jsx";

// // const MAX_TAB_SWITCH_WARNINGS = 3;

// // export default function ExamPage() {
// //   const { attemptId } = useParams();
// //   const navigate = useNavigate();

// //   const [loading, setLoading] = useState(true);
// //   const [exam, setExam] = useState(null);
// //   const [attemptMeta, setAttemptMeta] = useState(null);
// //   const [questions, setQuestions] = useState([]);
// //   const [answers, setAnswers] = useState({}); // questionId -> { selectedOptionId, markedForReview, isAnswered, isVisited }
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [paletteOpen, setPaletteOpen] = useState(false);
// //   const [confirmOpen, setConfirmOpen] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [error, setError] = useState("");
// //   const [tabSwitchWarnings, setTabSwitchWarnings] = useState(0);
// //   const [showTabWarningModal, setShowTabWarningModal] = useState(false);

// //   const answersRef = useRef(answers);
// //   answersRef.current = answers;
// //   const submittedRef = useRef(false);
// //   const tabSwitchWarningsRef = useRef(0);

// //   useEffect(() => {
// //     let cancelled = false;
// //     (async () => {
// //       try {
// //         const data = await attemptService.get(attemptId);
// //         if (cancelled) return;

// //         if (data.attempt.status !== "in-progress") {
// //           navigate(`/result/${attemptId}`, { replace: true });
// //           return;
// //         }

// //         setExam(data.exam);
// //         setAttemptMeta({
// //           endsAt: data.attempt.endsAt,
// //           serverTime: data.serverTime,
// //           startedAt: data.attempt.startedAt,
// //         });
// //         setQuestions(data.questions);

// //         const answerMap = {};
// //         data.answers.forEach((a) => {
// //           answerMap[a.questionId] = {
// //             selectedOptionId: a.selectedOptionId,
// //             markedForReview: a.markedForReview,
// //             isAnswered: a.isAnswered,
// //             isVisited: a.isVisited,
// //           };
// //         });
// //         setAnswers(answerMap);
// //       } catch (err) {
// //         setError(err.message || "Could not load this exam attempt");
// //       } finally {
// //         if (!cancelled) setLoading(false);
// //       }
// //     })();
// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [attemptId, navigate]);

// //   const handleAutoSubmit = useCallback(async () => {
// //     if (submittedRef.current) return;
// //     submittedRef.current = true;
// //     try {
// //       await attemptService.submit(attemptId);
// //     } catch {
// //       // even if the call fails (e.g. already auto-submitted server-side), still leave the page
// //     } finally {
// //       navigate(`/result/${attemptId}`, { replace: true, state: { autoSubmitReason: "time-expired" } });
// //     }
// //   }, [attemptId, navigate]);

// //   const { formatted, isCritical } = useCountdown(
// //     attemptMeta?.endsAt,
// //     attemptMeta?.serverTime,
// //     handleAutoSubmit
// //   );

// //   // Auto-submit triggered by tab-switch enforcement (either 3 quick warnings,
// //   // or a single absence longer than the allowed threshold).
// //   const handleTabSwitchAutoSubmit = useCallback(
// //     async (reason) => {
// //       if (submittedRef.current) return;
// //       submittedRef.current = true;
// //       setShowTabWarningModal(false);
// //       try {
// //         await attemptService.submit(attemptId);
// //       } catch {
// //         // ignore - the attempt may already be closed server-side; still leave the page
// //       } finally {
// //         navigate(`/result/${attemptId}`, { replace: true, state: { autoSubmitReason: reason } });
// //       }
// //     },
// //     [attemptId, navigate]
// //   );

// //   // Called once the student RETURNS from a short absence (<= threshold).
// //   // Increments the warning count and either shows a warning or, on the 3rd
// //   // strike, auto-submits.
// //   const registerTabSwitchWarning = useCallback(() => {
// //     if (submittedRef.current) return;

// //     const nextCount = tabSwitchWarningsRef.current + 1;
// //     tabSwitchWarningsRef.current = nextCount;
// //     setTabSwitchWarnings(nextCount);

// //     if (nextCount >= MAX_TAB_SWITCH_WARNINGS) {
// //       handleTabSwitchAutoSubmit("tab-switch-warnings");
// //     } else {
// //       setShowTabWarningModal(true);
// //     }
// //   }, [handleTabSwitchAutoSubmit]);

// //   // Tracks how long the student has been away (tab hidden / window blurred).
// //   // - Marks the moment they leave.
// //   // - When they come back, if they were away longer than the threshold, the
// //   //   exam is closed immediately.
// //   // - If it was a quick switch, it counts as one of the 3 warnings instead.
// //   useEffect(() => {
// //     if (loading || error || questions.length === 0) return undefined;

// //     const AWAY_LIMIT_MS = 5000;
// //     let awayStartedAt = null;

// //     const handleAway = () => {
// //       if (awayStartedAt === null) {
// //         awayStartedAt = Date.now();
// //       }
// //     };

// //     const handleReturn = () => {
// //       if (awayStartedAt === null || submittedRef.current) return;
// //       const awayMs = Date.now() - awayStartedAt;
// //       awayStartedAt = null;

// //       if (awayMs > AWAY_LIMIT_MS) {
// //         handleTabSwitchAutoSubmit("tab-switch-timeout");
// //       } else {
// //         registerTabSwitchWarning();
// //       }
// //     };

// //     const handleVisibilityChange = () => {
// //       if (document.hidden) handleAway();
// //       else handleReturn();
// //     };

// //     document.addEventListener("visibilitychange", handleVisibilityChange);
// //     window.addEventListener("blur", handleAway);
// //     window.addEventListener("focus", handleReturn);

// //     return () => {
// //       document.removeEventListener("visibilitychange", handleVisibilityChange);
// //       window.removeEventListener("blur", handleAway);
// //       window.removeEventListener("focus", handleReturn);
// //     };
// //   }, [loading, error, questions.length, registerTabSwitchWarning, handleTabSwitchAutoSubmit]);


// //   const currentQuestion = questions[currentIndex];

// //   const statuses = useMemo(
// //     () => questions.map((q) => deriveQuestionStatus(answers[q._id])),
// //     [questions, answers]
// //   );

// //   const answeredCount = useMemo(
// //     () => Object.values(answers).filter((a) => a.isAnswered).length,
// //     [answers]
// //   );

// //   // Mark the current question visited the first time it's shown
// //   useEffect(() => {
// //     if (!currentQuestion) return;
// //     const existing = answersRef.current[currentQuestion._id];
// //     if (existing?.isVisited) return;

// //     const selectedOptionId = existing?.selectedOptionId ?? null;
// //     setAnswers((prev) => ({
// //       ...prev,
// //       [currentQuestion._id]: {
// //         selectedOptionId,
// //         markedForReview: existing?.markedForReview || false,
// //         isAnswered: Boolean(selectedOptionId),
// //         isVisited: true,
// //       },
// //     }));
// //     attemptService.saveAnswer(attemptId, currentQuestion._id, selectedOptionId).catch(() => { });
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [currentQuestion, attemptId]);

// //   const handleSelect = useCallback(
// //     (optionId) => {
// //       if (!currentQuestion) return;
// //       setAnswers((prev) => ({
// //         ...prev,
// //         [currentQuestion._id]: {
// //           ...prev[currentQuestion._id],
// //           selectedOptionId: optionId,
// //           isAnswered: true,
// //           isVisited: true,
// //         },
// //       }));
// //       attemptService.saveAnswer(attemptId, currentQuestion._id, optionId).catch(() => { });
// //     },
// //     [attemptId, currentQuestion]
// //   );

// //   const handleClear = useCallback(() => {
// //     if (!currentQuestion) return;
// //     setAnswers((prev) => ({
// //       ...prev,
// //       [currentQuestion._id]: {
// //         ...prev[currentQuestion._id],
// //         selectedOptionId: null,
// //         isAnswered: false,
// //         isVisited: true,
// //       },
// //     }));
// //     attemptService.saveAnswer(attemptId, currentQuestion._id, null).catch(() => { });
// //   }, [attemptId, currentQuestion]);

// //   const handleToggleMark = useCallback(() => {
// //     if (!currentQuestion) return;
// //     const newValue = !answersRef.current[currentQuestion._id]?.markedForReview;
// //     setAnswers((prev) => ({
// //       ...prev,
// //       [currentQuestion._id]: {
// //         ...prev[currentQuestion._id],
// //         markedForReview: newValue,
// //         isVisited: true,
// //       },
// //     }));
// //     attemptService.toggleReview(attemptId, currentQuestion._id, newValue).catch(() => { });
// //   }, [attemptId, currentQuestion]);

// //   const goNext = useCallback(
// //     () => setCurrentIndex((i) => Math.min(i + 1, questions.length - 1)),
// //     [questions.length]
// //   );
// //   const goPrevious = useCallback(() => setCurrentIndex((i) => Math.max(i - 1, 0)), []);

// //   useKeyboardShortcuts({
// //     onNext: goNext,
// //     onPrevious: goPrevious,
// //     onMark: handleToggleMark,
// //     onClear: handleClear,
// //     enabled: !loading && !confirmOpen && !showTabWarningModal,
// //   });

// //   const summary = useMemo(() => {
// //     const vals = Object.values(answers);
// //     return {
// //       answered: vals.filter((a) => a.isAnswered).length,
// //       notAnswered: questions.length - vals.filter((a) => a.isAnswered).length,
// //       marked: vals.filter((a) => a.markedForReview).length,
// //     };
// //   }, [answers, questions.length]);

// //   const handleConfirmSubmit = async () => {
// //     setIsSubmitting(true);
// //     try {
// //       submittedRef.current = true;
// //       await attemptService.submit(attemptId);
// //       navigate(`/result/${attemptId}`, { replace: true });
// //     } catch (err) {
// //       setError(err.message || "Could not submit the exam");
// //       submittedRef.current = false;
// //       setIsSubmitting(false);
// //     }
// //   };

// //   if (loading) return <Spinner full label="Preparing your exam..." />;

// //   if (error) {
// //     return (
// //       <div className="flex-1 flex items-center justify-center p-6">
// //         <div className="text-center max-w-sm">
// //           <p className="text-red-600 font-medium mb-2">{error}</p>
// //           <Button variant="secondary" onClick={() => navigate("/exams")}>
// //             Back to exams
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!currentQuestion) return null;

// //   const isMarked = answers[currentQuestion._id]?.markedForReview;

// //   return (
// //     <div className="flex-1 flex flex-col">
// //       <TimerBar
// //         examTitle={exam.title}
// //         formatted={formatted}
// //         isCritical={isCritical}
// //         answeredCount={answeredCount}
// //         totalCount={questions.length}
// //         onOpenPalette={() => setPaletteOpen(true)}
// //         tabSwitchWarnings={tabSwitchWarnings}
// //         maxTabSwitchWarnings={MAX_TAB_SWITCH_WARNINGS}
// //       />

// //       <div className="flex-1 flex overflow-hidden">
// //         <div className="flex-1 flex flex-col min-w-0">
// //           <div className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-8 py-6 sm:py-8">
// //             <div className="max-w-2xl mx-auto">
// //               <QuestionCard
// //                 question={currentQuestion}
// //                 index={currentIndex}
// //                 totalQuestions={questions.length}
// //                 selectedOptionId={answers[currentQuestion._id]?.selectedOptionId ?? null}
// //                 onSelect={handleSelect}
// //               />
// //             </div>
// //           </div>

// //           <div className="border-t border-slate-200 bg-white px-4 sm:px-8 py-3 sm:py-4">
// //             <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
// //               <div className="flex items-center gap-2">
// //                 <Button variant="secondary" size="sm" icon={Eraser} onClick={handleClear}>
// //                   Clear
// //                 </Button>
// //                 <Button
// //                   variant={isMarked ? "gold" : "secondary"}
// //                   size="sm"
// //                   icon={Bookmark}
// //                   onClick={handleToggleMark}
// //                 >
// //                   {isMarked ? "Marked" : "Mark for Review"}
// //                 </Button>
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <Button
// //                   variant="secondary"
// //                   size="sm"
// //                   icon={ChevronLeft}
// //                   onClick={goPrevious}
// //                   disabled={currentIndex === 0}
// //                 >
// //                   Previous
// //                 </Button>
// //                 {currentIndex === questions.length - 1 ? (
// //                   <Button variant="danger" size="sm" icon={Send} onClick={() => setConfirmOpen(true)}>
// //                     Submit
// //                   </Button>
// //                 ) : (
// //                   <Button variant="primary" size="sm" onClick={goNext}>
// //                     Next
// //                     <ChevronRight className="w-4 h-4" />
// //                   </Button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <aside className="hidden lg:flex lg:flex-col w-72 shrink-0 border-l border-slate-200 bg-white">
// //           <QuestionPalette statuses={statuses} currentIndex={currentIndex} onNavigate={setCurrentIndex} />
// //           <div className="p-4 border-t border-slate-200">
// //             <Button variant="danger" className="w-full" icon={Send} onClick={() => setConfirmOpen(true)}>
// //               Submit Exam
// //             </Button>
// //           </div>
// //         </aside>
// //       </div>

// //       <MobilePaletteDrawer
// //         open={paletteOpen}
// //         onClose={() => setPaletteOpen(false)}
// //         statuses={statuses}
// //         currentIndex={currentIndex}
// //         onNavigate={setCurrentIndex}
// //       />

// //       <SubmitConfirmModal
// //         open={confirmOpen}
// //         onClose={() => setConfirmOpen(false)}
// //         onConfirm={handleConfirmSubmit}
// //         isSubmitting={isSubmitting}
// //         summary={summary}
// //       />

// //       <TabSwitchWarningModal
// //         open={showTabWarningModal}
// //         onClose={() => setShowTabWarningModal(false)}
// //         warningCount={tabSwitchWarnings}
// //         maxWarnings={MAX_TAB_SWITCH_WARNINGS}
// //       />
// //     </div>
// //   );
// // }



import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Bookmark, Eraser, Send } from "lucide-react";
import { attemptService } from "../services/attemptService.js";
import { useCountdown } from "../hooks/useCountdown.js";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts.js";
import { deriveQuestionStatus } from "../utils/constants.js";
import TimerBar from "../components/TimerBar.jsx";
import QuestionPalette from "../components/QuestionPalette.jsx";
import MobilePaletteDrawer from "../components/MobilePaletteDrawer.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import SubmitConfirmModal from "../components/SubmitConfirmModal.jsx";
import TabSwitchWarningModal from "../components/TabSwitchWarningModal.jsx";
import Button from "../components/ui/Button.jsx";
import Spinner from "../components/ui/Spinner.jsx";

const MAX_TAB_SWITCH_WARNINGS = 3;

export default function ExamPage() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState(null);
  const [attemptMeta, setAttemptMeta] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // questionId -> { selectedOptionId, markedForReview, isAnswered, isVisited }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [tabSwitchWarnings, setTabSwitchWarnings] = useState(0);
  const [showTabWarningModal, setShowTabWarningModal] = useState(false);

  // Section-timed exam state
  const [isSectionTimed, setIsSectionTimed] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [sections, setSections] = useState([]);
  const [currentSectionQuestions, setCurrentSectionQuestions] = useState([]);

  const answersRef = useRef(answers);
  answersRef.current = answers;
  const submittedRef = useRef(false);
  const tabSwitchWarningsRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await attemptService.get(attemptId);
        if (cancelled) return;

        if (data.attempt.status !== "in-progress") {
          navigate(`/result/${attemptId}`, { replace: true });
          return;
        }

        setExam(data.exam);
        setAttemptMeta({
          endsAt: data.attempt.endsAt,
          serverTime: data.serverTime,
          startedAt: data.attempt.startedAt,
        });

        // Handle section-timed exams
        if (data.attempt.isSectionTimed && data.attempt.currentSection) {
          setIsSectionTimed(true);
          setCurrentSection(data.attempt.currentSection);
          // For section-timed exams, questions are already filtered by section
          setQuestions(data.questions);
          setCurrentSectionQuestions(data.questions);
          setAttemptMeta(prev => ({
            ...prev,
            endsAt: data.attempt.currentSection.endsAt,
            sectionStartedAt: data.attempt.currentSection.startedAt,
          }));
        } else {
          setQuestions(data.questions);
        }

        const answerMap = {};
        data.answers.forEach((a) => {
          answerMap[a.questionId] = {
            selectedOptionId: a.selectedOptionId,
            markedForReview: a.markedForReview,
            isAnswered: a.isAnswered,
            isVisited: a.isVisited,
          };
        });
        setAnswers(answerMap);
      } catch (err) {
        setError(err.message || "Could not load this exam attempt");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [attemptId, navigate]);

  const handleAutoSubmit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    try {
      await attemptService.submit(attemptId);
    } catch {
      // even if the call fails (e.g. already auto-submitted server-side), still leave the page
    } finally {
      navigate(`/result/${attemptId}`, { replace: true, state: { autoSubmitReason: isSectionTimed ? "section-time-expired" : "time-expired" } });
    }
  }, [attemptId, navigate, isSectionTimed]);

  const { formatted, isCritical } = useCountdown(
    isSectionTimed && currentSection ? currentSection.endsAt : attemptMeta?.endsAt,
    attemptMeta?.serverTime,
    handleAutoSubmit
  );

  // Auto-submit triggered by tab-switch enforcement (either 3 quick warnings,
  // or a single absence longer than the allowed threshold).
  const handleTabSwitchAutoSubmit = useCallback(
    async (reason) => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      setShowTabWarningModal(false);
      try {
        await attemptService.submit(attemptId);
      } catch {
        // ignore - the attempt may already be closed server-side; still leave the page
      } finally {
        navigate(`/result/${attemptId}`, { replace: true, state: { autoSubmitReason: reason } });
      }
    },
    [attemptId, navigate]
  );

  // Called once the student RETURNS from a short absence (<= threshold).
  // Increments the warning count and either shows a warning or, on the 3rd
  // strike, auto-submits.
  const registerTabSwitchWarning = useCallback(() => {
    if (submittedRef.current) return;

    const nextCount = tabSwitchWarningsRef.current + 1;
    tabSwitchWarningsRef.current = nextCount;
    setTabSwitchWarnings(nextCount);

    if (nextCount >= MAX_TAB_SWITCH_WARNINGS) {
      handleTabSwitchAutoSubmit("tab-switch-warnings");
    } else {
      setShowTabWarningModal(true);
    }
  }, [handleTabSwitchAutoSubmit]);

  // Tracks how long the student has been away (tab hidden / window blurred).
  // - Marks the moment they leave.
  // - When they come back, if they were away longer than the threshold, the
  //   exam is closed immediately.
  // - If it was a quick switch, it counts as one of the 3 warnings instead.
  useEffect(() => {
    if (loading || error || questions.length === 0) return undefined;

    const AWAY_LIMIT_MS = 5000;
    let awayStartedAt = null;

    const handleAway = () => {
      if (awayStartedAt === null) {
        awayStartedAt = Date.now();
      }
    };

    const handleReturn = () => {
      if (awayStartedAt === null || submittedRef.current) return;
      const awayMs = Date.now() - awayStartedAt;
      awayStartedAt = null;

      if (awayMs > AWAY_LIMIT_MS) {
        handleTabSwitchAutoSubmit("tab-switch-timeout");
      } else {
        registerTabSwitchWarning();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) handleAway();
      else handleReturn();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleAway);
    window.addEventListener("focus", handleReturn);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleAway);
      window.removeEventListener("focus", handleReturn);
    };
  }, [loading, error, questions.length, registerTabSwitchWarning, handleTabSwitchAutoSubmit]);


  const currentQuestion = (isSectionTimed ? currentSectionQuestions : questions)[currentIndex];

  const statuses = useMemo(
    () => {
      const questionsToUse = isSectionTimed ? currentSectionQuestions : questions;
      return questionsToUse.map((q) => deriveQuestionStatus(answers[q._id]));
    },
    [questions, currentSectionQuestions, answers, isSectionTimed]
  );

  const answeredCount = useMemo(
    () => {
      if (isSectionTimed) {
        return currentSectionQuestions.filter((q) => answers[q._id]?.isAnswered).length;
      }
      return Object.values(answers).filter((a) => a.isAnswered).length;
    },
    [answers, isSectionTimed, currentSectionQuestions]
  );

  // Mark the current question visited the first time it's shown
  useEffect(() => {
    if (!currentQuestion) return;
    const existing = answersRef.current[currentQuestion._id];
    if (existing?.isVisited) return;

    const selectedOptionId = existing?.selectedOptionId ?? null;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion._id]: {
        selectedOptionId,
        markedForReview: existing?.markedForReview || false,
        isAnswered: Boolean(selectedOptionId),
        isVisited: true,
      },
    }));
    attemptService.saveAnswer(attemptId, currentQuestion._id, selectedOptionId).catch(() => { });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, attemptId]);

  const handleSelect = useCallback(
    (optionId) => {
      if (!currentQuestion) return;
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion._id]: {
          ...prev[currentQuestion._id],
          selectedOptionId: optionId,
          isAnswered: true,
          isVisited: true,
        },
      }));
      attemptService.saveAnswer(attemptId, currentQuestion._id, optionId).catch(() => { });
    },
    [attemptId, currentQuestion]
  );

  const handleClear = useCallback(() => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion._id]: {
        ...prev[currentQuestion._id],
        selectedOptionId: null,
        isAnswered: false,
        isVisited: true,
      },
    }));
    attemptService.saveAnswer(attemptId, currentQuestion._id, null).catch(() => { });
  }, [attemptId, currentQuestion]);

  const handleToggleMark = useCallback(() => {
    if (!currentQuestion) return;
    const newValue = !answersRef.current[currentQuestion._id]?.markedForReview;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion._id]: {
        ...prev[currentQuestion._id],
        markedForReview: newValue,
        isVisited: true,
      },
    }));
    attemptService.toggleReview(attemptId, currentQuestion._id, newValue).catch(() => { });
  }, [attemptId, currentQuestion]);

  const goNext = useCallback(
    () => {
      // For section-timed exams, navigate only within the current section
      const maxIndex = isSectionTimed ? currentSectionQuestions.length - 1 : questions.length - 1;
      setCurrentIndex((i) => Math.min(i + 1, maxIndex));
    },
    [questions.length, isSectionTimed, currentSectionQuestions.length]
  );

  const goPrevious = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  useKeyboardShortcuts({
    onNext: goNext,
    onPrevious: goPrevious,
    onMark: handleToggleMark,
    onClear: handleClear,
    enabled: !loading && !confirmOpen && !showTabWarningModal,
  });

  const summary = useMemo(() => {
    const questionsToUse = isSectionTimed ? currentSectionQuestions : questions;
    const answeredInSection = questionsToUse.filter((q) => answers[q._id]?.isAnswered).length;
    return {
      answered: answeredInSection,
      notAnswered: questionsToUse.length - answeredInSection,
      marked: questionsToUse.filter((q) => answers[q._id]?.markedForReview).length,
    };
  }, [answers, questions.length, isSectionTimed, currentSectionQuestions]);

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      submittedRef.current = true;

      // For section-timed exams, use advanceSection instead of submit
      if (isSectionTimed && currentSection && currentSection.index + 1 < currentSection.totalSections) {
        // Not the last section - advance to next section
        const result = await attemptService.advanceSection(attemptId);

        if (result.finished) {
          // Exam is complete, go to results
          navigate(`/result/${attemptId}`, { replace: true });
        } else if (result.attempt) {
          // Fetch full data for next section
          const data = await attemptService.get(attemptId);

          // Update answers for new section first
          const answerMap = {};
          data.answers.forEach((a) => {
            answerMap[a.questionId] = {
              selectedOptionId: a.selectedOptionId,
              markedForReview: a.markedForReview,
              isAnswered: a.isAnswered,
              isVisited: a.isVisited,
            };
          });
          setAnswers(answerMap);

          // UPDATE TIMER FIRST - this ensures serverTime is ready before endsAt changes
          setAttemptMeta(prev => ({
            ...prev,
            endsAt: data.attempt.currentSection.endsAt,
            serverTime: data.serverTime,
            sectionStartedAt: data.attempt.currentSection.startedAt,
          }));

          // NOW update section data - this will use the updated serverTime from above
          setCurrentIndex(0); // Reset to first question of new section
          setCurrentSection(data.attempt.currentSection);
          setCurrentSectionQuestions(data.questions);

          setConfirmOpen(false);
          submittedRef.current = false;
          setIsSubmitting(false);
        }
      } else {
        // Regular exam or final section - submit the entire exam
        await attemptService.submit(attemptId);
        navigate(`/result/${attemptId}`, { replace: true });
      }
    } catch (err) {
      setError(err.message || "Could not submit the exam");
      submittedRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (loading) return <Spinner full label="Preparing your exam..." />;

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <p className="text-red-600 font-medium mb-2">{error}</p>
          <Button variant="secondary" onClick={() => navigate("/exams")}>
            Back to exams
          </Button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const isMarked = answers[currentQuestion._id]?.markedForReview;
  const totalQuestionsDisplay = isSectionTimed ? currentSectionQuestions.length : questions.length;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TimerBar
        examTitle={isSectionTimed && currentSection ? `${exam.title} - ${currentSection.title}` : exam.title}
        formatted={formatted}
        isCritical={isCritical}
        answeredCount={answeredCount}
        totalCount={totalQuestionsDisplay}
        onOpenPalette={() => setPaletteOpen(true)}
        tabSwitchWarnings={tabSwitchWarnings}
        maxTabSwitchWarnings={MAX_TAB_SWITCH_WARNINGS}
        sectionLabel={isSectionTimed && currentSection ? `Section ${currentSection.index + 1} of ${currentSection.totalSections}` : undefined}
      />

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left column: question card + toolbar stay fixed in place, no scrolling here */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
          {/* Section Header Banner for section-timed exams */}
          {isSectionTimed && currentSection && (
            <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-8 py-3 shrink-0">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{currentSection.title}</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Section {currentSection.index + 1} of {currentSection.totalSections} • {currentSectionQuestions.length} questions
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <p className="font-medium">No section switching allowed</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 flex items-start justify-center px-4 sm:px-8 py-6 sm:py-8 overflow-hidden">
            <div className="max-w-2xl w-full mx-auto">
              <QuestionCard
                question={currentQuestion}
                index={currentIndex}
                totalQuestions={totalQuestionsDisplay}
                selectedOptionId={answers[currentQuestion._id]?.selectedOptionId ?? null}
                onSelect={handleSelect}
              />
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white px-4 sm:px-8 py-3 sm:py-4 shrink-0">
            <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" icon={Eraser} onClick={handleClear}>
                  Clear
                </Button>
                <Button
                  variant={isMarked ? "gold" : "secondary"}
                  size="sm"
                  icon={Bookmark}
                  onClick={handleToggleMark}
                >
                  {isMarked ? "Marked" : "Mark for Review"}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={ChevronLeft}
                  onClick={goPrevious}
                  disabled={currentIndex === 0}
                >
                  Previous
                </Button>
                {currentIndex === totalQuestionsDisplay - 1 ? (
                  <Button variant="danger" size="sm" icon={Send} onClick={() => setConfirmOpen(true)}>
                    {isSectionTimed && currentSection && currentSection.index + 1 < currentSection.totalSections ? "Next Section" : "Submit"}
                  </Button>
                ) : (
                  <Button variant="primary" size="sm" onClick={goNext}>
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar: only the question-number palette scrolls; Submit button stays pinned */}
        <aside className="hidden lg:flex lg:flex-col w-72 shrink-0 border-l border-slate-200 bg-white overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <QuestionPalette statuses={statuses} currentIndex={currentIndex} onNavigate={setCurrentIndex} />
          </div>
          <div className="p-4 border-t border-slate-200 shrink-0">
            <Button variant="danger" className="w-full" icon={Send} onClick={() => setConfirmOpen(true)}>
              {isSectionTimed && currentSection && currentSection.index + 1 < currentSection.totalSections
                ? `Next Section (${currentSection.index + 1}/${currentSection.totalSections})`
                : "Submit Exam"}
            </Button>
          </div>
        </aside>
      </div>

      <MobilePaletteDrawer
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        statuses={statuses}
        currentIndex={currentIndex}
        onNavigate={setCurrentIndex}
      />

      <SubmitConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmSubmit}
        isSubmitting={isSubmitting}
        summary={summary}
        title={isSectionTimed && currentSection && currentSection.index + 1 < currentSection.totalSections ? "Move to next section?" : "Submit exam?"}
        description={isSectionTimed && currentSection && currentSection.index + 1 < currentSection.totalSections ? "You've completed all questions in this section. Ready to move to the next section?" : "Once submitted, you won't be able to change any answers. Here's a quick summary:"}
        confirmLabel={isSectionTimed && currentSection && currentSection.index + 1 < currentSection.totalSections ? "Yes, continue" : "Yes, submit now"}
        cancelLabel={isSectionTimed && currentSection && currentSection.index + 1 < currentSection.totalSections ? "Review more" : "Keep reviewing"}
      />

      <TabSwitchWarningModal
        open={showTabWarningModal}
        onClose={() => setShowTabWarningModal(false)}
        warningCount={tabSwitchWarnings}
        maxWarnings={MAX_TAB_SWITCH_WARNINGS}
      />
    </div>
  );
}