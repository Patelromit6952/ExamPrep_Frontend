import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Drives the exam countdown. Corrects for client/server clock skew by
 * computing an offset once from the server's timestamp, so the timer stays
 * accurate even if the student's device clock is wrong.
 *
 * @param {string|Date} endsAt - server-authoritative deadline
 * @param {string|Date} serverTime - server's "now" at the moment of fetch
 * @param {Function} onExpire - called exactly once when the countdown hits 0
 */
export function useCountdown(endsAt, serverTime, onExpire) {
  const offsetRef = useRef(0); // serverNow - clientNow, in ms
  const expiredRef = useRef(false);
  const endsAtMs = endsAt ? new Date(endsAt).getTime() : null;

  const computeRemaining = useCallback(() => {
    if (!endsAtMs) return 0;
    const correctedNow = Date.now() + offsetRef.current;
    return Math.max(0, endsAtMs - correctedNow);
  }, [endsAtMs]);

  const [remainingMs, setRemainingMs] = useState(computeRemaining);

  useEffect(() => {
    if (serverTime) {
      offsetRef.current = new Date(serverTime).getTime() - Date.now();
    }
    expiredRef.current = false;
    setRemainingMs(computeRemaining());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAtMs, serverTime]);

  useEffect(() => {
    if (!endsAtMs) return undefined;

    const interval = setInterval(() => {
      const remaining = computeRemaining();
      setRemainingMs(remaining);
      if (remaining <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endsAtMs, computeRemaining, onExpire]);

  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatted =
    hours > 0
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return { remainingMs, totalSeconds, formatted, isCritical: totalSeconds <= 300 && totalSeconds > 0 };
}
