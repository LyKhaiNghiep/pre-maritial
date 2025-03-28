import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getWalletByUserId,
  getTransactionsByWalletId,
} from "../customerServices";
import "./TransactionHistory.css";
import { Pagination } from "../../../components/Pagination/Pagination";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 5; // Number of transactions per page

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Retrieve the logged-in user from localStorage
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.id) {
          toast.error("User not found. Please log in again.");
          return;
        }

        // Fetch the wallet for the logged-in user
        const wallet = await getWalletByUserId(user.id);

        if (wallet && wallet.id) {
          // Fetch transactions for the wallet using the new API
          const response = await getTransactionsByWalletId(wallet.id, {
            page: 1,
            size: 99,
            sort: "id",
            direction: "ASC",
          });

          setTransactions(response.content || []); // Set the transactions in state
        } else {
          toast.error("No wallet found for the user.");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to fetch transactions. Please try again.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Calculate the transactions to display on the current page
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <div className="transaction-history-container">
      <h2>Transaction History</h2>
      {transactions.length > 0 ? (
        <>
          <table className="transaction-history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Transaction Type</th>
                <th>Transaction Time</th>
                <th>Status</th>
                <th>Balance Before</th>
                <th>Transaction Fee</th>
                <th>Balance After</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.transactionType}</td>
                  <td>
                    {new Date(transaction.transactionTime).toLocaleString()}
                  </td>
                  <td>{transaction.transactionStatus}</td>
                  <td>{transaction.balanceBefore}</td>
                  <td>{transaction.transactionFee}</td>
                  <td>{transaction.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            postsPerPage={itemsPerPage}
            totalPosts={transactions.length}
            currentPage={currentPage}
            paginate={setCurrentPage}
          />
        </>
      ) : (
        <p className="no-transactions-message">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionHistory;
