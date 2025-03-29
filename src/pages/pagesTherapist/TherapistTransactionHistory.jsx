import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { getUserWallet, getWalletTransactions } from "./therapistServices"; // Import the API functions

const TherapistTransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          throw new Error("User ID not found in local storage.");
        }

        // Fetch wallet data to get the wallet ID
        const walletData = await getUserWallet(user.id);
        const walletId = walletData.id;

        // Fetch transactions for the wallet ID
        const transactionData = await getWalletTransactions(walletId);
        setTransactions(transactionData.content); // Set the transactions
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false); // Stop loading after the API call
      }
    };

    fetchTransactions();
  }, []);

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
        Transaction History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Balance Before</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.transactionType}</TableCell>
                <TableCell>
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount.toLocaleString()} VND
                </TableCell>
                <TableCell>
                  {new Date(transaction.transactionTime).toLocaleDateString(
                    "en-GB"
                  )}
                </TableCell>
                <TableCell>{transaction.transactionStatus}</TableCell>
                <TableCell>
                  {transaction.balanceBefore.toLocaleString()} VND
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TherapistTransactionHistory;
