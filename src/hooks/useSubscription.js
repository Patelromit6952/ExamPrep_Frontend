import { useSelector } from "react-redux";

/** Convenience hook for reading the student's active subscription status. */
export function useSubscription() {
  const { current, status, checked } = useSelector(
    (state) => state.subscription
  );
  const isActive = Boolean(current && new Date(current.endDate) > new Date());
  return { subscription: current, isActive, status, checked };
}
