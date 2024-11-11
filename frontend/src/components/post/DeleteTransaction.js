import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 

const DeleteTransaction = () => {
  const { transactionId } = useParams();  // Assuming 'transactionId' as the URL param for identifying the transaction
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/payment/${transactionId}`, {  // Assuming API endpoint for deleting transactions
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/payments");  // Redirect to payments list page after deletion
    } catch (error) {
      console.error("Failed to delete transaction", error);
      // Optionally, show error feedback to the user
    }
  };

  return (
    <div>
      <h1>Delete Transaction</h1>
      <p>Are you sure you want to delete this transaction?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate("/payments")}>Cancel</button>
    </div>
  );
};

export default DeleteTransaction;
