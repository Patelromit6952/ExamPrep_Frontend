import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { loginUser } from "../features/auth/authSlice.js";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setServerError("");
    const result = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(result)) {
      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    } else {
      setServerError(result.payload || "Login failed");
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy-900 mb-1">Welcome back</h1>
      <p className="text-sm text-slate-500 mb-7">Log in to continue your exam preparation.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <Button type="submit" className="w-full" icon={LogIn} isLoading={isSubmitting}>
          Log In
        </Button>
      </form>

      <p className="text-sm text-slate-500 mt-6 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold text-navy-700 hover:underline">
          Create one
        </Link>
      </p>

      {/* <div className="mt-6 pt-5 border-t border-slate-200 text-xs text-slate-400 space-y-1">
        <p className="font-medium text-slate-500">Demo credentials (after seeding):</p>
        <p>Student: student@examprep.in / Student@12345</p>
        <p>Admin: admin@examprep.in / Admin@12345</p>
      </div> */}
    </div>
  );
}
