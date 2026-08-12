import api from "./api.js";

export const paymentService = {
  createOrder: (planId) =>
    api.post("/payments/create-order", { planId }).then((r) => r.data.data),
  verifyPayment: (payload) =>
    api.post("/payments/verify", payload).then((r) => r.data.data.subscription)
};
