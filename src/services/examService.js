import api from "./api.js";

export const examService = {
  list: (all = false) => api.get(`/exams${all ? "?all=true" : ""}`).then((r) => r.data.data.exams),
  getById: (id) => api.get(`/exams/${id}`).then((r) => r.data.data),
  create: (payload) => api.post("/exams", payload).then((r) => r.data.data.exam),
  update: (id, payload) => api.put(`/exams/${id}`, payload).then((r) => r.data.data.exam),
  togglePublish: (id) => api.patch(`/exams/${id}/publish`).then((r) => r.data.data.exam),
  remove: (id) => api.delete(`/exams/${id}`).then((r) => r.data),

  getSections: (examId) => api.get(`/exams/${examId}/sections`).then((r) => r.data.data.sections),
  createSection: (examId, payload) =>
    api.post(`/exams/${examId}/sections`, payload).then((r) => r.data.data.section),
  updateSection: (examId, sectionId, payload) =>
    api.put(`/exams/${examId}/sections/${sectionId}`, payload).then((r) => r.data.data.section),
  removeSection: (examId, sectionId) =>
    api.delete(`/exams/${examId}/sections/${sectionId}`).then((r) => r.data),

  getExamAttempts: (examId) =>
    api.get(`/exams/${examId}/attempts`).then((r) => r.data.data.attempts),
};
