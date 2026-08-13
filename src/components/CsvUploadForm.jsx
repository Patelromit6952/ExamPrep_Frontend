// import { useRef, useState } from "react";
// import { UploadCloud, FileText, CheckCircle2, XCircle } from "lucide-react";
// import Button from "./ui/Button.jsx";
// import Card from "./ui/Card.jsx";
// import { questionService } from "../services/questionService.js";

// export default function CsvUploadForm({ examId, sectionId, onUploaded }) {
//   const fileInputRef = useRef(null);
//   const [file, setFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleUpload = async () => {
//     if (!file) return;
//     setIsUploading(true);
//     setError("");
//     setResult(null);
//     try {
//       const data = await questionService.bulkUpload(examId, sectionId, file);
//       setResult(data);
//       onUploaded?.();
//       setFile(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     } catch (err) {
//       setError(err.message || "Upload failed");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Card className="p-5">
//       <h3 className="font-display font-semibold text-navy-900 mb-1">Bulk Upload via CSV</h3>
//       <p className="text-xs text-slate-500 mb-4">
//         Columns required: questionText, optionA, optionB, optionC, optionD, correctOption (A/B/C/D), marks,
//         topic, difficulty, explanation
//       </p>

//       <label
//         htmlFor="csv-file"
//         className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-lg py-8 cursor-pointer hover:border-navy-400 hover:bg-navy-50/40 transition-colors"
//       >
//         <UploadCloud className="w-8 h-8 text-slate-400" />
//         <p className="text-sm text-slate-600">
//           {file ? (
//             <span className="flex items-center gap-1.5 font-medium text-navy-700">
//               <FileText className="w-4 h-4" /> {file.name}
//             </span>
//           ) : (
//             <>Click to choose a .csv file</>
//           )}
//         </p>
//         <input
//           id="csv-file"
//           ref={fileInputRef}
//           type="file"
//           accept=".csv,text/csv"
//           className="hidden"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//         />
//       </label>

//       <Button className="w-full mt-4" onClick={handleUpload} disabled={!file} isLoading={isUploading}>
//         Upload Questions
//       </Button>

//       {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

//       {result && (
//         <div className="mt-4 space-y-2">
//           <div className="flex items-center gap-2 text-sm text-green-700">
//             <CheckCircle2 className="w-4 h-4" />
//             {result.successCount} question{result.successCount === 1 ? "" : "s"} added
//           </div>
//           {result.errorCount > 0 && (
//             <div className="text-sm text-red-600">
//               <div className="flex items-center gap-2 mb-1">
//                 <XCircle className="w-4 h-4" />
//                 {result.errorCount} row{result.errorCount === 1 ? "" : "s"} failed
//               </div>
//               <ul className="list-disc list-inside text-xs space-y-0.5 max-h-32 overflow-y-auto scrollbar-thin bg-red-50 rounded-md p-2.5">
//                 {result.errors.map((e, i) => (
//                   <li key={i}>{e}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </Card>
//   );
// }



import { useRef, useState } from "react";
import { UploadCloud, FileText, CheckCircle2, XCircle } from "lucide-react";
import Button from "./ui/Button.jsx";
import Card from "./ui/Card.jsx";
import { Select } from "./ui/FormFields.jsx";
import { questionService } from "../services/questionService.js";

export default function CsvUploadForm({ examId, sections = [], onUploaded }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [sectionId, setSectionId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setError("");
    setResult(null);
    try {
      const data = await questionService.bulkUpload(examId, sectionId || null, file);
      setResult(data);
      onUploaded?.();
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-5">
      <h3 className="font-display font-semibold text-navy-900 mb-1">Bulk Upload via CSV</h3>
      <p className="text-xs text-slate-500 mb-4">
        Columns required: questionText, optionA, optionB, optionC, optionD, correctOption (A/B/C/D), marks,
        topic, difficulty, explanation
      </p>

      <Select
        label="Add these questions to"
        value={sectionId}
        onChange={(e) => setSectionId(e.target.value)}
        className="mb-4"
      >
        <option value="">No section (unsectioned)</option>
        {sections.map((s) => (
          <option key={s._id} value={s._id}>
            {s.title}
          </option>
        ))}
      </Select>

      <label
        htmlFor="csv-file"
        className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-lg py-8 cursor-pointer hover:border-navy-400 hover:bg-navy-50/40 transition-colors"
      >
        <UploadCloud className="w-8 h-8 text-slate-400" />
        <p className="text-sm text-slate-600">
          {file ? (
            <span className="flex items-center gap-1.5 font-medium text-navy-700">
              <FileText className="w-4 h-4" /> {file.name}
            </span>
          ) : (
            <>Click to choose a .csv file</>
          )}
        </p>
        <input
          id="csv-file"
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>

      <Button className="w-full mt-4" onClick={handleUpload} disabled={!file} isLoading={isUploading}>
        Upload Questions
      </Button>

      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

      {result && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-green-700">
            <CheckCircle2 className="w-4 h-4" />
            {result.successCount} question{result.successCount === 1 ? "" : "s"} added
          </div>
          {result.errorCount > 0 && (
            <div className="text-sm text-red-600">
              <div className="flex items-center gap-2 mb-1">
                <XCircle className="w-4 h-4" />
                {result.errorCount} row{result.errorCount === 1 ? "" : "s"} failed
              </div>
              <ul className="list-disc list-inside text-xs space-y-0.5 max-h-32 overflow-y-auto scrollbar-thin bg-red-50 rounded-md p-2.5">
                {result.errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}