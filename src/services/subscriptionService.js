import api from "./api.js";

export const subscriptionService = {
  listPlans: (all = false) =>
    api
      .get(`/subscriptions/plans${all ? "?all=true" : ""}`)
      .then((r) => r.data.data.plans),
  createPlan: (payload) =>
    api.post("/subscriptions/plans", payload).then((r) => r.data.data.plan),
  updatePlan: (id, payload) =>
    api
      .put(`/subscriptions/plans/${id}`, payload)
      .then((r) => r.data.data.plan),
  removePlan: (id) =>
    api.delete(`/subscriptions/plans/${id}`).then((r) => r.data),
  mySubscription: () =>
    api.get("/subscriptions/me").then((r) => r.data.data.subscription),
  allSubscriptions: () =>
    api.get("/subscriptions/all").then((r) => r.data.data.subscriptions)
};
