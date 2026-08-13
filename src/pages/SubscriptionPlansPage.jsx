import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Check, ShieldCheck } from "lucide-react";
import { subscriptionService } from "../services/subscriptionService.js";
import { paymentService } from "../services/paymentService.js";
import { fetchMySubscription } from "../features/subscription/subscriptionSlice.js";
import { useAuth } from "../hooks/useAuth.js";
import { useSubscription } from "../hooks/useSubscription.js";
import { loadRazorpayScript } from "../utils/loadRazorpayScript.js";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Spinner from "../components/ui/Spinner.jsx";

export default function SubscriptionPlansPage() {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { subscription, isActive } = useSubscription();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [payingPlanId, setPayingPlanId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        subscriptionService
            .listPlans()
            .then(setPlans)
            .finally(() => setLoading(false));
    }, []);

    const handleSubscribe = async (plan) => {
        setError("");
        setPayingPlanId(plan._id);
        try {
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                throw new Error("Could not load the payment gateway. Check your connection and try again.");
            }

            const order = await paymentService.createOrder(plan._id);

            const razorpay = new window.Razorpay({
                key: order.keyId,
                amount: order.amount,
                currency: order.currency,
                name: "ExamPrep",
                description: `${order.plan.name} subscription`,
                order_id: order.orderId,
                prefill: { name: user?.name, email: user?.email },
                theme: { color: "#1f3a61" },
                handler: async (response) => {
                    try {
                        await paymentService.verifyPayment(response);
                        dispatch(fetchMySubscription());
                    } catch (err) {
                        setError(err.message || "Payment succeeded but verification failed. Contact support.");
                    } finally {
                        setPayingPlanId(null);
                    }
                },
                modal: {
                    ondismiss: () => setPayingPlanId(null),
                },
            });

            razorpay.on("payment.failed", () => {
                setError("Payment failed. Please try again.");
                setPayingPlanId(null);
            });

            razorpay.open();
        } catch (err) {
            setError(err.message || "Could not start the payment. Please try again.");
            setPayingPlanId(null);
        }
    };

    return (
        <div className="space-y-6 w-full mx-auto">
            <div>
                <h1 className="font-display text-2xl font-bold text-navy-900">Subscription Plans</h1>
                <p className="text-sm text-slate-500 mt-1">Unlock every premium mock test.</p>
            </div>

            {isActive && subscription && (
                <Card className="p-5 flex items-center gap-3 bg-green-50 border-green-200">
                    <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-green-800">
                            You're on the {subscription.planId?.name} plan
                        </p>
                        <p className="text-xs text-green-700/80">
                            Active until {new Date(subscription.endDate).toLocaleDateString()}
                        </p>
                    </div>
                </Card>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}

            {loading ? (
                <Spinner full />
            ) : plans.length === 0 ? (
                <Card className="p-10 text-center text-sm text-slate-400">No subscription plans available yet.</Card>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {plans.map((plan) => (
                        <Card key={plan._id} className="p-6 flex flex-col gap-4">
                            <div>
                                <h3 className="font-display font-semibold text-lg text-navy-900">{plan.name}</h3>
                                <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
                            </div>
                            <div>
                                <span className="text-3xl font-display font-bold text-navy-900">₹{plan.price}</span>
                                <span className="text-sm text-slate-400"> / {plan.durationDays} days</span>
                            </div>
                            {plan.features?.length > 0 && (
                                <ul className="space-y-1.5 flex-1">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                                            <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <Button
                                className="w-full"
                                onClick={() => handleSubscribe(plan)}
                                isLoading={payingPlanId === plan._id}
                            >
                                {isActive ? "Renew / Switch Plan" : "Subscribe"}
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}