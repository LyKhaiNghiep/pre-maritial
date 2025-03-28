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
    const response = await axios.get(`${API_URL}/users?page=1&size=99`, {
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
      `${API_URL}/therapistMajors?page=1&size=99`,
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

export const getTransactionsByWalletId = async (walletId, params) => {
  try {
    const response = await axios.get(
      `${API_URL}/transactions/wallet/${walletId}`,
      {
        params, // Pass query parameters (page, size, sort, direction)
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },
      }
    );
    return response.data; // Return the API response
  } catch (error) {
    console.error("Error fetching transactions by wallet ID:", error);
    throw error;
  }
};
//Lấy danh sách transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions?page=1&size=99`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

//Lấy danh sách transactions cho dashboard
export const getTransactionsForDashboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions?page=1&size=99`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    // return response.data.content;
    return response.data.content;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

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
//===========================Articles===========================
export const getArticles = async (page = 1) => {
  try {
    const response = await axios.get(
      `${API_URL}/articles?page=${page}&size=999`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

//===========================ArticleParts===========================
// export const getArticleParts = async (page = 1) => {
//   try {
//     const response = await axios.get(
//       `${API_URL}/articles?page=${page}&size=999`,
//       {
//         headers: {
//           Authorization: `Bearer ${getAccessToken()}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching articles:", error);
//     throw error;
//   }
// };
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

//===========================Wallet===========================
export const getWalletById = async (walletId) => {
  try {
    const response = await axios.get(`${API_URL}/wallets/${walletId}`, {
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

//lấy wallet theo userId
export const getWalletByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/wallets/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // Return null if wallet is not found
    }
    console.error("Error fetching wallet:", error);
    throw error; // Re-throw other errors
  }
};
//tạo wallet mới
export const createWallet = async (walletData) => {
  try {
    const response = await axios.post(`${API_URL}/wallets`, walletData, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw error;
  }
};

//===========================TherapistSchedules===========================
//get schedule
export const getTherapistSchedules = async () => {
  try {
    const response = await axios.get(`${API_URL}/therapistSchedules`, {
      params: {
        page: 1,
        size: 99,
        sort: "id",
        direction: "ASC",
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
      },
    });
    return response.data; // Return the API response
  } catch (error) {
    console.error("Error fetching therapist schedules:", error);
    throw error;
  }
};
//update schedule
export const updateSchedule = async (scheduleId, payload) => {
  try {
    const response = await axios.put(
      `${API_URL}/therapistSchedules/${scheduleId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating schedule:", error);
    throw error;
  }
};

//===========================MOMO===========================
// Create a MoMo payment
export const createMoMoPayment = async (amount) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/momo/create`,
      { amount },
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`, // Include the token for authorization
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error creating MoMo payment:", error);
    throw error; // Throw the error for further handling
  }
};

//===========================Wallet============================
// Update wallet balance
export const updateWalletBalance = async (walletId, balance) => {
  try {
    const response = await axios.put(
      `${API_URL}/wallets/Balance/${walletId}?balance=${balance}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return the updated wallet data
  } catch (error) {
    console.error("Error updating wallet balance:", error);
    throw error;
  }
};

//===========================Consultation===========================
//tao lịch hẹn tư vấn
export const createConsultationBooking = async (payload) => {
  try {
    const response = await axios.post(
      `${API_URL}/consultationBookings`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return the API response
  } catch (error) {
    console.error("Error creating consultation booking:", error);
    throw error;
  }
};
//Lấy danh sách lịch hẹn tư vấn
export const getBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/consultationBookings`, {
      params: {
        page: 1,
        size: 999,
        sort: "id",
        direction: "DESC",
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
      },
    });
    return response.data; // Return the API response
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};
