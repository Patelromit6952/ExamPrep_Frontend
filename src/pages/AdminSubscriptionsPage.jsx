import { useEffect, useState } from "react";
import { subscriptionService } from "../services/subscriptionService.js";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import Spinner from "../components/ui/Spinner.jsx";

export default function AdminSubscriptionsPage() {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        subscriptionService
            .allSubscriptions()
            .then(setSubs)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner full label="Loading subscriptions..." />;

    const totalRevenue = subs
        .filter((s) => s.status === "active")
        .reduce((sum, s) => sum + s.amount, 0);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-display text-2xl font-bold text-navy-900">Subscriptions & Payments</h1>
                <p className="text-sm text-slate-500 mt-1">
                    {subs.length} payment{subs.length === 1 ? "" : "s"} &middot; ₹{totalRevenue} in active revenue
                </p>
            </div>

            {subs.length === 0 ? (
                <Card className="p-10 text-center text-sm text-slate-400">No payments yet.</Card>
            ) : (
                <Card className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-400">
                                <th className="px-4 py-3 font-semibold">Student</th>
                                <th className="px-4 py-3 font-semibold">Plan</th>
                                <th className="px-4 py-3 font-semibold">Amount</th>
                                <th className="px-4 py-3 font-semibold">Status</th>
                                <th className="px-4 py-3 font-semibold">Expires</th>
                                <th className="px-4 py-3 font-semibold">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subs.map((s) => (
                                <tr key={s._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-navy-900">{s.userId?.name}</p>
                                        <p className="text-xs text-slate-400">{s.userId?.email}</p>
                                    </td>
                                    <td className="px-4 py-3 text-navy-700">{s.planId?.name}</td>
                                    <td className="px-4 py-3 font-semibold text-navy-800">₹{s.amount}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={s.status === "active" ? "green" : s.status === "failed" ? "red" : "slate"}>
                                            {s.status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-slate-500">
                                        {s.endDate ? new Date(s.endDate).toLocaleDateString() : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                                        {new Date(s.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            )}
        </div>
    );
}