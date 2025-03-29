import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { getUserWallet, createWithdrawRequest } from "./therapistServices";

const TherapistWallet = () => {
  const [balance, setBalance] = useState(null); // Set initial balance to null
  const [loading, setLoading] = useState(true); // Add loading state
  const [showForm, setShowForm] = useState(false); // Control form visibility
  const [withdrawAmount, setWithdrawAmount] = useState(""); // Amount to withdraw

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          throw new Error("User ID not found in local storage.");
        }

        // Fetch wallet data
        const walletData = await getUserWallet(user.id);
        setBalance(walletData.balance); // Set the wallet balance
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        toast.error("Failed to load wallet data. Please try again.");
      } finally {
        setLoading(false); // Stop loading after the API call
      }
    };

    fetchWalletData();
  }, []);

  const handleRequestWithdrawal = () => {
    setShowForm(true); // Show the withdrawal form
  };

  const handleSubmitWithdrawal = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        throw new Error("User ID not found in local storage.");
      }

      const amount = parseFloat(withdrawAmount);
      if (isNaN(amount) || amount <= 0) {
        toast.error("Please enter a valid withdrawal amount.");
        return;
      }

      if (amount > balance) {
        toast.error("Withdrawal amount cannot exceed your current balance.");
        return;
      }

      // Format the date as dd/mm/yyyy
      const requestDate = new Date();
      const formattedDate = `${requestDate
        .getDate()
        .toString()
        .padStart(2, "0")}/${(requestDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${requestDate.getFullYear()}`;

      const payload = {
        userId: user.id,
        requestAmount: amount,
        requestDate: formattedDate, // Current date
        approvedBy: 0, // Default value
        approvedDate: null, // Default value
        transactionId: 0, // Default value
        isApproved: false, // Default value
        isActive: true, // Default value
      };

      console.log("Payload being sent:", payload); // Debugging log

      // Send the withdrawal request
      await createWithdrawRequest(payload);

      toast.success("Withdrawal request submitted successfully!");
      setShowForm(false); // Hide the form after submission
      setWithdrawAmount(""); // Reset the input field
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
      toast.error("Failed to submit withdrawal request. Please try again.");
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
    <Box sx={{ padding: 3, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Wallet
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Current Balance: {balance !== null ? balance.toFixed(2) : "0.00"}VND
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRequestWithdrawal}
          disabled={balance <= 0}
        >
          Request Withdrawal
        </Button>
      </Paper>
      {showForm && (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Enter Withdrawal Amount
          </Typography>
          <TextField
            label="Amount"
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitWithdrawal}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default TherapistWallet;
