import axios from "axios";

const API_URL = "http://54.179.45.72:8080/therapists"; // Base URL for therapist API endpoints

const getAccessToken = () => {
  return localStorage.getItem("token");
};
const headers = {
  "Content-Type": "application/json",
  // Add headers such as Authorization if required
   'Authorization': `Bearer ${getAccessToken()}`,
};
// Fetch the therapist's profile data
export const getProfile = async (accountid) => {
  try {
    const response = await axios.get(`${API_URL}/`+accountid,{headers:headers})
    console.log(response.data)
    return response;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// Update the therapist's profile data
export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Fetch all time slots/bookings for the therapist
export const getSchedule = async () => {
  try {
    const response = await axios.get(`${API_URL}/therapistSchedules`);
    return response.data;
  } catch (error) {
    console.error("Error fetching schedule:", error);
    throw error;
  }
};

// Create a new time slot
export const createTimeSlot = async (timeSlotData) => {
  try {
    const response = await axios.post(`${API_URL}/therapistSchedules`, timeSlotData);
    return response.data;
  } catch (error) {
    console.error("Error creating time slot:", error);
    throw error;
  }
};

// Update an existing time slot/booking
export const updateTimeSlot = async (id, timeSlotData) => {
  try {
    const response = await axios.put(`${API_URL}/therapistSchedules/${id}`, timeSlotData);
    return response.data;
  } catch (error) {
    console.error(`Error updating time slot with ID ${id}:`, error);
    throw error;
  }
};

// Delete a time slot/booking
export const deleteTimeSlot = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/therapistSchedules/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting time slot with ID ${id}:`, error);
    throw error;
  }
};