// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { ArrowLeft, Trash2 } from "lucide-react";
// import { examService } from "../services/examService.js";
// import { questionService } from "../services/questionService.js";
// import SectionManager from "../components/SectionManager.jsx";
// import QuestionForm from "../components/QuestionForm.jsx";
// import CsvUploadForm from "../components/CsvUploadForm.jsx";
// import Card from "../components/ui/Card.jsx";
// import Badge from "../components/ui/Badge.jsx";
// import Spinner from "../components/ui/Spinner.jsx";

// export default function ManageQuestionsPage() {
//   const { examId } = useParams();
//   const [exam, setExam] = useState(null);
//   const [sections, setSections] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("manual"); // manual | csv

//   const sectionMap = new Map(sections.map((s) => [s._id, s.title]));

//   const loadAll = async () => {
//     const [examData, sectionData, questionData] = await Promise.all([
//       examService.getById(examId),
//       examService.getSections(examId),
//       questionService.list(examId),
//     ]);
//     setExam(examData.exam);
//     setSections(sectionData);
//     setQuestions(questionData);
//   };

//   useEffect(() => {
//     loadAll().finally(() => setLoading(false));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [examId]);

//   const handleDeleteQuestion = async (id) => {
//     await questionService.remove(id);
//     setQuestions((prev) => prev.filter((q) => q._id !== id));
//   };

//   if (loading) return <Spinner full label="Loading question bank..." />;

//   return (
//     <div className="space-y-6">
//       <div>
//         <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm text-navy-600 hover:underline mb-2">
//           <ArrowLeft className="w-4 h-4" />
//           Back to exams
//         </Link>
//         <h1 className="font-display text-2xl font-bold text-navy-900">{exam.title}</h1>
//         <p className="text-sm text-slate-500 mt-1">{questions.length} questions in the question bank</p>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-1 space-y-6">
//           <SectionManager examId={examId} sections={sections} onChange={loadAll} />
//         </div>

//         <div className="lg:col-span-2 space-y-6">
//           <Card className="p-5 sm:p-6">
//             <div className="flex gap-1 mb-5 border-b border-slate-200">
//               {[
//                 { id: "manual", label: "Add Manually" },
//                 { id: "csv", label: "Bulk Upload (CSV)" },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
//                     activeTab === tab.id
//                       ? "border-navy-700 text-navy-800"
//                       : "border-transparent text-slate-400 hover:text-navy-600"
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </div>

//             {activeTab === "manual" ? (
//               <QuestionForm examId={examId} sections={sections} onCreated={loadAll} />
//             ) : (
//               <CsvUploadForm examId={examId} onUploaded={loadAll} />
//             )}
//           </Card>

//           <div>
//             <h2 className="font-display font-semibold text-navy-900 mb-3">Question Bank</h2>
//             {questions.length === 0 ? (
//               <Card className="p-8 text-center text-sm text-slate-400">No questions added yet.</Card>
//             ) : (
//               <div className="space-y-3">
//                 {questions.map((q, i) => (
//                   <Card key={q._id} className="p-4">
//                     <div className="flex items-start justify-between gap-3">
//                       <div className="min-w-0">
//                         <p className="text-sm font-medium text-navy-900">
//                           {i + 1}. {q.questionText}
//                         </p>
//                         <div className="flex items-center gap-1.5 mt-2 flex-wrap">
//                           <Badge variant="navy">{q.topic}</Badge>
//                           <Badge variant="slate">{q.difficulty}</Badge>
//                           <Badge variant="gold">{q.marks} marks</Badge>
//                           {q.sectionId && <Badge variant="green">{sectionMap.get(q.sectionId) || "Section"}</Badge>}
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => handleDeleteQuestion(q._id)}
//                         className="p-2 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 shrink-0"
//                         aria-label="Delete question"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, PencilLine, Trash2 } from "lucide-react";
import { examService } from "../services/examService.js";
import { questionService } from "../services/questionService.js";
import QuestionForm from "../components/QuestionForm.jsx";
import CsvUploadForm from "../components/CsvUploadForm.jsx";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import Spinner from "../components/ui/Spinner.jsx";

export default function ManageQuestionsPage() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("manual"); // manual | csv

  const sectionMap = new Map(sections.map((s) => [s._id, s.title]));

  const loadAll = async () => {
    const [examData, sectionData, questionData] = await Promise.all([
      examService.getById(examId),
      examService.getSections(examId),
      questionService.list(examId),
    ]);
    setExam(examData.exam);
    setSections(sectionData);
    setQuestions(questionData);
  };

  useEffect(() => {
    loadAll().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId]);

  const handleDeleteQuestion = async (id) => {
    await questionService.remove(id);
    if (editingQuestion?._id === id) {
      setEditingQuestion(null);
    }
    setQuestions((prev) => prev.filter((q) => q._id !== id));
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setActiveTab("manual");
  };

  if (loading) return <Spinner full label="Loading question bank..." />;

  return (
    <div className="space-y-6">
      <div>
        <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm text-navy-600 hover:underline mb-2">
          <ArrowLeft className="w-4 h-4" />
          Back to exams
        </Link>
        <h1 className="font-display text-2xl font-bold text-navy-900">{exam.title}</h1>
        <p className="text-sm text-slate-500 mt-1">{questions.length} questions in the question bank</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,420px)] xl:items-start">
        <Card className="p-5 sm:p-6">
          <div className="flex gap-1 mb-5 border-b border-slate-200">
            {[
              { id: "manual", label: "Add Manually" },
              { id: "csv", label: "Bulk Upload (CSV)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === tab.id
                  ? "border-navy-700 text-navy-800"
                  : "border-transparent text-slate-400 hover:text-navy-600"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "manual" ? (
            <QuestionForm
              examId={examId}
              sections={sections}
              initialQuestion={editingQuestion}
              onCreated={async () => {
                setEditingQuestion(null);
                await loadAll();
              }}
              onUpdated={async () => {
                setEditingQuestion(null);
                await loadAll();
              }}
              onCancel={() => setEditingQuestion(null)}
            />
          ) : (
            <CsvUploadForm examId={examId} sections={sections} onUploaded={loadAll} />
          )}
        </Card>

        <div className="xl:sticky xl:top-6">
          <h2 className="font-display font-semibold text-navy-900 mb-3">Question Bank</h2>
          {questions.length === 0 ? (
            <Card className="p-8 text-center text-sm text-slate-400">No questions added yet.</Card>
          ) : (
            <div className="space-y-3 max-h-[72vh] overflow-y-auto pr-1">
              {questions.map((q, i) => (
                <Card key={q._id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy-900">
                        {i + 1}. {q.questionText}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <Badge variant="navy">{q.topic}</Badge>
                        <Badge variant="slate">{q.difficulty}</Badge>
                        <Badge variant="gold">{q.marks} marks</Badge>
                        {/* {q.sectionId && <Badge variant="green">{sectionMap.get(q.sectionId) || "Section"}</Badge>} */}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEditQuestion(q)}
                        className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-2 text-slate-700 hover:border-navy-300 hover:text-navy-700"
                        aria-label={`Edit question ${i + 1}`}
                      >
                        <PencilLine className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q._id)}
                        className="p-2 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 shrink-0"
                        aria-label="Delete question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 