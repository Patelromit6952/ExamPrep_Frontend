import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, RefreshCw } from "lucide-react";
import { verifyOtp, resendOtp } from "../features/auth/authSlice.js";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";

export default function VerifyOtpPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = location.state?.email || "";
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [cooldown, setCooldown] = useState(30);

    useEffect(() => {
        if (!email) navigate("/register", { replace: true });
    }, [email, navigate]);

    useEffect(() => {
        if (cooldown <= 0) return undefined;
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setInfo("");
        setIsSubmitting(true);
        const result = await dispatch(verifyOtp({ email, otp }));
        setIsSubmitting(false);

        if (verifyOtp.fulfilled.match(result)) {
            if (result.payload.loggedIn) {
                navigate("/dashboard", { replace: true });
            } else {
                setInfo("Email verified! Redirecting you to log in...");
                setTimeout(() => navigate("/login", { replace: true }), 1500);
            }
        } else {
            setError(result.payload?.message || "Invalid OTP");
        }
    };

    const handleResend = async () => {
        setError("");
        setInfo("");
        setIsResending(true);
        const result = await dispatch(resendOtp(email));
        setIsResending(false);

        if (resendOtp.fulfilled.match(result)) {
            setInfo("A new OTP has been sent to your email.");
            setCooldown(30);
        } else {
            setError(result.payload?.message || "Could not resend OTP");
        }
    };

    return (
        <div>
            <h1 className="font-display text-2xl font-bold text-navy-900 mb-1">Verify your email</h1>
            <p className="text-sm text-slate-500 mb-7">
                We've sent a 6-digit code to <span className="font-medium text-navy-700">{email}</span>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Enter OTP"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder="••••••"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="text-center text-2xl font-display tracking-[0.5em]"
                />

                {error && <p className="text-sm text-red-600">{error}</p>}
                {info && <p className="text-sm text-green-600">{info}</p>}

                <Button
                    type="submit"
                    className="w-full"
                    icon={ShieldCheck}
                    isLoading={isSubmitting}
                    disabled={otp.length !== 6}
                >
                    Verify & Continue
                </Button>
            </form>

            <div className="mt-6 text-center">
                <button
                    onClick={handleResend}
                    disabled={cooldown > 0 || isResending}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:underline disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`} />
                    {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
                </button>
            </div>

            <p className="text-sm text-slate-500 mt-6 text-center">
                Wrong email?{" "}
                <Link to="/register" className="font-semibold text-navy-700 hover:underline">
                    Go back
                </Link>
            </p>
        </div>
    );
}