import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const paymentMethods = ["Credit Card", "Debit Card", "PayPal", "Bank Transfer"];

const EditPayment = () => {
  const [payment, setPayment] = useState({
    transactionId: '',
    amount: '',
    paymentMethod: paymentMethods[0],
    userEmail: '',
    postImage: '',
    paymentStatus: 'Pending',
  });
  const [error, setError] = useState('');
  const { transactionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/payment/${transactionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPayment(response.data);
      } catch (error) {
        setError('Failed to fetch payment details');
      }
    };
    fetchPaymentDetails();
  }, [transactionId]);

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/payment/${transactionId}`, payment, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/payments");
    } catch (error) {
      setError('Failed to update payment');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    form: {
      width: '100%',
      maxWidth: '500px',
      background: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      marginTop: '5px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      width: '100%',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    errorMessage: {
      color: 'red',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Edit Payment</h1>
      {error && <p style={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Transaction ID:</label>
          <input
            type="text"
            name="transactionId"
            value={payment.transactionId}
            onChange={handleChange}
            style={styles.input}
            disabled
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Amount:</label>
          <input
            type="number"
            name="amount"
            value={payment.amount}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Payment Method:</label>
          <select
            name="paymentMethod"
            value={payment.paymentMethod}
            onChange={handleChange}
            style={styles.input}
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>User Email:</label>
          <input
            type="email"
            name="userEmail"
            value={payment.userEmail}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Image URL:</label>
          <input
            type="text"
            name="postImage"
            value={payment.postImage}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Payment Status:</label>
          <select
            name="paymentStatus"
            value={payment.paymentStatus}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Update Payment
        </button>
      </form>
    </div>
  );
};

export default EditPayment;
