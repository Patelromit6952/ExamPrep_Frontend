import api from "./api.js";

export const attemptService = {
  start: (examId) => api.post(`/attempts/start/${examId}`).then((r) => r.data.data),
  get: (attemptId) => api.get(`/attempts/${attemptId}`).then((r) => r.data.data),
  saveAnswer: (attemptId, questionId, selectedOptionId) =>
    api
      .put(`/attempts/${attemptId}/answer`, { questionId, selectedOptionId })
      .then((r) => r.data.data.answer),
  toggleReview: (attemptId, questionId, markedForReview) =>
    api
      .put(`/attempts/${attemptId}/review`, { questionId, markedForReview })
      .then((r) => r.data.data.answer),
  submit: (attemptId) => api.post(`/attempts/${attemptId}/submit`).then((r) => r.data.data.attempt),
  history: () => api.get("/attempts/history/me").then((r) => r.data.data.attempts),
  topicPerformance: () => api.get("/attempts/performance/topics").then((r) => r.data.data.topics),
};
