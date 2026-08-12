// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { fetchCurrentUser } from "./features/auth/authSlice.js";

// import AuthLayout from "./layouts/AuthLayout.jsx";
// import MainLayout from "./layouts/MainLayout.jsx";
// import AdminLayout from "./layouts/AdminLayout.jsx";
// import ExamLayout from "./layouts/ExamLayout.jsx";

// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import AdminRoute from "./components/AdminRoute.jsx";

// import LoginPage from "./pages/LoginPage.jsx";
// import RegisterPage from "./pages/RegisterPage.jsx";
// import StudentDashboardPage from "./pages/StudentDashboardPage.jsx";
// import ExamListPage from "./pages/ExamListPage.jsx";
// import ExamInstructionsPage from "./pages/ExamInstructionsPage.jsx";
// import ExamPage from "./pages/ExamPage.jsx";
// import ResultPage from "./pages/ResultPage.jsx";
// import AttemptHistoryPage from "./pages/AttemptHistoryPage.jsx";
// import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
// import CreateExamPage from "./pages/CreateExamPage.jsx";
// import ManageQuestionsPage from "./pages/ManageQuestionsPage.jsx";
// import AdminExamAttemptsPage from "./pages/AdminExamAttemptsPage.jsx";
// import NotFoundPage from "./pages/NotFoundPage.jsx";

// export default function App() {
//   const dispatch = useDispatch();

//   // Bootstrap the session once on load by checking for an existing auth cookie
//   useEffect(() => {
//     dispatch(fetchCurrentUser());
//   }, [dispatch]);

//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />

//       {/* Public auth routes */}
//       <Route element={<AuthLayout />}>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//       </Route>

//       {/* Authenticated student routes */}
//       <Route element={<ProtectedRoute />}>
//         <Route element={<MainLayout />}>
//           <Route path="/dashboard" element={<StudentDashboardPage />} />
//           <Route path="/exams" element={<ExamListPage />} />
//           <Route path="/exams/:examId" element={<ExamInstructionsPage />} />
//           <Route path="/history" element={<AttemptHistoryPage />} />
//           <Route path="/result/:attemptId" element={<ResultPage />} />
//         </Route>

//         {/* Distraction-free layout for the live exam */}
//         <Route element={<ExamLayout />}>
//           <Route path="/exam/:attemptId" element={<ExamPage />} />
//         </Route>

//         {/* Admin-only routes */}
//         <Route element={<AdminRoute />}>
//           <Route element={<AdminLayout />}>
//             <Route path="/admin" element={<AdminDashboardPage />} />
//             <Route path="/admin/exams/new" element={<CreateExamPage />} />
//             <Route path="/admin/exams/:examId/edit" element={<CreateExamPage />} />
//             <Route path="/admin/exams/:examId/questions" element={<ManageQuestionsPage />} />
//             <Route path="/admin/exams/:examId/attempts" element={<AdminExamAttemptsPage />} />
//           </Route>
//         </Route>
//       </Route>

//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   );
// }



import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchCurrentUser } from "./features/auth/authSlice.js";
import { fetchMySubscription } from "./features/subscription/subscriptionSlice.js";
import { useAuth } from "./hooks/useAuth.js";

import AuthLayout from "./layouts/AuthLayout.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import ExamLayout from "./layouts/ExamLayout.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import VerifyOtpPage from "./pages/VerifyOtpPage.jsx";
import StudentDashboardPage from "./pages/StudentDashboardPage.jsx";
import ExamListPage from "./pages/ExamListPage.jsx";
import ExamInstructionsPage from "./pages/ExamInstructionsPage.jsx";
import ExamPage from "./pages/ExamPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import AttemptHistoryPage from "./pages/AttemptHistoryPage.jsx";
import SubscriptionPlansPage from "./pages/SubscriptionPlansPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import CreateExamPage from "./pages/CreateExamPage.jsx";
import ManageQuestionsPage from "./pages/ManageQuestionsPage.jsx";
import AdminExamAttemptsPage from "./pages/AdminExamAttemptsPage.jsx";
import AdminPlansPage from "./pages/AdminPlansPage.jsx";
import AdminSubscriptionsPage from "./pages/AdminSubscriptionsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  // Bootstrap the session once on load by checking for an existing auth cookie
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // Once we know who's logged in, check their subscription status
  useEffect(() => {
    if (isAuthenticated) dispatch(fetchMySubscription());
  }, [isAuthenticated, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
      </Route>

      {/* Authenticated student routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<StudentDashboardPage />} />
          <Route path="/exams" element={<ExamListPage />} />
          <Route path="/exams/:examId" element={<ExamInstructionsPage />} />
          <Route path="/history" element={<AttemptHistoryPage />} />
          <Route path="/result/:attemptId" element={<ResultPage />} />
          <Route path="/subscription" element={<SubscriptionPlansPage />} />
        </Route>

        {/* Distraction-free layout for the live exam */}
        <Route element={<ExamLayout />}>
          <Route path="/exam/:attemptId" element={<ExamPage />} />
        </Route>

        {/* Admin-only routes */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/exams/new" element={<CreateExamPage />} />
            <Route path="/admin/exams/:examId/edit" element={<CreateExamPage />} />
            <Route path="/admin/exams/:examId/questions" element={<ManageQuestionsPage />} />
            <Route path="/admin/exams/:examId/attempts" element={<AdminExamAttemptsPage />} />
            <Route path="/admin/plans" element={<AdminPlansPage />} />
            <Route path="/admin/subscriptions" element={<AdminSubscriptionsPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}