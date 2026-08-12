// import { useEffect, useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { Plus, Trash2, Pencil, X } from "lucide-react";
// import { subscriptionService } from "../services/subscriptionService.js";
// import Card from "../components/ui/Card.jsx";
// import Input from "../components/ui/Input.jsx";
// import Button from "../components/ui/Button.jsx";
// import Badge from "../components/ui/Badge.jsx";
// import Spinner from "../components/ui/Spinner.jsx";
// import { Textarea } from "../components/ui/FormFields.jsx";

// const emptyDefaults = {
//     name: "",
//     description: "",
//     price: 0,
//     durationDays: 30,
//     features: [{ value: "" }],
// };

// export default function AdminPlansPage() {
//     const [plans, setPlans] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [editingId, setEditingId] = useState(null);

//     const {
//         register,
//         control,
//         handleSubmit,
//         reset,
//         formState: { isSubmitting },
//     } = useForm({ defaultValues: emptyDefaults });
//     const { fields, append, remove } = useFieldArray({ control, name: "features" });

//     const loadPlans = () => subscriptionService.listPlans(true).then(setPlans);

//     useEffect(() => {
//         loadPlans().finally(() => setLoading(false));
//     }, []);

//     const startEdit = (plan) => {
//         setEditingId(plan._id);
//         reset({
//             name: plan.name,
//             description: plan.description,
//             price: plan.price,
//             durationDays: plan.durationDays,
//             features: plan.features?.length ? plan.features.map((v) => ({ value: v })) : [{ value: "" }],
//         });
//     };

//     const cancelEdit = () => {
//         setEditingId(null);
//         reset(emptyDefaults);
//     };

//     const onSubmit = async (values) => {
//         const payload = {
//             ...values,
//             price: Number(values.price),
//             durationDays: Number(values.durationDays),
//             features: values.features.map((f) => f.value).filter((v) => v.trim()),
//         };
//         if (editingId) {
//             await subscriptionService.updatePlan(editingId, payload);
//         } else {
//             await subscriptionService.createPlan(payload);
//         }
//         cancelEdit();
//         await loadPlans();
//     };

//     const handleToggleActive = async (plan) => {
//         await subscriptionService.updatePlan(plan._id, { isActive: !plan.isActive });
//         await loadPlans();
//     };

//     const handleDelete = async (planId) => {
//         await subscriptionService.removePlan(planId);
//         await loadPlans();
//     };

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h1 className="font-display text-2xl font-bold text-navy-900">Subscription Plans</h1>
//                 <p className="text-sm text-slate-500 mt-1">Create and manage the plans students can subscribe to.</p>
//             </div>

//             <Card className="p-5 sm:p-6">
//                 <div className="flex items-center justify-between mb-4">
//                     <h2 className="font-display font-semibold text-navy-900">{editingId ? "Edit Plan" : "New Plan"}</h2>
//                     {editingId && (
//                         <button
//                             onClick={cancelEdit}
//                             className="text-xs font-medium text-slate-400 hover:text-navy-600 flex items-center gap-1"
//                         >
//                             <X className="w-3.5 h-3.5" /> Cancel edit
//                         </button>
//                     )}
//                 </div>
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                     <Input label="Plan name" placeholder="e.g. Quarterly Pro" {...register("name", { required: true })} />
//                     <Textarea label="Description" rows={2} {...register("description")} />
//                     <div className="grid sm:grid-cols-2 gap-4">
//                         <Input
//                             label="Price (INR)"
//                             type="number"
//                             min="0"
//                             step="1"
//                             {...register("price", { required: true, min: 0 })}
//                         />
//                         <Input
//                             label="Duration (days)"
//                             type="number"
//                             min="1"
//                             {...register("durationDays", { required: true, min: 1 })}
//                         />
//                     </div>
//                     <div>
//                         <p className="text-sm font-medium text-navy-800 mb-2">Features</p>
//                         <div className="space-y-2">
//                             {fields.map((field, index) => (
//                                 <div key={field.id} className="flex gap-2">
//                                     <Input
//                                         placeholder={`Feature ${index + 1}`}
//                                         className="flex-1"
//                                         {...register(`features.${index}.value`)}
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => remove(index)}
//                                         className="p-2.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
//                                     >
//                                         <Trash2 className="w-4 h-4" />
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                         <button
//                             type="button"
//                             onClick={() => append({ value: "" })}
//                             className="mt-2 flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:underline"
//                         >
//                             <Plus className="w-4 h-4" /> Add feature
//                         </button>
//                     </div>
//                     <Button type="submit" isLoading={isSubmitting}>
//                         {editingId ? "Save Changes" : "Create Plan"}
//                     </Button>
//                 </form>
//             </Card>

//             {loading ? (
//                 <Spinner full label="Loading plans..." />
//             ) : (
//                 <div className="space-y-3">
//                     {plans.map((plan) => (
//                         <Card key={plan._id} className="p-4 sm:p-5 flex flex-wrap items-center gap-4">
//                             <div className="flex-1 min-w-[200px]">
//                                 <div className="flex items-center gap-2 mb-1">
//                                     <p className="font-medium text-navy-900">{plan.name}</p>
//                                     <Badge variant={plan.isActive ? "green" : "slate"}>
//                                         {plan.isActive ? "Active" : "Hidden"}
//                                     </Badge>
//                                 </div>
//                                 <p className="text-xs text-slate-500">
//                                     ₹{plan.price} / {plan.durationDays} days
//                                 </p>
//                             </div>
//                             <div className="flex items-center gap-1.5">
//                                 <Button variant="secondary" size="sm" icon={Pencil} onClick={() => startEdit(plan)}>
//                                     Edit
//                                 </Button>
//                                 <Button variant="secondary" size="sm" onClick={() => handleToggleActive(plan)}>
//                                     {plan.isActive ? "Hide" : "Show"}
//                                 </Button>
//                                 <Button variant="danger" size="sm" icon={Trash2} onClick={() => handleDelete(plan._id)}>
//                                     Delete
//                                 </Button>
//                             </div>
//                         </Card>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }


import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { subscriptionService } from "../services/subscriptionService.js";
import Card from "../components/ui/Card.jsx";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import { Textarea } from "../components/ui/FormFields.jsx";

const emptyDefaults = {
    name: "",
    description: "",
    price: 0,
    durationDays: 30,
    maxAttemptsPerExam: 5,
    features: [{ value: "" }],
};

export default function AdminPlansPage() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm({ defaultValues: emptyDefaults });
    const { fields, append, remove } = useFieldArray({ control, name: "features" });

    const loadPlans = () => subscriptionService.listPlans(true).then(setPlans);

    useEffect(() => {
        loadPlans().finally(() => setLoading(false));
    }, []);

    const startEdit = (plan) => {
        setEditingId(plan._id);
        reset({
            name: plan.name,
            description: plan.description,
            price: plan.price,
            durationDays: plan.durationDays,
            maxAttemptsPerExam: plan.maxAttemptsPerExam ?? 0,
            features: plan.features?.length ? plan.features.map((v) => ({ value: v })) : [{ value: "" }],
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        reset(emptyDefaults);
    };

    const onSubmit = async (values) => {
        const payload = {
            ...values,
            price: Number(values.price),
            durationDays: Number(values.durationDays),
            maxAttemptsPerExam: Number(values.maxAttemptsPerExam) || 0,
            features: values.features.map((f) => f.value).filter((v) => v.trim()),
        };
        if (editingId) {
            await subscriptionService.updatePlan(editingId, payload);
        } else {
            await subscriptionService.createPlan(payload);
        }
        cancelEdit();
        await loadPlans();
    };

    const handleToggleActive = async (plan) => {
        await subscriptionService.updatePlan(plan._id, { isActive: !plan.isActive });
        await loadPlans();
    };

    const handleDelete = async (planId) => {
        await subscriptionService.removePlan(planId);
        await loadPlans();
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-display text-2xl font-bold text-navy-900">Subscription Plans</h1>
                <p className="text-sm text-slate-500 mt-1">Create and manage the plans students can subscribe to.</p>
            </div>

            <Card className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-semibold text-navy-900">{editingId ? "Edit Plan" : "New Plan"}</h2>
                    {editingId && (
                        <button
                            onClick={cancelEdit}
                            className="text-xs font-medium text-slate-400 hover:text-navy-600 flex items-center gap-1"
                        >
                            <X className="w-3.5 h-3.5" /> Cancel edit
                        </button>
                    )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input label="Plan name" placeholder="e.g. Quarterly Pro" {...register("name", { required: true })} />
                    <Textarea label="Description" rows={2} {...register("description")} />
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                            label="Price (INR)"
                            type="number"
                            min="0"
                            step="1"
                            {...register("price", { required: true, min: 0 })}
                        />
                        <Input
                            label="Duration (days)"
                            type="number"
                            min="1"
                            {...register("durationDays", { required: true, min: 1 })}
                        />
                    </div>
                    <Input
                        label="Max attempts per exam (0 = unlimited)"
                        type="number"
                        min="0"
                        step="1"
                        {...register("maxAttemptsPerExam", { min: 0 })}
                    />
                    <div>
                        <p className="text-sm font-medium text-navy-800 mb-2">Features</p>
                        <div className="space-y-2">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <div className="flex-1">
                                        <Input
                                            placeholder={`Feature ${index + 1}`}
                                            {...register(`features.${index}.value`)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="p-2.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
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
                            <Plus className="w-4 h-4" /> Add feature
                        </button>
                    </div>
                    <Button type="submit" isLoading={isSubmitting}>
                        {editingId ? "Save Changes" : "Create Plan"}
                    </Button>
                </form>
            </Card>

            {loading ? (
                <Spinner full label="Loading plans..." />
            ) : (
                <div className="space-y-3">
                    {plans.map((plan) => (
                        <Card key={plan._id} className="p-4 sm:p-5 flex flex-wrap items-center gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-medium text-navy-900">{plan.name}</p>
                                    <Badge variant={plan.isActive ? "green" : "slate"}>
                                        {plan.isActive ? "Active" : "Hidden"}
                                    </Badge>
                                </div>
                                <p className="text-xs text-slate-500">
                                    ₹{plan.price} / {plan.durationDays} days &middot;{" "}
                                    {plan.maxAttemptsPerExam > 0 ? `${plan.maxAttemptsPerExam} attempts/exam` : "Unlimited attempts"}
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Button variant="secondary" size="sm" icon={Pencil} onClick={() => startEdit(plan)}>
                                    Edit
                                </Button>
                                <Button variant="secondary" size="sm" onClick={() => handleToggleActive(plan)}>
                                    {plan.isActive ? "Hide" : "Show"}
                                </Button>
                                <Button variant="danger" size="sm" icon={Trash2} onClick={() => handleDelete(plan._id)}>
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}