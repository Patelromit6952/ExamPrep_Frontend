// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft, Users } from "lucide-react";
// import { examService } from "../services/examService.js";
// import Card from "../components/ui/Card.jsx";
// import Badge from "../components/ui/Badge.jsx";
// import Spinner from "../components/ui/Spinner.jsx";

// export default function AdminExamAttemptsPage() {
//   const { examId } = useParams();
//   const [exam, setExam] = useState(null);
//   const [attempts, setAttempts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     Promise.all([examService.getById(examId), examService.getExamAttempts(examId)]).then(
//       ([examData, attemptData]) => {
//         setExam(examData.exam);
//         setAttempts(attemptData);
//       }
//     ).finally(() => setLoading(false));
//   }, [examId]);

//   if (loading) return <Spinner full label="Loading attempts..." />;

//   const avgScore = attempts.length
//     ? Math.round((attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length) * 100) / 100
//     : 0;

//   return (
//     <div className="space-y-6">
//       <div>
//         <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm text-navy-600 hover:underline mb-2">
//           <ArrowLeft className="w-4 h-4" />
//           Back to exams
//         </Link>
//         <h1 className="font-display text-2xl font-bold text-navy-900">{exam.title}</h1>
//         <p className="text-sm text-slate-500 mt-1">
//           {attempts.length} attempt{attempts.length === 1 ? "" : "s"} &middot; Average score: {avgScore} /{" "}
//           {exam.totalMarks}
//         </p>
//       </div>

//       {attempts.length === 0 ? (
//         <Card className="p-10 text-center text-sm text-slate-400 flex flex-col items-center gap-2">
//           <Users className="w-6 h-6 text-slate-300" />
//           No student has attempted this exam yet.
//         </Card>
//       ) : (
//         <Card className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-400">
//                 <th className="px-4 py-3 font-semibold">Rank</th>
//                 <th className="px-4 py-3 font-semibold">Student</th>
//                 <th className="px-4 py-3 font-semibold">Score</th>
//                 <th className="px-4 py-3 font-semibold">Correct</th>
//                 <th className="px-4 py-3 font-semibold">Wrong</th>
//                 <th className="px-4 py-3 font-semibold">Unanswered</th>
//                 <th className="px-4 py-3 font-semibold">Status</th>
//                 <th className="px-4 py-3 font-semibold">Submitted</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attempts.map((a, i) => (
//                 <tr key={a._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
//                   <td className="px-4 py-3 font-medium text-navy-500">#{i + 1}</td>
//                   <td className="px-4 py-3">
//                     <p className="font-medium text-navy-900">{a.userId?.name}</p>
//                     <p className="text-xs text-slate-400">{a.userId?.email}</p>
//                   </td>
//                   <td className="px-4 py-3 font-semibold text-navy-800">
//                     {a.score} / {exam.totalMarks}
//                   </td>
//                   <td className="px-4 py-3 text-green-600">{a.correctCount}</td>
//                   <td className="px-4 py-3 text-red-500">{a.wrongCount}</td>
//                   <td className="px-4 py-3 text-slate-500">{a.unansweredCount}</td>
//                   <td className="px-4 py-3">
//                     <Badge variant={a.status === "auto-submitted" ? "slate" : "green"}>
//                       {a.status === "auto-submitted" ? "Auto" : "Manual"}
//                     </Badge>
//                   </td>
//                   <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
//                     {new Date(a.submittedAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </Card>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Users, ChevronLeft, ChevronRight } from "lucide-react"; // Added Chevron icons
import { examService } from "../services/examService.js";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import Spinner from "../components/ui/Spinner.jsx";

export default function AdminExamAttemptsPage() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Pagination logic
  const totalPages = Math.ceil(attempts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAttempts = attempts.slice(indexOfFirstItem, indexOfLastItem);

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
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-400 bg-slate-50/50">
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
                {currentAttempts.map((a, i) => (
                  <tr key={a._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-navy-500">#{indexOfFirstItem + i + 1}</td>
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
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50/50">
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, attempts.length)}
                </span>{" "}
                of <span className="font-medium">{attempts.length}</span> results
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-transparent"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-transparent"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}