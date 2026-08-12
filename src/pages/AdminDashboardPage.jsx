// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Eye, EyeOff, Trash2, ListChecks, Pencil, BarChart3, Plus } from "lucide-react";
// import { examService } from "../services/examService.js";
// import Card from "../components/ui/Card.jsx";
// import Badge from "../components/ui/Badge.jsx";
// import Button from "../components/ui/Button.jsx";
// import Spinner from "../components/ui/Spinner.jsx";
// import Modal from "../components/ui/Modal.jsx";

// export default function AdminDashboardPage() {
//   const [exams, setExams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pendingDelete, setPendingDelete] = useState(null);
//   const [busyId, setBusyId] = useState(null);

//   const loadExams = () => examService.list(true).then(setExams);

//   useEffect(() => {
//     loadExams().finally(() => setLoading(false));
//   }, []);

//   const handleTogglePublish = async (exam) => {
//     setBusyId(exam._id);
//     try {
//       await examService.togglePublish(exam._id);
//       await loadExams();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setBusyId(null);
//     }
//   };

//   const handleDelete = async () => {
//     if (!pendingDelete) return;
//     setBusyId(pendingDelete._id);
//     try {
//       await examService.remove(pendingDelete._id);
//       setPendingDelete(null);
//       await loadExams();
//     } finally {
//       setBusyId(null);
//     }
//   };

//   if (loading) return <Spinner full label="Loading exams..." />;

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="font-display text-2xl font-bold text-navy-900">Manage Exams</h1>
//           <p className="text-sm text-slate-500 mt-1">{exams.length} total exams</p>
//         </div>
//         <Link to="/admin/exams/new">
//           <Button icon={Plus}>New Exam</Button>
//         </Link>
//       </div>

//       {exams.length === 0 ? (
//         <Card className="p-10 text-center text-sm text-slate-400">
//           No exams yet.{" "}
//           <Link to="/admin/exams/new" className="text-navy-600 font-semibold hover:underline">
//             Create your first exam
//           </Link>
//         </Card>
//       ) : (
//         <div className="space-y-3">
//           {exams.map((exam) => (
//             <Card key={exam._id} className="p-4 sm:p-5 flex flex-wrap items-center gap-4">
//               <div className="flex-1 min-w-[200px]">
//                 <div className="flex items-center gap-2 mb-1">
//                   <p className="font-medium text-navy-900">{exam.title}</p>
//                   <Badge variant={exam.isPublished ? "green" : "slate"}>
//                     {exam.isPublished ? "Published" : "Draft"}
//                   </Badge>
//                 </div>
//                 <p className="text-xs text-slate-500">
//                   {exam.category} &middot; {exam.durationMinutes} min &middot; {exam.questionCount} questions &middot;{" "}
//                   {exam.totalMarks} marks
//                 </p>
//               </div>

//               <div className="flex items-center gap-1.5 flex-wrap">
//                 <Link to={`/admin/exams/${exam._id}/questions`}>
//                   <Button variant="secondary" size="sm" icon={ListChecks}>
//                     Questions
//                   </Button>
//                 </Link>
//                 <Link to={`/admin/exams/${exam._id}/edit`}>
//                   <Button variant="secondary" size="sm" icon={Pencil}>
//                     Edit
//                   </Button>
//                 </Link>
//                 <Link to={`/admin/exams/${exam._id}/attempts`}>
//                   <Button variant="secondary" size="sm" icon={BarChart3}>
//                     Results
//                   </Button>
//                 </Link>
//                 <Button
//                   variant="secondary"
//                   size="sm"
//                   icon={exam.isPublished ? EyeOff : Eye}
//                   isLoading={busyId === exam._id}
//                   onClick={() => handleTogglePublish(exam)}
//                 >
//                   {exam.isPublished ? "Unpublish" : "Publish"}
//                 </Button>
//                 <Button variant="danger" size="sm" icon={Trash2} onClick={() => setPendingDelete(exam)}>
//                   Delete
//                 </Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       )}

//       <Modal
//         open={Boolean(pendingDelete)}
//         onClose={() => setPendingDelete(null)}
//         title="Delete this exam?"
//         footer={
//           <>
//             <Button variant="secondary" onClick={() => setPendingDelete(null)}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={handleDelete} isLoading={busyId === pendingDelete?._id}>
//               Delete permanently
//             </Button>
//           </>
//         }
//       >
//         <p className="text-sm text-navy-700">
//           This will permanently delete <strong>{pendingDelete?.title}</strong>, along with all its sections,
//           questions, and student attempt records. This cannot be undone.
//         </p>
//       </Modal>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Trash2, ListChecks, Pencil, BarChart3, Plus, Crown } from "lucide-react";
import { examService } from "../services/examService.js";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import Modal from "../components/ui/Modal.jsx";

export default function AdminDashboardPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const loadExams = () => examService.list(true).then(setExams);

  useEffect(() => {
    loadExams().finally(() => setLoading(false));
  }, []);

  const handleTogglePublish = async (exam) => {
    setBusyId(exam._id);
    try {
      await examService.togglePublish(exam._id);
      await loadExams();
    } catch (err) {
      alert(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    setBusyId(pendingDelete._id);
    try {
      await examService.remove(pendingDelete._id);
      setPendingDelete(null);
      await loadExams();
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <Spinner full label="Loading exams..." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">Manage Exams</h1>
          <p className="text-sm text-slate-500 mt-1">{exams.length} total exams</p>
        </div>
        <Link to="/admin/exams/new">
          <Button icon={Plus}>New Exam</Button>
        </Link>
      </div>

      {exams.length === 0 ? (
        <Card className="p-10 text-center text-sm text-slate-400">
          No exams yet.{" "}
          <Link to="/admin/exams/new" className="text-navy-600 font-semibold hover:underline">
            Create your first exam
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {exams.map((exam) => (
            <Card key={exam._id} className="p-4 sm:p-5 flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-navy-900">{exam.title}</p>
                  <Badge variant={exam.isPublished ? "green" : "slate"}>
                    {exam.isPublished ? "Published" : "Draft"}
                  </Badge>
                  {exam.isPremium && (
                    <Badge variant="gold" className="flex items-center gap-1">
                      <Crown className="w-3 h-3" /> Premium
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {exam.category} &middot; {exam.durationMinutes} min &middot; {exam.questionCount} questions &middot;{" "}
                  {exam.totalMarks} marks
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <Link to={`/admin/exams/${exam._id}/questions`}>
                  <Button variant="secondary" size="sm" icon={ListChecks}>
                    Questions
                  </Button>
                </Link>
                <Link to={`/admin/exams/${exam._id}/edit`}>
                  <Button variant="secondary" size="sm" icon={Pencil}>
                    Edit
                  </Button>
                </Link>
                <Link to={`/admin/exams/${exam._id}/attempts`}>
                  <Button variant="secondary" size="sm" icon={BarChart3}>
                    Results
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={exam.isPublished ? EyeOff : Eye}
                  isLoading={busyId === exam._id}
                  onClick={() => handleTogglePublish(exam)}
                >
                  {exam.isPublished ? "Unpublish" : "Publish"}
                </Button>
                <Button variant="danger" size="sm" icon={Trash2} onClick={() => setPendingDelete(exam)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title="Delete this exam?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setPendingDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={busyId === pendingDelete?._id}>
              Delete permanently
            </Button>
          </>
        }
      >
        <p className="text-sm text-navy-700">
          This will permanently delete <strong>{pendingDelete?.title}</strong>, along with all its sections,
          questions, and student attempt records. This cannot be undone.
        </p>
      </Modal>
    </div>
  );
}