import React, { useContext, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TherapistContext } from "../../../contexts/TherapistContext";
import "./ScheduleTherapist.css";

const ScheduleTherapist = () => {
  const { therapistId } = useParams();
  const { schedules, fetchTherapistSchedules } = useContext(TherapistContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { treatmentCost } = location.state || {};

  useEffect(() => {
    fetchTherapistSchedules(Number(therapistId));
  }, [therapistId]);

  const handleBookNow = (schedule) => {
    navigate("/customer-home/confirm-booking", {
      state: {
        schedule,
        treatmentCost,
      },
    });
  };

  return (
    <div className="schedule-container">
      <h2>Lịch trình của Therapist</h2>
      <button onClick={() => navigate(-1)}>Quay lại</button>

      {schedules.length > 0 ? (
        <ul className="schedule-list">
          {schedules.map((schedule) => (
            <li key={schedule.id} className="schedule-item">
              <p>
                <strong>Ngày và Giờ:</strong> {schedule.startTime} -{" "}
                {schedule.endTime}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                {schedule.isBooked ? "Đã được đặt" : "Còn trống"}
              </p>
              {!schedule.isBooked && (
                <button
                  className="book-now-button"
                  onClick={() => handleBookNow(schedule)}
                >
                  Book Now
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có lịch trình nào.</p>
      )}
    </div>
  );
};

export default ScheduleTherapist;
