import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";

// This component defines the header for the Therapist Role.
// Dynamically sets the title based on the current route.
// Adds navigation to the notification icon and a dropdown for the profile icon.
const TherapistHeader = () => {
  // Mock data for notifications (replace with API later)
  const unreadNotifications = 2;
  const navigate = useNavigate();
  // State for profile dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handle profile icon click to open/close dropdown
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  // Handle logout (mock function, replace with actual logout logic)
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    handleProfileClose();
  };

  // Get current route to set dynamic header text
  const location = useLocation();
  const getHeaderTitle = () => {
    switch (location.pathname) {
      case "/therapist-home":
        return "Therapist Dashboard";
      case "/therapist-home/profile":
        return "My Profile";
      case "/therapist-home/notifications":
        return "Notifications";
      case "/therapist-home/wallet":
        return "Wallet";
      case "/therapist-home/withdrawn-requests":
        return "Withdrawn Requests";
      case "/therapist-home/transaction-history":
        return "Transaction History";
      case "/therapist-home/schedule":
        return "Schedule/Booking";
      case "/therapist-home/quiz":
        return "Quiz";
      case "/therapist-home/articles":
        return "Articles";
      default:
        return "Therapist Dashboard";
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Dynamic Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {getHeaderTitle()}
        </Typography>

        {/* Notification Icon with Redirect */}
        <IconButton
          color="inherit"
          component={Link}
          to="/therapist-home/notifications"
        >
          <Badge badgeContent={unreadNotifications ?? 0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Profile Icon with Dropdown */}
        <IconButton
          color="inherit"
          onClick={handleProfileClick}
          aria-controls={open ? "profile-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <AccountCircleIcon />
        </IconButton>

        {/* Profile Dropdown Menu */}
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleProfileClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {/* UserCard */}
          <Box sx={{ padding: 2, minWidth: 200 }}>
            <Typography variant="subtitle1" gutterBottom>
              Lotus
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Therapist
            </Typography>
            <Typography variant="body2" color="textSecondary">
              lotus@example.com
            </Typography>
          </Box>
          <MenuItem
            onClick={handleLogout}
            sx={{
              backgroundColor: "#f44336", // Red background
              color: "#fff", // White text
              "&:hover": {
                backgroundColor: "#d32f2f", // Darker red on hover
              },
              margin: 1,
              borderRadius: "4px",
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TherapistHeader;
