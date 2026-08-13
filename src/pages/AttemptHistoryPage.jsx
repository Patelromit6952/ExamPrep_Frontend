// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import { attemptService } from "../services/attemptService.js";
// import Card from "../components/ui/Card.jsx";
// import Badge from "../components/ui/Badge.jsx";
// import Spinner from "../components/ui/Spinner.jsx";

// export default function AttemptHistoryPage() {
//   const [attempts, setAttempts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     attemptService.history().then(setAttempts).finally(() => setLoading(false));
//   }, []);

//   if (loading) return <Spinner full label="Loading your attempt history..." />;

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="font-display text-2xl font-bold text-navy-900">Attempt History</h1>
//         <p className="text-sm text-slate-500 mt-1">Review every mock test you've completed.</p>
//       </div>

//       {attempts.length === 0 ? (
//         <Card className="p-10 text-center text-sm text-slate-400">
//           You haven't completed any exams yet.{" "}
//           <Link to="/exams" className="text-navy-600 font-semibold hover:underline">
//             Browse exams
//           </Link>
//         </Card>
//       ) : (
//         <div className="space-y-4">
//           {attempts.map((a) => {
//             const percentage =
//               a.examId?.totalMarks > 0 ? Math.max(0, Math.round((a.score / a.examId.totalMarks) * 100)) : 0;
//             return (
//               <Link key={a._id} to={`/result/${a._id}`}>
//                 <Card className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:shadow-elevated transition-shadow">
//                   <div className="min-w-0">
//                     <p className="font-medium text-navy-900 truncate">{a.examId?.title}</p>
//                     <div className="flex items-center gap-2 mt-1.5">
//                       <Badge variant={a.status === "auto-submitted" ? "slate" : "navy"}>
//                         {a.status === "auto-submitted" ? "Auto-submitted" : "Submitted"}
//                       </Badge>
//                       <span className="text-xs text-slate-400">
//                         {new Date(a.submittedAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4 shrink-0">
//                     <div className="text-right">
//                       <p className="font-display font-bold text-navy-900">
//                         {a.score} / {a.examId?.totalMarks}
//                       </p>
//                       <p className={`text-xs font-semibold ${percentage >= 50 ? "text-green-600" : "text-red-500"}`}>
//                         {percentage}%
//                       </p>
//                     </div>
//                     <ArrowRight className="w-4 h-4 text-slate-400" />
//                   </div>
//                 </Card>
//               </Link>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"; // Added Chevron icons
import { attemptService } from "../services/attemptService.js";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import Spinner from "../components/ui/Spinner.jsx";

export default function AttemptHistoryPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can change this number to show more/less items per page

  useEffect(() => {
    attemptService.history().then(setAttempts).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner full label="Loading your attempt history..." />;

  // Pagination logic
  const totalPages = Math.ceil(attempts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAttempts = attempts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-900">Attempt History</h1>
        <p className="text-sm text-slate-500 mt-1">Review every mock test you've completed.</p>
      </div>

      {attempts.length === 0 ? (
        <Card className="p-10 text-center text-sm text-slate-400">
          You haven't completed any exams yet.{" "}
          <Link to="/exams" className="text-navy-600 font-semibold hover:underline">
            Browse exams
          </Link>
        </Card>
      ) : (
        <>
          {/* Changed space-y-4 to flex-col gap-6 for better spacing */}
          <div className="flex flex-col gap-6">
            {currentAttempts.map((a) => {
              const percentage =
                a.examId?.totalMarks > 0 ? Math.max(0, Math.round((a.score / a.examId.totalMarks) * 100)) : 0;
              return (
                // Added className="block" to ensure proper block layout and spacing
                <Link key={a._id} to={`/result/${a._id}`} className="block">
                  <Card className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:shadow-elevated transition-shadow">
                    <div className="min-w-0">
                      <p className="font-medium text-navy-900 truncate">{a.examId?.title}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge variant={a.status === "auto-submitted" ? "slate" : "navy"}>
                          {a.status === "auto-submitted" ? "Auto-submitted" : "Submitted"}
                        </Badge>
                        <span className="text-xs text-slate-400">
                          {new Date(a.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <p className="font-display font-bold text-navy-900">
                          {a.score} / {a.examId?.totalMarks}
                        </p>
                        <p className={`text-xs font-semibold ${percentage >= 50 ? "text-green-600" : "text-red-500"}`}>
                          {percentage}%
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
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
                  className="p-2 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}