import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import { Select, Textarea } from "./ui/FormFields.jsx";
import { questionService } from "../services/questionService.js";

const OPTION_IDS = ["optA", "optB", "optC", "optD"];

export default function QuestionForm({ examId, sections, onCreated }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      questionText: "",
      optA: "",
      optB: "",
      optC: "",
      optD: "",
      correctOptionId: "optA",
      marks: 1,
      topic: "General",
      difficulty: "medium",
      explanation: "",
      sectionId: "",
    },
  });

  const onSubmit = async (values) => {
    const payload = {
      examId,
      sectionId: values.sectionId || null,
      questionText: values.questionText,
      options: OPTION_IDS.map((id) => ({ id, text: values[id] })),
      correctOptionId: values.correctOptionId,
      marks: Number(values.marks),
      topic: values.topic,
      difficulty: values.difficulty,
      explanation: values.explanation,
    };
    await questionService.create(payload);
    reset();
    onCreated?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textarea
        label="Question text"
        rows={3}
        placeholder="e.g. Who is known as the Father of the Indian Constitution?"
        error={errors.questionText?.message}
        {...register("questionText", { required: "Question text is required" })}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        {OPTION_IDS.map((id, i) => (
          <Input
            key={id}
            label={`Option ${String.fromCharCode(65 + i)}`}
            placeholder={`Option ${String.fromCharCode(65 + i)} text`}
            error={errors[id]?.message}
            {...register(id, { required: "Required" })}
          />
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Select label="Correct option" {...register("correctOptionId")}>
          {OPTION_IDS.map((id, i) => (
            <option key={id} value={id}>
              Option {String.fromCharCode(65 + i)}
            </option>
          ))}
        </Select>

        <Select label="Section (optional)" {...register("sectionId")}>
          <option value="">No section</option>
          {sections.map((s) => (
            <option key={s._id} value={s._id}>
              {s.title}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Input
          label="Marks"
          type="number"
          step="0.25"
          min="0.25"
          error={errors.marks?.message}
          {...register("marks", { required: true, min: 0.25 })}
        />
        <Input label="Topic" placeholder="e.g. Indian Polity" {...register("topic")} />
        <Select label="Difficulty" {...register("difficulty")}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>
      </div>

      <Textarea
        label="Explanation (optional)"
        rows={2}
        placeholder="Shown to students after they submit the exam"
        {...register("explanation")}
      />

      <Button type="submit" icon={Plus} isLoading={isSubmitting}>
        Add Question
      </Button>
    </form>
  );
}
