import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import { Select, Textarea } from "./ui/FormFields.jsx";
import { questionService } from "../services/questionService.js";

const OPTION_IDS = ["optA", "optB", "optC", "optD"];

const getDefaultValues = (question = null) => ({
  questionText: question?.questionText ?? "",
  optA: question?.options?.find((option) => option.id === "optA")?.text ?? "",
  optB: question?.options?.find((option) => option.id === "optB")?.text ?? "",
  optC: question?.options?.find((option) => option.id === "optC")?.text ?? "",
  optD: question?.options?.find((option) => option.id === "optD")?.text ?? "",
  correctOptionId: question?.correctOptionId ?? "optA",
  marks: question?.marks ?? 1,
  topic: question?.topic ?? "General",
  difficulty: question?.difficulty ?? "medium",
  explanation: question?.explanation ?? "",
  sectionId: question?.sectionId ?? "",
});

export default function QuestionForm({ examId, sections, initialQuestion = null, onCreated, onUpdated, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: getDefaultValues(initialQuestion),
  });

  useEffect(() => {
    reset(getDefaultValues(initialQuestion));
  }, [initialQuestion, reset]);

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

    if (initialQuestion?._id) {
      const updatedQuestion = await questionService.update(initialQuestion._id, payload);
      reset(getDefaultValues(updatedQuestion));
      onUpdated?.(updatedQuestion);
      return;
    }

    await questionService.create(payload);
    reset(getDefaultValues());
    onCreated?.();
  };

  const isEditing = Boolean(initialQuestion?._id);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-navy-900">{isEditing ? "Edit question" : "Add a new question"}</h3>
      </div>

      <Textarea
        label="Question text"
        rows={7}
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

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" icon={Plus} isLoading={isSubmitting}>
          {isEditing ? "Save Changes" : "Add Question"}
        </Button>

        {isEditing && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              reset(getDefaultValues());
              onCancel?.();
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
