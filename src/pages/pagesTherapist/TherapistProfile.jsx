import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Switch,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import useAuth from "../../utils/hook/useAuth";
import { AccountTree, Person, School, CalendarToday, MonetizationOn, ToggleOn, Edit, Save, Cancel } from "@mui/icons-material";
import { getProfile } from "./therapistServices";

// TherapistProfile.jsx
// This component displays and allows editing of a therapist's profile.
// Currently, it uses mock data (mockTherapists and mockMajors) to simulate the data that would normally come from the API.
// The save functionality is also mocked by updating the local state.
// TODO: For the development team
// 1. Replace the mock data with real API calls using TherapistContext (uncomment the import below).
// 2. Call fetchTherapists() in a useEffect hook to load the therapists data on mount.
// 3. Call fetchMajors() to load the majors data (if not already loaded in TherapistContext).
// 4. In the handleSave function, replace the mock save logic with a call to updateTherapist(therapistId, updatedData).
// See the TODO comment in handleSave for detailed instructions.

// import { TherapistContext } from "../../contexts/TherapistContext";

const TherapistProfile = () => {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [therapistId, setTherapistId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    bio: "",
    therapistCertificationName: "",
    certificationIssuedBy: "",
    certificationIssueDate: "",
    certificationExpirationDate: "",
    specialty: "",
    treatmentCost: 0,
    active: true,
    version: 0,
  });

  // Mock data to simulate the therapists and majors data that would normally come from the API
  const mockTherapists = [
    {
      userId: 69, // Matches the user.id from useAuth for testing
      bio: "Hello just testing here",
      therapistCertificationName: "dsadsdasd",
      certificationIssuedBy: "Not set",
      certificationIssueDate: "2025-03-27",
      certificationExpirationDate: "2030-03-27",
      therapistMajorId: 1,
      treatmentCost: 7000,
      active: true,
      version: 0,
    },
  ];

  const mockMajors = [
    { id: 1, name: "Psychology" },
    { id: 2, name: "Counseling" },
  ];

  // Simulate fetching therapists and setting the therapistId
  useEffect(() => {
    const getTherapistProfile = async () => {
      const account = localStorage.getItem("user");
      if (account) {
        const data = JSON.parse(account);
        const response = await getProfile(data.id);
        if (response.status === 200) {
          setProfile({
            bio: response.data.bio || "",
            therapistCertificationName: response.data.therapistCertificationName || "",
            certificationIssuedBy: response.data.certificationIssuedBy || "",
            certificationIssueDate: response.data.certificationIssueDate || "",
            certificationExpirationDate: response.data.certificationExpirationDate || "",
            specialty: mockMajors.find((m) => m.id === response.data.therapistMajorId)?.name || "",
            treatmentCost: response.data.treatmentCost || 0,
            active: response.data.isActive !== undefined ? response.data.isActive : true,
            version: response.data.version || 0,
          });
          setTherapistId(data.id);
          console.log(response.data);
        }
      }
      setLoading(false);
    };
    getTherapistProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleActiveChange = (e) => {
    setProfile((prev) => ({ ...prev, active: e.target.checked }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!profile.bio || !profile.therapistCertificationName || !profile.specialty) {
      toast.error("Please fill in all required fields (Bio, Certification Name, Specialty).");
      return;
    }

    if (!therapistId) {
      toast.error("Không tìm thấy therapist ID!");
      console.log("Therapist ID is missing!");
      return;
    }

    // Prepare the updated data
    const major = mockMajors.find((m) => m.name === profile.specialty);
    const updatedData = {
      id: therapistId,
      bio: profile.bio,
      therapistCertificationName: profile.therapistCertificationName,
      certificationIssuedBy: profile.certificationIssuedBy,
      certificationIssueDate: profile.certificationIssueDate,
      certificationExpirationDate: profile.certificationExpirationDate,
      therapistMajorId: major ? major.id : null,
      treatmentCost: parseFloat(profile.treatmentCost),
      active: profile.active,
      version: profile.version,
    };

    console.log("Saving therapist with ID:", therapistId);
    console.log("Updated data:", updatedData);

    // TODO: For the development team
    // Replace this mock save logic with an API call to update the therapist's profile
    // Steps to add the API call:
    // 1. Use the updateTherapist function from TherapistContext (uncomment the import above)
    // 2. Call updateTherapist(therapistId, updatedData) inside a try/catch block
    // 3. Update the mockTherapists array with the response from the API
    // Example:
    /*
    try {
      const updatedTherapist = await updateTherapist(therapistId, updatedData);
      // Update mockTherapists with the new data (or update the state in TherapistContext)
      mockTherapists = mockTherapists.map((therapist) =>
        therapist.userId === therapistId ? updatedTherapist : therapist
      );
      setProfile({
        bio: updatedTherapist.bio || "Not set",
        therapistCertificationName: updatedTherapist.therapistCertificationName || "Not set",
        certificationIssuedBy: updatedTherapist.certificationIssuedBy || "Not set",
        certificationIssueDate: updatedTherapist.certificationIssueDate || "Not set",
        specialty: majors.find((m) => m.id === updatedTherapist.therapistMajorId)?.name || "Not set",
        active: updatedTherapist.active !== undefined ? updatedTherapist.active : true,
        version: updatedTherapist.version || 0,
      });
      setIsEditing(false);
      toast.success("Your changes have been saved!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to save changes. Please try again.");
    }
    */

    // For now, simulate the save by updating the local state
    mockTherapists[0] = { ...mockTherapists[0], ...updatedData, therapistMajorId: major ? major.id : null };
    setProfile({
      bio: updatedData.bio || "Not set",
      therapistCertificationName: updatedData.therapistCertificationName || "Not set",
      certificationIssuedBy: updatedData.certificationIssuedBy || "Not set",
      certificationIssueDate: updatedData.certificationIssueDate || "Not set",
      certificationExpirationDate: updatedData.certificationExpirationDate || "Not set",
      specialty: major ? major.name : "Not set",
      treatmentCost: updatedData.treatmentCost || 0,
      active: updatedData.active !== undefined ? updatedData.active : true,
      version: updatedData.version || 0,
    });

    setIsEditing(false);
    toast.success("Your changes have been saved!");
  };

  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: "rgba(255, 255, 255, 0.9)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <CircularProgress size={50} sx={{ color: "#1976d2", mb: 2 }} />
        <Typography variant="h6" sx={{ color: "#1976d2" }}>
          Loading Profile...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 4 },
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4f8 0%, #e1e8ee 100%)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Person sx={{ fontSize: 40, color: "#1976d2", mr: 2 }} />
          <Typography
            variant="h4"
            sx={{
              color: "#2c3e50",
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            Chào mừng, {user?.username}!
          </Typography>
        </Box>
        <Paper
          elevation={6}
          sx={{
            padding: { xs: 2, md: 4 },
            borderRadius: "12px",
            background: "#ffffff",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <AccountTree sx={{ fontSize: 30, color: "#1976d2", mr: 1 }} />
            <Typography
              variant="h5"
              sx={{
                color: "#2c3e50",
                fontWeight: 500,
              }}
            >
              My Profile
            </Typography>
          </Box>
          <Divider sx={{ mb: 3, borderColor: "#e0e0e0" }} />
          {isEditing ? (
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                multiline
                rows={3}
                InputLabelProps={{ style: { color: "#666" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#e0e0e0" },
                    "&:hover fieldset": { borderColor: "#1976d2" },
                    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                  },
                }}
              />
              <Box sx={{ border: "1px solid #e0e0e0", borderRadius: "8px", p: 3, background: "#fafafa" }}>
                <Typography variant="h6" sx={{ mb: 2, color: "#2c3e50", fontWeight: 500 }}>
                  Certification Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Certification Name"
                      name="therapistCertificationName"
                      value={profile.therapistCertificationName}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                      InputLabelProps={{ style: { color: "#666" } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#e0e0e0" },
                          "&:hover fieldset": { borderColor: "#1976d2" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Certification Issued By"
                      name="certificationIssuedBy"
                      value={profile.certificationIssuedBy}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{ style: { color: "#666" } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#e0e0e0" },
                          "&:hover fieldset": { borderColor: "#1976d2" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Certification Issue Date (YYYY-MM-DD)"
                      name="certificationIssueDate"
                      value={profile.certificationIssueDate}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{ style: { color: "#666" } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#e0e0e0" },
                          "&:hover fieldset": { borderColor: "#1976d2" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Certification Expiration Date (YYYY-MM-DD)"
                      name="certificationExpirationDate"
                      value={profile.certificationExpirationDate}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{ style: { color: "#666" } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#e0e0e0" },
                          "&:hover fieldset": { borderColor: "#1976d2" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <FormControl fullWidth required>
                <InputLabel sx={{ color: "#666" }}>Specialty</InputLabel>
                <Select
                  name="specialty"
                  value={profile.specialty}
                  onChange={handleChange}
                  label="Specialty"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                  }}
                >
                  {mockMajors.map((major) => (
                    <MenuItem key={major.id} value={major.name}>
                      {major.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Treatment Cost (VND)"
                name="treatmentCost"
                type="number"
                value={profile.treatmentCost}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: "#666" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#e0e0e0" },
                    "&:hover fieldset": { borderColor: "#1976d2" },
                    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                  },
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ToggleOn sx={{ color: "#1976d2" }} />
                <Typography sx={{ color: "#2c3e50" }}>Active:</Typography>
                <Switch
                  checked={profile.active}
                  onChange={handleActiveChange}
                  name="active"
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#1976d2",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#1976d2",
                    },
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  startIcon={<Save />}
                  sx={{
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#1565c0", transform: "scale(1.02)" },
                    transition: "all 0.3s ease",
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                  startIcon={<Cancel />}
                  sx={{
                    borderColor: "#e57373",
                    color: "#e57373",
                    "&:hover": { borderColor: "#d32f2f", color: "#d32f2f", transform: "scale(1.02)" },
                    transition: "all 0.3s ease",
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Person sx={{ color: "#1976d2", mr: 1 }} />
                    <Typography sx={{ color: "#2c3e50" }}>
                      <strong>Bio:</strong> {profile.bio}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <School sx={{ color: "#1976d2", mr: 1 }} />
                    <Typography sx={{ color: "#2c3e50" }}>
                      <strong>Certification Name:</strong> {profile.therapistCertificationName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <School sx={{ color: "#1976d2", mr: 1 }} />
                    <Typography sx={{ color: "#2c3e50" }}>
                      <strong>Certification Issued By:</strong> {profile.certificationIssuedBy}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CalendarToday sx={{ color: "#1976d2", mr: 1 }} />
                    <Typography sx={{ color: "#2c3e50" }}>
                      <strong>Certification Issue Date:</strong> {profile.certificationIssueDate}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CalendarToday sx={{ color: "#1976d2", mr: 1 }} />
                    <Typography sx={{ color: "#1976d2" }}>
                      <strong>Certification Expiration Date:</strong> {profile.certificationExpirationDate}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <School sx={{ color: "#1976d2", mr: 1 }} />
                    <Typography sx={{ color: "#2c3e50" }}>
                      <strong>Specialty:</strong> {profile.specialty}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <MonetizationOn sx={{ color: "#1976d2", mr: 1 }} />
                    <Typography sx={{ color: "#2c3e50" }}>
                      <strong>Treatment Cost:</strong> {profile.treatmentCost} VND
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <ToggleOn sx={{ color: "#1976d2", mr: 1 }} />
                    <Typography sx={{ color: "#2c3e50" }}>
                      <strong>Active:</strong> {profile.active ? "Yes" : "No"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
                startIcon={<Edit />}
                sx={{
                  mt: 3,
                  backgroundColor: "#1976d2",
                  "&:hover": { backgroundColor: "#1565c0", transform: "scale(1.02)" },
                  transition: "all 0.3s ease",
                }}
              >
                Edit Profile
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default TherapistProfile;