import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Modal,
  TextField,
  Grid,
  Divider,
} from "@mui/material";
import { Add, Edit, Delete, Event, Done, EventBusy, Note } from "@mui/icons-material";
import { toast } from "react-toastify";

// This component displays and manages the therapist's bookings (past and upcoming).
// Replace mock data with API calls using TherapistContext's fetchTherapistSchedules when ready.
const TherapistBookings = () => {
  const navigate = useNavigate();

  // Mock data for bookings (added notes field)
  const mockBookings = [
    {
      id: 1,
      clientName: "John Doe",
      dateTime: "2025-03-28T10:00:00",
      status: "Scheduled",
      notes: "Initial consultation",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      dateTime: "2025-03-26T14:00:00",
      status: "Completed",
      notes: "Follow-up session",
    },
    {
      id: 3,
      clientName: "Mike Johnson",
      dateTime: "2025-03-25T09:00:00",
      status: "Canceled",
      notes: "Patient canceled due to emergency",
    },
    {
      id: 4,
      clientName: null,
      dateTime: "2025-03-29T15:00:00",
      status: "Scheduled",
      notes: "Available slot",
    },
  ];

  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBooking, setCurrentBooking] = useState({
    id: null,
    clientName: null,
    dateTime: "",
    status: "Scheduled",
    notes: "",
  });

  useEffect(() => {
    // Simulate fetching bookings
    // TODO: Replace with real API call, e.g.:
    // const fetchBookings = async () => {
    //   const therapistId = getLoggedInTherapistId();
    //   await fetchTherapistSchedules(therapistId);
    //   setBookings(therapistSchedulesFromContext);
    // };
    setBookings(mockBookings);
  }, []);

  // Filter bookings based on status
  const filteredBookings =
    filterStatus === "All"
      ? bookings
      : bookings.filter((booking) => booking.status === filterStatus);

  // Format date and time to match the screenshot (e.g., "Mar 28, 2025, 10:00 AM")
  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleOpenModal = (booking = null) => {
    if (booking) {
      setIsEditing(true);
      setCurrentBooking(booking);
    } else {
      setIsEditing(false);
      setCurrentBooking({
        id: null,
        clientName: null,
        dateTime: "",
        status: "Scheduled",
        notes: "",
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentBooking({
      id: null,
      clientName: null,
      dateTime: "",
      status: "Scheduled",
      notes: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!currentBooking.dateTime || !currentBooking.status) {
      toast.error("Please fill in all required fields (Date & Time, Status).");
      return;
    }

    if (currentBooking.status === "Scheduled" && currentBooking.clientName && !currentBooking.clientName.trim()) {
      toast.error("Client Name is required for Scheduled bookings with a client.");
      return;
    }

    if (isEditing) {
      // Update existing booking
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === currentBooking.id
            ? {
                ...currentBooking,
                clientName: currentBooking.status === "Scheduled" ? currentBooking.clientName : null,
              }
            : booking
        )
      );
      toast.success("Booking updated successfully!");
    } else {
      // Create new booking
      const newBooking = {
        ...currentBooking,
        id: bookings.length + 1,
        clientName: currentBooking.status === "Scheduled" ? currentBooking.clientName : null,
      };
      setBookings((prev) => [...prev, newBooking]);
      toast.success("Booking added successfully!");
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
      toast.success("Booking deleted successfully!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa", // Light background to match the screenshot
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          marginLeft: "250px", // Push content to the right of the sidebar
          padding: { xs: 2, md: 4 },
          backgroundColor: "#f5f7fa",
        }}
      >
        <Box sx={{ maxWidth: "100%", margin: "0 auto" }}>
          <Typography
            variant="h4"
            sx={{
              color: "#2c3e50",
              fontWeight: 700, // Bolder to match the screenshot
              letterSpacing: "1px",
              mb: 4,
            }}
          >
            My Schedule
          </Typography>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, md: 3 },
              borderRadius: "12px",
              background: "#ffffff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#2c3e50",
                  fontWeight: 500,
                }}
              >
                Booking Management
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ color: "#666" }}>Filter by Status</InputLabel>
                  <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    label="Filter by Status"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": { borderColor: "#e0e0e0" },
                        "&:hover fieldset": { borderColor: "#1976d2" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Canceled">Canceled</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  onClick={() => handleOpenModal()}
                  sx={{
                    backgroundColor: "#1976d2",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { backgroundColor: "#1565c0", transform: "scale(1.02)" },
                    transition: "all 0.3s ease",
                  }}
                >
                  Add New Booking
                </Button>
              </Box>
            </Box>
            <Divider sx={{ mb: 3, borderColor: "#e0e0e0" }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: "#2c3e50", borderBottom: "2px solid #e0e0e0" }}>
                      Client Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#2c3e50", borderBottom: "2px solid #e0e0e0" }}>
                      Date & Time
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#2c3e50", borderBottom: "2px solid #e0e0e0" }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#2c3e50", borderBottom: "2px solid #e0e0e0" }}>
                      Notes
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#2c3e50", borderBottom: "2px solid #e0e0e0" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                        <TableCell sx={{ color: "#2c3e50", borderBottom: "1px solid #e0e0e0", py: 1.5 }}>
                          {booking.clientName || "N/A"}
                        </TableCell>
                        <TableCell sx={{ color: "#2c3e50", borderBottom: "1px solid #e0e0e0", py: 1.5 }}>
                          {formatDateTime(booking.dateTime)}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #e0e0e0", py: 1.5 }}>
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 1,
                              backgroundColor:
                                booking.status === "Scheduled"
                                  ? "#1976d2"
                                  : booking.status === "Completed"
                                  ? "#4caf50"
                                  : "#e57373",
                              color: "#fff",
                              borderRadius: "16px",
                              px: 2,
                              py: 0.5,
                              fontSize: "0.85rem",
                              fontWeight: 500,
                            }}
                          >
                            {booking.status}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: "#2c3e50", borderBottom: "1px solid #e0e0e0", py: 1.5 }}>
                          {booking.notes || "N/A"}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #e0e0e0", py: 1.5 }}>
                          <IconButton
                            onClick={() => handleOpenModal(booking)}
                            sx={{ color: "#1976d2", "&:hover": { color: "#1565c0" } }}
                            title="Edit Booking"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(booking.id)}
                            sx={{ color: "#e57373", "&:hover": { color: "#d32f2f" } }}
                            title="Delete Booking"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ color: "#666", fontStyle: "italic", borderBottom: "none", py: 2 }}>
                        No bookings found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        {/* Modal for Adding/Editing Bookings */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 500 },
              bgcolor: "background.paper",
              borderRadius: "12px",
              boxShadow: 24,
              p: 4,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 3, color: "#2c3e50", fontWeight: 500 }}
            >
              {isEditing ? "Edit Booking" : "Add New Booking"}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Date & Time (YYYY-MM-DDTHH:MM:SS)"
                  name="dateTime"
                  value={currentBooking.dateTime}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{ style: { color: "#666" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#1976d2" },
                      "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel sx={{ color: "#666" }}>Status</InputLabel>
                  <Select
                    name="status"
                    value={currentBooking.status}
                    onChange={handleChange}
                    label="Status"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": { borderColor: "#e0e0e0" },
                        "&:hover fieldset": { borderColor: "#1976d2" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  >
                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Canceled">Canceled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {currentBooking.status === "Scheduled" && (
                <Grid item xs={12}>
                  <TextField
                    label="Client Name"
                    name="clientName"
                    value={currentBooking.clientName || ""}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ style: { color: "#666" } }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": { borderColor: "#e0e0e0" },
                        "&:hover fieldset": { borderColor: "#1976d2" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  name="notes"
                  value={currentBooking.notes || ""}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  InputLabelProps={{ style: { color: "#666" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#1976d2" },
                      "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                startIcon={<Add />}
                sx={{
                  backgroundColor: "#1976d2",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { backgroundColor: "#1565c0", transform: "scale(1.02)" },
                  transition: "all 0.3s ease",
                }}
              >
                {isEditing ? "Update" : "Add"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseModal}
                startIcon={<Delete />}
                sx={{
                  borderColor: "#e57373",
                  color: "#e57373",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { borderColor: "#d32f2f", color: "#d32f2f", transform: "scale(1.02)" },
                  transition: "all 0.3s ease",
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default TherapistBookings;