import axios from "axios";

const API_URL = "http://54.179.45.72:8080"; // Replace with your actual API base URL

// Fetch therapist profile by user ID
export const getTherapistProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/therapists/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching therapist profile:", error);
    throw error;
  }
};

// Fetch majors
export const getMajors = async () => {
  try {
    const response = await axios.get(`${API_URL}/majors`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching majors:", error);
    throw error;
  }
};

// Update therapist profile
export const updateTherapistProfile = async (therapistId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/therapists/${therapistId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating therapist profile:", error);
    throw error;
  }
};

// Fetch wallet balance
export const getUserWallet = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/wallets/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
      },
    });
    return response.data; // Return the wallet data
  } catch (error) {
    console.error("Error fetching user wallet:", error);
    throw error;
  }
};

//create withdraw request
export const createWithdrawRequest = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/withdrawRequests`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error creating withdrawal request:", error);
    throw error;
  }
};

export const getWalletTransactions = async (
  walletId,
  page = 1,
  size = 999,
  sort = "id",
  direction = "DESC"
) => {
  try {
    const response = await axios.get(
      `${API_URL}/transactions/wallet/${walletId}`,
      {
        params: { page, size, sort, direction },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },
      }
    );
    return response.data; // Return the transaction data
  } catch (error) {
    console.error("Error fetching wallet transactions:", error);
    throw error;
  }
};
