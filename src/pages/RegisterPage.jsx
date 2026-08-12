// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { UserPlus } from "lucide-react";
// import { registerUser } from "../features/auth/authSlice.js";
// import Input from "../components/ui/Input.jsx";
// import Button from "../components/ui/Button.jsx";

// export default function RegisterPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [serverError, setServerError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const password = watch("password");

//   const onSubmit = async (values) => {
//     setServerError("");
//     const result = await dispatch(registerUser(values));
//     if (registerUser.fulfilled.match(result)) {
//       navigate("/dashboard", { replace: true });
//     } else {
//       setServerError(result.payload || "Registration failed");
//     }
//   };

//   return (
//     <div>
//       <h1 className="font-display text-2xl font-bold text-navy-900 mb-1">Create your account</h1>
//       <p className="text-sm text-slate-500 mb-7">Start practicing full-length mock tests today.</p>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <Input
//           label="Full name"
//           placeholder="Priya Sharma"
//           error={errors.name?.message}
//           {...register("name", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
//         />
//         <Input
//           label="Email address"
//           type="email"
//           placeholder="you@example.com"
//           error={errors.email?.message}
//           {...register("email", { required: "Email is required" })}
//         />
//         <Input
//           label="Password"
//           type="password"
//           placeholder="At least 6 characters"
//           error={errors.password?.message}
//           {...register("password", {
//             required: "Password is required",
//             minLength: { value: 6, message: "Must be at least 6 characters" },
//           })}
//         />
//         <Input
//           label="Confirm password"
//           type="password"
//           placeholder="Re-enter your password"
//           error={errors.confirmPassword?.message}
//           {...register("confirmPassword", {
//             required: "Please confirm your password",
//             validate: (v) => v === password || "Passwords do not match",
//           })}
//         />

//         {serverError && <p className="text-sm text-red-600">{serverError}</p>}

//         <Button type="submit" className="w-full" icon={UserPlus} isLoading={isSubmitting}>
//           Create Account
//         </Button>
//       </form>

//       <p className="text-sm text-slate-500 mt-6 text-center">
//         Already have an account?{" "}
//         <Link to="/login" className="font-semibold text-navy-700 hover:underline">
//           Log in
//         </Link>
//       </p>
//     </div>
//   );
// }



import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { registerUser } from "../features/auth/authSlice.js";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (values) => {
    setServerError("");
    const result = await dispatch(registerUser(values));
    if (registerUser.fulfilled.match(result)) {
      navigate("/verify-otp", { state: { email: result.payload.email } });
    } else {
      setServerError(result.payload?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy-900 mb-1">Create your account</h1>
      <p className="text-sm text-slate-500 mb-7">Start practicing full-length mock tests today.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full name"
          placeholder="Priya Sharma"
          error={errors.name?.message}
          {...register("name", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
        />
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
          placeholder="At least 6 characters"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Must be at least 6 characters" },
          })}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (v) => v === password || "Passwords do not match",
          })}
        />

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <Button type="submit" className="w-full" icon={UserPlus} isLoading={isSubmitting}>
          Create Account
        </Button>
      </form>

      <p className="text-sm text-slate-500 mt-6 text-center">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-navy-700 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}