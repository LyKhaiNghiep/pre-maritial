import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getWalletByUserId,
  createConsultationBooking,
} from "../customerServices";
import "./ConfirmBookingPage.css"; // Import the CSS file

const ConfirmBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { schedule, treatmentCost } = location.state || {};

  const handleConfirmBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Get the logged-in user
      if (!user || !user.id) {
        alert("User not found. Please log in again.");
        return;
      }

      // Fetch the user's wallet
      const wallet = await getWalletByUserId(user.id);
      if (!wallet || wallet.balance === undefined) {
        alert("Failed to retrieve wallet information. Please try again.");
        return;
      }

      console.log("Current wallet balance:", wallet.balance);
      console.log("Treatment cost:", treatmentCost);

      // Check if the wallet balance is sufficient
      if (wallet.balance < treatmentCost) {
        alert("Insufficient wallet balance. Please add funds to your wallet.");
        navigate("/customer-home/wallet"); // Navigate to the wallet page
        return;
      }

      // Call the new API to book the consultation
      const bookingPayload = {
        therapistScheduleId: schedule.id,
        userId: user.id,
        status: "BOOKED",
        amount: treatmentCost, // Pass the treatment cost
        meetUrl: "https://example.com/meeting", // Replace with actual meeting URL if needed
        categoryId: null, // Use the category ID if available
        isActive: true,
      };

      console.log(
        "Payload being sent to consultationBookings API:",
        bookingPayload
      );

      const response = await createConsultationBooking(bookingPayload); // Call the new API
      console.log("Booking response:", response);

      alert("Schedule booked successfully!"); // Notify the user
      navigate(-1);
    } catch (error) {
      console.error(
        "Error booking schedule:",
        error.response?.data || error.message
      );
      alert("Failed to book the schedule. Please try again.");
    }
  };

  return (
    <div className="confirmation-container">
      <h3>Confirm Booking</h3>
      <p>
        <strong>Schedule:</strong> {schedule.startTime} - {schedule.endTime}
      </p>
      <p>
        <strong>Cost:</strong> {treatmentCost || "N/A"}
      </p>
      <p>
        <strong>Category:</strong> Pre-marital
      </p>
      <p>Are you sure you want to pay?</p>
      <button className="confirm-button" onClick={handleConfirmBooking}>
        Pay
      </button>
      <button className="cancel-button" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  );
};

export default ConfirmBookingPage;
