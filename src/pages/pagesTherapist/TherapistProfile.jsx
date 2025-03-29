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
} from "@mui/material";
import { toast } from "react-toastify";
import {
  getTherapistProfile,
  updateTherapistProfile,
} from "./therapistServices";

const TherapistProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
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
    version: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Get user object from local storage and parse it
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          throw new Error("User ID not found in local storage.");
        }

        const therapist = await getTherapistProfile(user.id); // Fetch therapist profile
        setProfile({
          bio: therapist.bio || "Not set",
          therapistCertificationName:
            therapist.therapistCertificationName || "Not set",
          certificationIssuedBy: therapist.certificationIssuedBy || "Not set",
          certificationIssueDate: therapist.certificationIssueDate || "Not set",
          certificationExpirationDate:
            therapist.certificationExpirationDate || "Not set",
          specialty: therapist.therapistMajorId || "Not set",
          treatmentCost: therapist.treatmentCost || 0,
          active: therapist.isActive !== undefined ? therapist.isActive : true,
          version: therapist.version || "Not set",
        });
      } catch (error) {
        console.error("Error fetching therapist profile:", error);
        toast.error("Failed to load therapist profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleActiveChange = (e) => {
    setProfile((prev) => ({ ...prev, active: e.target.checked }));
  };

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        throw new Error("User ID not found in local storage.");
      }

      const updatedData = {
        bio: profile.bio,
        therapistCertificationName: profile.therapistCertificationName,
        certificationIssuedBy: profile.certificationIssuedBy,
        certificationIssueDate: profile.certificationIssueDate,
        certificationExpirationDate: profile.certificationExpirationDate,
        therapistMajorId: profile.specialty,
        treatmentCost: profile.treatmentCost,
        isActive: profile.active,
        version: null,
      };

      console.log("Payload being sent:", updatedData); // Log the payload for debugging
      await updateTherapistProfile(user.id, updatedData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating therapist profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h5" gutterBottom>
          Profile Details
        </Typography>
        {isEditing ? (
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Certification Name"
              name="therapistCertificationName"
              value={profile.therapistCertificationName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Certification Issued By"
              name="certificationIssuedBy"
              value={profile.certificationIssuedBy}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Certification Issue Date (YYYY-MM-DD)"
              name="certificationIssueDate"
              value={profile.certificationIssueDate}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Certification Expiration Date (YYYY-MM-DD)"
              name="certificationExpirationDate"
              value={profile.certificationExpirationDate}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Treatment Cost"
              name="treatmentCost"
              type="number"
              value={profile.treatmentCost}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography>Active:</Typography>
              <Switch
                checked={profile.active}
                onChange={handleActiveChange}
                name="active"
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography>
              <strong>Bio:</strong> {profile.bio}
            </Typography>
            <Typography>
              <strong>Certification Name:</strong>{" "}
              {profile.therapistCertificationName}
            </Typography>
            <Typography>
              <strong>Certification Issued By:</strong>{" "}
              {profile.certificationIssuedBy}
            </Typography>
            <Typography>
              <strong>Certification Issue Date:</strong>{" "}
              {profile.certificationIssueDate}
            </Typography>
            <Typography>
              <strong>Certification Expiration Date:</strong>{" "}
              {profile.certificationExpirationDate}
            </Typography>
            <Typography>
              <strong>Treatment Cost:</strong> ${profile.treatmentCost}
            </Typography>
            <Typography>
              <strong>Active:</strong> {profile.active ? "Yes" : "No"}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
              sx={{ marginTop: 2, width: "fit-content" }}
            >
              Edit Profile
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TherapistProfile;
