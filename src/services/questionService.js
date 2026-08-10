import api from "./api.js";

export const questionService = {
  list: (examId, sectionId) =>
    api
      .get("/questions", { params: { examId, sectionId } })
      .then((r) => r.data.data.questions),
  create: (payload) => api.post("/questions", payload).then((r) => r.data.data.question),
  update: (id, payload) => api.put(`/questions/${id}`, payload).then((r) => r.data.data.question),
  remove: (id) => api.delete(`/questions/${id}`).then((r) => r.data),
  bulkUpload: (examId, sectionId, file) => {
    const formData = new FormData();
    formData.append("examId", examId);
    if (sectionId) formData.append("sectionId", sectionId);
    formData.append("file", file);
    return api
      .post("/questions/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data.data);
  },
};
