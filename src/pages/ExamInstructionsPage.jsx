// // import { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { Clock, ListChecks, AlertCircle, ShieldAlert, PlayCircle } from "lucide-react";
// // import { examService } from "../services/examService.js";
// // import { attemptService } from "../services/attemptService.js";
// // import Card from "../components/ui/Card.jsx";
// // import Button from "../components/ui/Button.jsx";
// // import Spinner from "../components/ui/Spinner.jsx";

// // export default function ExamInstructionsPage() {
// //   const { examId } = useParams();
// //   const navigate = useNavigate();
// //   const [loading, setLoading] = useState(true);
// //   const [starting, setStarting] = useState(false);
// //   const [data, setData] = useState(null);
// //   const [error, setError] = useState("");
// //   const [agreed, setAgreed] = useState(false);

// //   useEffect(() => {
// //     examService
// //       .getById(examId)
// //       .then(setData)
// //       .catch((err) => setError(err.message))
// //       .finally(() => setLoading(false));
// //   }, [examId]);

// //   const handleStart = async () => {
// //     setStarting(true);
// //     setError("");
// //     try {
// //       const { attemptId } = await attemptService.start(examId);
// //       navigate(`/exam/${attemptId}`);
// //     } catch (err) {
// //       setError(err.message || "Could not start the exam");
// //       setStarting(false);
// //     }
// //   };

// //   if (loading) return <Spinner full label="Loading exam details..." />;
// //   if (error && !data) {
// //     return <p className="text-center text-red-600 py-16">{error}</p>;
// //   }

// //   const { exam, questionCount } = data;

// //   return (
// //     <div className="max-w-3xl mx-auto space-y-6">
// //       <div>
// //         <h1 className="font-display text-2xl font-bold text-navy-900">{exam.title}</h1>
// //         <p className="text-sm text-slate-500 mt-1.5">{exam.description}</p>
// //       </div>

// //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// //         {[
// //           { label: "Duration", value: `${exam.durationMinutes} min`, icon: Clock },
// //           { label: "Questions", value: questionCount, icon: ListChecks },
// //           { label: "Total Marks", value: exam.totalMarks, icon: ShieldAlert },
// //           { label: "Negative Marking", value: exam.negativeMarks || "None", icon: AlertCircle },
// //         ].map(({ label, value, icon: Icon }) => (
// //           <Card key={label} className="p-4 text-center">
// //             <Icon className="w-4.5 h-4.5 text-navy-500 mx-auto mb-1.5" />
// //             <p className="text-lg font-display font-bold text-navy-900">{value}</p>
// //             <p className="text-[11px] text-slate-500">{label}</p>
// //           </Card>
// //         ))}
// //       </div>

// //       <Card className="p-6">
// //         <h2 className="font-display font-semibold text-navy-900 mb-3">Instructions</h2>
// //         {exam.instructions?.length > 0 ? (
// //           <ul className="space-y-2.5 text-sm text-navy-700 list-decimal list-inside">
// //             {exam.instructions.map((line, i) => (
// //               <li key={i}>{line}</li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p className="text-sm text-slate-400">No special instructions provided for this exam.</p>
// //         )}

// //         <label className="flex items-start gap-2.5 mt-6 pt-5 border-t border-slate-200 cursor-pointer">
// //           <input
// //             type="checkbox"
// //             checked={agreed}
// //             onChange={(e) => setAgreed(e.target.checked)}
// //             className="mt-0.5 w-4 h-4 rounded border-slate-300 text-navy-700 focus:ring-navy-500"
// //           />
// //           <span className="text-sm text-navy-700">
// //             I have read the instructions and understand the timer cannot be paused once I start.
// //           </span>
// //         </label>
// //       </Card>

// //       {error && <p className="text-sm text-red-600">{error}</p>}

// //       <Button
// //         size="lg"
// //         className="w-full"
// //         icon={PlayCircle}
// //         disabled={!agreed}
// //         isLoading={starting}
// //         onClick={handleStart}
// //       >
// //         Start Exam
// //       </Button>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Clock, ListChecks, AlertCircle, ShieldAlert, PlayCircle, Crown, Lock } from "lucide-react";
// import { examService } from "../services/examService.js";
// import { attemptService } from "../services/attemptService.js";
// import { useSubscription } from "../hooks/useSubscription.js";
// import Card from "../components/ui/Card.jsx";
// import Button from "../components/ui/Button.jsx";
// import Spinner from "../components/ui/Spinner.jsx";
// import Badge from "../components/ui/Badge.jsx";

// export default function ExamInstructionsPage() {
//   const { examId } = useParams();
//   const navigate = useNavigate();
//   const { isActive: hasActivePlan } = useSubscription();
//   const [loading, setLoading] = useState(true);
//   const [starting, setStarting] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const [agreed, setAgreed] = useState(false);

//   useEffect(() => {
//     examService
//       .getById(examId)
//       .then(setData)
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [examId]);

//   const handleStart = async () => {
//     setStarting(true);
//     setError("");
//     try {
//       const { attemptId } = await attemptService.start(examId);
//       navigate(`/exam/${attemptId}`);
//     } catch (err) {
//       setError(err.message || "Could not start the exam");
//       setStarting(false);
//     }
//   };

//   if (loading) return <Spinner full label="Loading exam details..." />;
//   if (error && !data) {
//     return <p className="text-center text-red-600 py-16">{error}</p>;
//   }

//   const { exam, questionCount } = data;
//   const isLocked = exam.isPremium && !hasActivePlan;

//   return (
//     <div className="max-w-3xl mx-auto space-y-6">
//       <div>
//         <div className="flex items-center gap-2 mb-1">
//           <h1 className="font-display text-2xl font-bold text-navy-900">{exam.title}</h1>
//           {exam.isPremium && (
//             <Badge variant="gold" className="flex items-center gap-1">
//               <Crown className="w-3 h-3" /> Premium
//             </Badge>
//           )}
//         </div>
//         <p className="text-sm text-slate-500 mt-1.5">{exam.description}</p>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//         {[
//           { label: "Duration", value: `${exam.durationMinutes} min`, icon: Clock },
//           { label: "Questions", value: questionCount, icon: ListChecks },
//           { label: "Total Marks", value: exam.totalMarks, icon: ShieldAlert },
//           { label: "Negative Marking", value: exam.negativeMarks || "None", icon: AlertCircle },
//         ].map(({ label, value, icon: Icon }) => (
//           <Card key={label} className="p-4 text-center">
//             <Icon className="w-4.5 h-4.5 text-navy-500 mx-auto mb-1.5" />
//             <p className="text-lg font-display font-bold text-navy-900">{value}</p>
//             <p className="text-[11px] text-slate-500">{label}</p>
//           </Card>
//         ))}
//       </div>

//       {isLocked && (
//         <Card className="p-5 flex items-start gap-3 bg-gold-50 border-gold-200">
//           <Lock className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
//           <div>
//             <p className="text-sm font-semibold text-gold-800">This is a premium exam</p>
//             <p className="text-sm text-gold-700/90 mt-0.5">
//               Subscribe to unlock this test along with every other premium mock test on the platform.
//             </p>
//           </div>
//         </Card>
//       )}

//       <Card className="p-6">
//         <h2 className="font-display font-semibold text-navy-900 mb-3">Instructions</h2>
//         {exam.instructions?.length > 0 ? (
//           <ul className="space-y-2.5 text-sm text-navy-700 list-decimal list-inside">
//             {exam.instructions.map((line, i) => (
//               <li key={i}>{line}</li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-sm text-slate-400">No special instructions provided for this exam.</p>
//         )}

//         {!isLocked && (
//           <label className="flex items-start gap-2.5 mt-6 pt-5 border-t border-slate-200 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={agreed}
//               onChange={(e) => setAgreed(e.target.checked)}
//               className="mt-0.5 w-4 h-4 rounded border-slate-300 text-navy-700 focus:ring-navy-500"
//             />
//             <span className="text-sm text-navy-700">
//               I have read the instructions and understand the timer cannot be paused once I start.
//             </span>
//           </label>
//         )}
//       </Card>

//       {error && <p className="text-sm text-red-600">{error}</p>}

//       {isLocked ? (
//         <Link to="/subscription">
//           <Button size="lg" className="w-full" icon={Crown} variant="gold">
//             Subscribe to Unlock
//           </Button>
//         </Link>
//       ) : (
//         <Button
//           size="lg"
//           className="w-full"
//           icon={PlayCircle}
//           disabled={!agreed}
//           isLoading={starting}
//           onClick={handleStart}
//         >
//           Start Exam
//         </Button>
//       )}
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import {
//   Clock,
//   ListChecks,
//   AlertCircle,
//   ShieldAlert,
//   PlayCircle,
//   Crown,
//   Lock,
//   RotateCcw,
// } from "lucide-react";
// import { examService } from "../services/examService.js";
// import { attemptService } from "../services/attemptService.js";
// import { useSubscription } from "../hooks/useSubscription.js";
// import Card from "../components/ui/Card.jsx";
// import Button from "../components/ui/Button.jsx";
// import Spinner from "../components/ui/Spinner.jsx";
// import Badge from "../components/ui/Badge.jsx";

// export default function ExamInstructionsPage() {
//   const { examId } = useParams();
//   const navigate = useNavigate();
//   const { isActive: hasActivePlan } = useSubscription();
//   const [loading, setLoading] = useState(true);
//   const [starting, setStarting] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const [agreed, setAgreed] = useState(false);

//   useEffect(() => {
//     examService
//       .getById(examId)
//       .then(setData)
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [examId]);

//   const handleStart = async () => {
//     setStarting(true);
//     setError("");
//     try {
//       const { attemptId } = await attemptService.start(examId);
//       navigate(`/exam/${attemptId}`);
//     } catch (err) {
//       setError(err.message || "Could not start the exam");
//       setStarting(false);
//     }
//   };

//   if (loading) return <Spinner full label="Loading exam details..." />;
//   if (error && !data) {
//     return <p className="text-center text-red-600 py-16">{error}</p>;
//   }

//   const { exam, questionCount, attemptInfo } = data;
//   const isLocked = exam.isPremium && !hasActivePlan;
//   const isLimited = attemptInfo && attemptInfo.max !== null;
//   const isExhausted = isLimited && attemptInfo.remaining === 0;

//   return (
//     <div className="max-w-3xl mx-auto space-y-6">
//       <div>
//         <div className="flex items-center gap-2 mb-1">
//           <h1 className="font-display text-2xl font-bold text-navy-900">{exam.title}</h1>
//           {exam.isPremium && (
//             <Badge variant="gold" className="flex items-center gap-1">
//               <Crown className="w-3 h-3" /> Premium
//             </Badge>
//           )}
//         </div>
//         <p className="text-sm text-slate-500 mt-1.5">{exam.description}</p>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//         {[
//           { label: "Duration", value: `${exam.durationMinutes} min`, icon: Clock },
//           { label: "Questions", value: questionCount, icon: ListChecks },
//           { label: "Total Marks", value: exam.totalMarks, icon: ShieldAlert },
//           { label: "Negative Marking", value: exam.negativeMarks || "None", icon: AlertCircle },
//         ].map(({ label, value, icon: Icon }) => (
//           <Card key={label} className="p-4 text-center">
//             <Icon className="w-4.5 h-4.5 text-navy-500 mx-auto mb-1.5" />
//             <p className="text-lg font-display font-bold text-navy-900">{value}</p>
//             <p className="text-[11px] text-slate-500">{label}</p>
//           </Card>
//         ))}
//       </div>

//       {isLocked && (
//         <Card className="p-5 flex items-start gap-3 bg-gold-50 border-gold-200">
//           <Lock className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
//           <div>
//             <p className="text-sm font-semibold text-gold-800">This is a premium exam</p>
//             <p className="text-sm text-gold-700/90 mt-0.5">
//               Subscribe to unlock this test along with every other premium mock test on the platform.
//             </p>
//           </div>
//         </Card>
//       )}

//       {!isLocked && isLimited && (
//         <Card
//           className={`p-5 flex items-start gap-3 ${isExhausted ? "bg-red-50 border-red-200" : "bg-navy-50 border-navy-100"
//             }`}
//         >
//           <RotateCcw className={`w-5 h-5 shrink-0 mt-0.5 ${isExhausted ? "text-red-600" : "text-navy-600"}`} />
//           <div>
//             <p className={`text-sm font-semibold ${isExhausted ? "text-red-700" : "text-navy-800"}`}>
//               {isExhausted
//                 ? "You've used all your attempts for this exam"
//                 : `${attemptInfo.remaining} of ${attemptInfo.max} attempt${attemptInfo.max > 1 ? "s" : ""} remaining`}
//             </p>
//             <p className={`text-sm mt-0.5 ${isExhausted ? "text-red-700/90" : "text-navy-600/90"}`}>
//               {isExhausted
//                 ? "Upgrade your plan to unlock more attempts on this exam."
//                 : `You've attempted this exam ${attemptInfo.used} of ${attemptInfo.max} times allowed on your current plan.`}
//             </p>
//           </div>
//         </Card>
//       )}

//       <Card className="p-6">
//         <h2 className="font-display font-semibold text-navy-900 mb-3">Instructions</h2>
//         {exam.instructions?.length > 0 ? (
//           <ul className="space-y-2.5 text-sm text-navy-700 list-decimal list-inside">
//             {exam.instructions.map((line, i) => (
//               <li key={i}>{line}</li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-sm text-slate-400">No special instructions provided for this exam.</p>
//         )}

//         {!isLocked && !isExhausted && (
//           <label className="flex items-start gap-2.5 mt-6 pt-5 border-t border-slate-200 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={agreed}
//               onChange={(e) => setAgreed(e.target.checked)}
//               className="mt-0.5 w-4 h-4 rounded border-slate-300 text-navy-700 focus:ring-navy-500"
//             />
//             <span className="text-sm text-navy-700">
//               I have read the instructions and understand the timer cannot be paused once I start.
//             </span>
//           </label>
//         )}
//       </Card>

//       {error && <p className="text-sm text-red-600">{error}</p>}

//       {isLocked ? (
//         <Link to="/subscription">
//           <Button size="lg" className="w-full" icon={Crown} variant="gold">
//             Subscribe to Unlock
//           </Button>
//         </Link>
//       ) : isExhausted ? (
//         <Link to="/subscription">
//           <Button size="lg" className="w-full" icon={Crown} variant="gold">
//             Upgrade for More Attempts
//           </Button>
//         </Link>
//       ) : (
//         <Button
//           size="lg"
//           className="w-full"
//           icon={PlayCircle}
//           disabled={!agreed}
//           isLoading={starting}
//           onClick={handleStart}
//         >
//           Start Exam
//         </Button>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Clock,
  ListChecks,
  AlertCircle,
  ShieldAlert,
  PlayCircle,
  Crown,
  Lock,
  RotateCcw,
  Layers,
  ArrowRightCircle,
} from "lucide-react";
import { examService } from "../services/examService.js";
import { attemptService } from "../services/attemptService.js";
import { useSubscription } from "../hooks/useSubscription.js";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import Badge from "../components/ui/Badge.jsx";

export default function ExamInstructionsPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { isActive: hasActivePlan } = useSubscription();
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

  const { exam, questionCount, attemptInfo, sections } = data;
  const isLocked = exam.isPremium && !hasActivePlan;
  const isLimited = attemptInfo && attemptInfo.max !== null;
  const isExhausted = isLimited && attemptInfo.remaining === 0;
  const timedSections = exam.isSectionTimed ? (sections || []).filter((s) => s.durationMinutes) : [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="font-display text-2xl font-bold text-navy-900">{exam.title}</h1>
          {exam.isPremium && (
            <Badge variant="gold" className="flex items-center gap-1">
              <Crown className="w-3 h-3" /> Premium
            </Badge>
          )}
        </div>
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

      {exam.isSectionTimed && timedSections.length > 0 && (
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4.5 h-4.5 text-navy-600" />
            <h2 className="font-display font-semibold text-navy-900">Section-wise Timing</h2>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Each section has its own timer. Once you move to the next section — or its time runs
            out — you can't go back to a previous one.
          </p>
          <ul className="space-y-2">
            {timedSections.map((section, i) => (
              <li
                key={section._id}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-navy-50 border border-navy-100"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-navy-800">
                  {i >= 0 && <ArrowRightCircle className="w-3.5 h-3.5 text-navy-300" />}
                  {section.title}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-navy-600">
                  <Clock className="w-3.5 h-3.5" />
                  {section.durationMinutes} min
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {isLocked && (
        <Card className="p-5 flex items-start gap-3 bg-gold-50 border-gold-200">
          <Lock className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gold-800">This is a premium exam</p>
            <p className="text-sm text-gold-700/90 mt-0.5">
              Subscribe to unlock this test along with every other premium mock test on the platform.
            </p>
          </div>
        </Card>
      )}

      {!isLocked && isLimited && (
        <Card
          className={`p-5 flex items-start gap-3 ${isExhausted ? "bg-red-50 border-red-200" : "bg-navy-50 border-navy-100"
            }`}
        >
          <RotateCcw className={`w-5 h-5 shrink-0 mt-0.5 ${isExhausted ? "text-red-600" : "text-navy-600"}`} />
          <div>
            <p className={`text-sm font-semibold ${isExhausted ? "text-red-700" : "text-navy-800"}`}>
              {isExhausted
                ? "You've used all your attempts for this exam"
                : `${attemptInfo.remaining} of ${attemptInfo.max} attempt${attemptInfo.max > 1 ? "s" : ""} remaining`}
            </p>
            <p className={`text-sm mt-0.5 ${isExhausted ? "text-red-700/90" : "text-navy-600/90"}`}>
              {isExhausted
                ? "Upgrade your plan to unlock more attempts on this exam."
                : `You've attempted this exam ${attemptInfo.used} of ${attemptInfo.max} times allowed on your current plan.`}
            </p>
          </div>
        </Card>
      )}

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

        {!isLocked && !isExhausted && (
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
        )}
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {isLocked ? (
        <Link to="/subscription">
          <Button size="lg" className="w-full" icon={Crown} variant="gold">
            Subscribe to Unlock
          </Button>
        </Link>
      ) : isExhausted ? (
        <Link to="/subscription">
          <Button size="lg" className="w-full" icon={Crown} variant="gold">
            Upgrade for More Attempts
          </Button>
        </Link>
      ) : (
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
      )}
    </div>
  );
}