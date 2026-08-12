// import { useEffect, useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import { Plus, Trash2, Save } from "lucide-react";
// import { examService } from "../services/examService.js";
// import { EXAM_CATEGORIES } from "../utils/constants.js";
// import Card from "../components/ui/Card.jsx";
// import Input from "../components/ui/Input.jsx";
// import Button from "../components/ui/Button.jsx";
// import { Select, Textarea } from "../components/ui/FormFields.jsx";
// import Spinner from "../components/ui/Spinner.jsx";

// export default function CreateExamPage() {
//   const { examId } = useParams();
//   const isEditing = Boolean(examId);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(isEditing);
//   const [serverError, setServerError] = useState("");

//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: {
//       title: "",
//       description: "",
//       category: "SSC",
//       durationMinutes: 60,
//       totalMarks: 100,
//       negativeMarks: 0.5,
//       instructions: [{ value: "" }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({ control, name: "instructions" });

//   useEffect(() => {
//     if (!isEditing) return;
//     examService.getById(examId).then(({ exam }) => {
//       reset({
//         title: exam.title,
//         description: exam.description,
//         category: exam.category,
//         durationMinutes: exam.durationMinutes,
//         totalMarks: exam.totalMarks,
//         negativeMarks: exam.negativeMarks,
//         instructions: exam.instructions?.length ? exam.instructions.map((v) => ({ value: v })) : [{ value: "" }],
//       });
//       setLoading(false);
//     });
//   }, [examId, isEditing, reset]);

//   const onSubmit = async (values) => {
//     setServerError("");
//     const payload = {
//       ...values,
//       durationMinutes: Number(values.durationMinutes),
//       totalMarks: Number(values.totalMarks),
//       negativeMarks: Number(values.negativeMarks),
//       instructions: values.instructions.map((i) => i.value).filter((v) => v.trim()),
//     };
//     try {
//       if (isEditing) {
//         await examService.update(examId, payload);
//         navigate("/admin");
//       } else {
//         const exam = await examService.create(payload);
//         navigate(`/admin/exams/${exam._id}/questions`);
//       }
//     } catch (err) {
//       setServerError(err.message || "Something went wrong");
//     }
//   };

//   if (loading) return <Spinner full label="Loading exam..." />;

//   return (
//     <div className="max-w-2xl space-y-6">
//       <div>
//         <h1 className="font-display text-2xl font-bold text-navy-900">
//           {isEditing ? "Edit Exam" : "Create New Exam"}
//         </h1>
//         <p className="text-sm text-slate-500 mt-1">
//           {isEditing ? "Update the exam details below." : "Fill in the exam details, then add questions."}
//         </p>
//       </div>

//       <Card className="p-5 sm:p-6">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <Input
//             label="Exam title"
//             placeholder="e.g. SSC CGL Tier 1 Mock Test 1"
//             error={errors.title?.message}
//             {...register("title", { required: "Title is required", minLength: 3 })}
//           />

//           <Textarea
//             label="Description"
//             rows={3}
//             placeholder="Brief description of what this exam covers"
//             {...register("description")}
//           />

//           <div className="grid sm:grid-cols-2 gap-4">
//             <Select label="Category" {...register("category")}>
//               {EXAM_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </Select>
//             <Input
//               label="Duration (minutes)"
//               type="number"
//               min="1"
//               error={errors.durationMinutes?.message}
//               {...register("durationMinutes", { required: true, min: 1 })}
//             />
//           </div>

//           <div className="grid sm:grid-cols-2 gap-4">
//             <Input
//               label="Total marks"
//               type="number"
//               min="0"
//               error={errors.totalMarks?.message}
//               {...register("totalMarks", { required: true, min: 0 })}
//             />
//             <Input
//               label="Negative marks (per wrong answer)"
//               type="number"
//               step="0.25"
//               min="0"
//               {...register("negativeMarks", { min: 0 })}
//             />
//           </div>

//           <div>
//             <p className="text-sm font-medium text-navy-800 mb-2">Instructions</p>
//             <div className="space-y-2">
//               {fields.map((field, index) => (
//                 <div key={field.id} className="flex gap-2">
//                   <Input
//                     placeholder={`Instruction ${index + 1}`}
//                     className="flex-1"
//                     {...register(`instructions.${index}.value`)}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => remove(index)}
//                     className="p-2.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
//                     aria-label="Remove instruction"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => append({ value: "" })}
//               className="mt-2 flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:underline"
//             >
//               <Plus className="w-4 h-4" /> Add instruction
//             </button>
//           </div>

//           {serverError && <p className="text-sm text-red-600">{serverError}</p>}

//           <Button type="submit" icon={Save} isLoading={isSubmitting}>
//             {isEditing ? "Save Changes" : "Create Exam & Add Questions"}
//           </Button>
//         </form>
//       </Card>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2, Save } from "lucide-react";
import { examService } from "../services/examService.js";
import { EXAM_CATEGORIES } from "../utils/constants.js";
import Card from "../components/ui/Card.jsx";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { Select, Textarea } from "../components/ui/FormFields.jsx";
import Spinner from "../components/ui/Spinner.jsx";

export default function CreateExamPage() {
  const { examId } = useParams();
  const isEditing = Boolean(examId);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEditing);
  const [serverError, setServerError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "SSC",
      durationMinutes: 60,
      totalMarks: 100,
      negativeMarks: 0.5,
      isPremium: false,
      instructions: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "instructions" });

  useEffect(() => {
    if (!isEditing) return;
    examService.getById(examId).then(({ exam }) => {
      reset({
        title: exam.title,
        description: exam.description,
        category: exam.category,
        durationMinutes: exam.durationMinutes,
        totalMarks: exam.totalMarks,
        negativeMarks: exam.negativeMarks,
        isPremium: exam.isPremium || false,
        instructions: exam.instructions?.length ? exam.instructions.map((v) => ({ value: v })) : [{ value: "" }],
      });
      setLoading(false);
    });
  }, [examId, isEditing, reset]);

  const onSubmit = async (values) => {
    setServerError("");
    const payload = {
      ...values,
      durationMinutes: Number(values.durationMinutes),
      totalMarks: Number(values.totalMarks),
      negativeMarks: Number(values.negativeMarks),
      instructions: values.instructions.map((i) => i.value).filter((v) => v.trim()),
    };
    try {
      if (isEditing) {
        await examService.update(examId, payload);
        navigate("/admin");
      } else {
        const exam = await examService.create(payload);
        navigate(`/admin/exams/${exam._id}/questions`);
      }
    } catch (err) {
      setServerError(err.message || "Something went wrong");
    }
  };

  if (loading) return <Spinner full label="Loading exam..." />;

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-900">
          {isEditing ? "Edit Exam" : "Create New Exam"}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {isEditing ? "Update the exam details below." : "Fill in the exam details, then add questions."}
        </p>
      </div>

      <Card className="p-5 sm:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Exam title"
            placeholder="e.g. SSC CGL Tier 1 Mock Test 1"
            error={errors.title?.message}
            {...register("title", { required: "Title is required", minLength: 3 })}
          />

          <Textarea
            label="Description"
            rows={3}
            placeholder="Brief description of what this exam covers"
            {...register("description")}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Category" {...register("category")}>
              {EXAM_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Input
              label="Duration (minutes)"
              type="number"
              min="1"
              error={errors.durationMinutes?.message}
              {...register("durationMinutes", { required: true, min: 1 })}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Total marks"
              type="number"
              min="0"
              error={errors.totalMarks?.message}
              {...register("totalMarks", { required: true, min: 0 })}
            />
            <Input
              label="Negative marks (per wrong answer)"
              type="number"
              step="0.25"
              min="0"
              {...register("negativeMarks", { min: 0 })}
            />
          </div>

          <label className="flex items-start gap-2.5 px-4 py-3.5 rounded-lg border border-gold-200 bg-gold-50 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded border-gold-400 text-gold-600 focus:ring-gold-500"
              {...register("isPremium")}
            />
            <span>
              <span className="block text-sm font-medium text-gold-800">Premium exam</span>
              <span className="block text-xs text-gold-700/80 mt-0.5">
                Only students with an active subscription can start this exam. Leave unchecked to keep
                it free for everyone.
              </span>
            </span>
          </label>

          <div>
            <p className="text-sm font-medium text-navy-800 mb-2">Instructions</p>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    placeholder={`Instruction ${index + 1}`}
                    className="flex-1"
                    {...register(`instructions.${index}.value`)}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                    aria-label="Remove instruction"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => append({ value: "" })}
              className="mt-2 flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:underline"
            >
              <Plus className="w-4 h-4" /> Add instruction
            </button>
          </div>

          {serverError && <p className="text-sm text-red-600">{serverError}</p>}

          <Button type="submit" icon={Save} isLoading={isSubmitting}>
            {isEditing ? "Save Changes" : "Create Exam & Add Questions"}
          </Button>
        </form>
      </Card>
    </div>
  );
}