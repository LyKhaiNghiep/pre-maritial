// import React, { useEffect, useState } from "react";
// import { getBookings } from "../customerServices"; // API service for fetching bookings
// import useAuth from "../../../utils/hook/useAuth"; // Hook to get logged-in user
// import "./ViewBookingsPage.css"; // Add styles if needed

// const ViewBookingsPage = () => {
//   const { user } = useAuth(); // Get the logged-in user
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await getBookings(); // Fetch all bookings
//         const userBookings = response.content.filter(
//           (booking) => booking.userId === user.id // Filter by logged-in user's ID
//         );
//         setBookings(userBookings); // Update state with filtered bookings
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchBookings();
//   }, [user]);

//   if (loading) {
//     return <p>Loading bookings...</p>;
//   }

//   return (
//     <div className="bookings-container">
//       <h2>Your Bookings</h2>
//       {bookings.length > 0 ? (
//         <ul className="bookings-list">
//           {bookings.map((booking) => (
//             <li key={booking.id} className="booking-item">
//               <p>
//                 <strong>Booking ID:</strong> {booking.id}
//               </p>
//               <p>
//                 <strong>Status:</strong> {booking.status}
//               </p>
//               <p>
//                 <strong>Amount:</strong> {booking.amount} VND
//               </p>
//               <p>
//                 <strong>Meeting URL:</strong>{" "}
//                 <a
//                   href={booking.meetUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {booking.meetUrl}
//                 </a>
//               </p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No bookings found.</p>
//       )}
//     </div>
//   );
// };

// export default ViewBookingsPage;

import React, { useEffect, useState } from "react";
import { getBookings, getTherapistSchedules } from "../customerServices"; // API services
import useAuth from "../../../utils/hook/useAuth"; // Hook to get logged-in user
import "./ViewBookingsPage.css"; // Add styles if needed

const ViewBookingsPage = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [bookings, setBookings] = useState([]);
  const [therapistSchedules, setTherapistSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bookings
        const bookingsResponse = await getBookings();
        const userBookings = bookingsResponse.content.filter(
          (booking) => booking.userId === user.id // Filter by logged-in user's ID
        );

        // Fetch therapist schedules
        const schedulesResponse = await getTherapistSchedules();
        setTherapistSchedules(schedulesResponse.content);

        // Combine bookings with schedule details
        const combinedData = userBookings.map((booking) => {
          const schedule = schedulesResponse.content.find(
            (s) => s.id === booking.therapistScheduleId
          );
          return {
            ...booking,
            startTime: schedule?.startTime || "N/A",
            endTime: schedule?.endTime || "N/A",
          };
        });

        setBookings(combinedData); // Update state with combined data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <div className="bookings-container">
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <ul className="bookings-list">
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-item">
              <p>
                <strong>Booking ID:</strong> {booking.id}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
              <p>
                <strong>Amount:</strong> {booking.amount} VND
              </p>
              <p>
                <strong>Schedule:</strong> {booking.startTime} -{" "}
                {booking.endTime}
              </p>
              <p>
                <strong>Meeting URL:</strong>{" "}
                <a
                  href={booking.meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {booking.meetUrl}
                </a>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default ViewBookingsPage;
