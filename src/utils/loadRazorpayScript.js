let loadingPromise = null;

/**
 * Loads Razorpay's checkout widget script on demand (only when someone
 * visits the subscription page), rather than on every page load.
 * Resolves true on success, false if the script fails to load.
 */
export function loadRazorpayScript() {
  if (typeof window !== "undefined" && window.Razorpay)
    return Promise.resolve(true);
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return loadingPromise;
}
