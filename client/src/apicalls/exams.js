const { default: axiosInstance } = require(".");

// add exam

export const addExam = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/exams/add", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get-all-exam

export const getAllExams = async () => {
  try {
    const response = await axiosInstance.post("/api/exams/get-all-exams");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// get exam by-id

export const getExamById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exams/get-exam-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// edit exam by id:-

export const editExamById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exams/edit-exam-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
// Delete exam by id :-

export const deleteExamById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exams/delete-exam-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// add question to exam

export const addQuestionToExam = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exams/add-question-to-exam",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Delete Exam by id

export const deleteQuestionById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/exams/delete-question-in-exam",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};