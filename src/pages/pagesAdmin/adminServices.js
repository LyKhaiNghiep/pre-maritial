import axios from "axios";

const API_URL = "http://54.179.45.72:8080";
const getAccessToken = () => {
  return localStorage.getItem("token");
};

//===========================User Management===========================
// Lấy danh sách users
export const getUsers = async () => {
  console.log("token", getAccessToken());
  try {
    const response = await axios.get(`${API_URL}/users?page=1&size=999`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    console.log(response.data.content); // Kiểm tra response
    return response.data.content;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Thêm user mới
export const addUser = async (userData) => {
  try {
    const token = getAccessToken();
    console.log("Token:", token); // Log the token
    console.log("User Data:", userData); // Log the user data
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Xóa user
export const deleteUsers = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log(response.data); // Kiểm tra response
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Lấy thông tin user theo ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Cập nhật thông tin user
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

//===========================Major Management===========================

// Lấy danh sách Majors
export const getMajors = async () => {
  console.log("token", getAccessToken());
  try {
    const response = await axios.get(
      `${API_URL}/therapistMajors?page=1&size=999`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );

    console.log(response.data.content); // Kiểm tra response
    return response.data.content;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Thêm major mới
export const addMajor = async (majorData) => {
  try {
    const token = getAccessToken();
    console.log("Token:", token); // Log the token
    const response = await axios.post(`${API_URL}/therapistMajors`, majorData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding major:", error);
    throw error;
  }
};

// Xóa major
export const deleteMajor = async (majorId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/therapistMajors/${majorId}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    console.log(response.data); // Kiểm tra response
    return response.data;
  } catch (error) {
    console.error("Error deleting major:", error);
    throw error;
  }
};

// Lấy thông tin major theo ID
export const getMajorById = async (majorId) => {
  try {
    const token = getAccessToken();
    const response = await axios.get(`${API_URL}/therapistMajors/${majorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching major:", error);
    throw error;
  }
};

// Cập nhật thông tin major
export const updateMajor = async (majorId, majorData) => {
  try {
    const token = getAccessToken();
    const response = await axios.put(
      `${API_URL}/therapistMajors/${majorId}`,
      majorData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating major:", error);
    throw error;
  }
};

//===========================Transactions===========================
//Lấy danh sách transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/transactions?page=1&size=999`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

//Lấy danh sách transactions cho dashboard
export const getTransactionsForDashboard = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/transactions?page=1&size=999`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    // return response.data.content;
    return response.data.content;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

//===========================Therapists===========================
//Lấy thông tin therapist theo ID
export const getTherapistById = async (therapistId) => {
  try {
    const response = await axios.get(`${API_URL}/therapists/${therapistId}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching therapist:", error);
    throw error;
  }
};

//Cập nhật thông tin therapist
export const updateTherapist = async (therapistId, therapistData) => {
  try {
    const response = await axios.put(
      `${API_URL}/therapists/${therapistId}`,
      therapistData,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating therapist:", error);
    throw error;
  }
};

//===========================Consultation booking===========================
//Lấy danh sách booking
export const getConsultationBookings = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/consultationBookings?page=1&size=999`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching consultation bookings:", error);
    throw error;
  }
};

//===========================Withdraw requests===========================
//Lấy danh sách withdraw requests
export const getWithdrawRequests = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/withdrawRequests?page=1&size=999`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching withdraw requests:", error);
    throw error;
  }
};

//update withdraw request
export const updateWithdrawRequest = async (withdrawRequestId, data) => {
  try {
    const response = await axios.put(
      `${API_URL}/withdrawRequests/${withdrawRequestId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating withdraw request:", error);
    throw error;
  }
};

//===========================Articles===========================
//Lấy danh sách articles
export const getArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles?page=1&size=999`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching withdraw requests:", error);
    throw error;
  }
};
//Xóa article
export const deleteArticle = async (articleId) => {
  try {
    const response = await axios.delete(`${API_URL}/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log(response.data); // Kiểm tra response
    return response.data;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};
//Tạo mới article
export const createArticle = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/articles`, data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
};

//===========================ArticleDetails===========================
//Lấy danh sách articlesdetails
export const getArticleParts = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/articleParts?page=1&size=999`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching withdraw requests:", error);
    throw error;
  }
};
//update articlepart
export const updateArticlePart = async (articlePartsId, data) => {
  try {
    const response = await axios.put(
      `${API_URL}/articleParts/${articlePartsId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating withdraw request:", error);
    throw error;
  }
};
//tao moi articlepart
export const createArticlePart = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/articleParts`, data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding articlepart:", error);
    throw error;
  }
};

//===========================Categories===========================
//Lấy danh sách categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories?page=1&size=999`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
