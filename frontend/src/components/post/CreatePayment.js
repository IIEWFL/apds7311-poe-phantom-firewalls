import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const paymentMethods = ["Credit Card", "Debit Card", "PayPal", "Bank Transfer"];

const CreatePayment = () => {
  const [transactionId, setTransactionId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [userEmail, setUserEmail] = useState('');
  const [postImage, setPostImage] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const newPayment = {
        transactionId,
        amount,
        paymentMethod,
        email: userEmail,
        postImage,
        paymentStatus
      };

      await axios.post('https://localhost:5008/api/posts/add', newPayment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactionId('');
      setAmount('');
      setPaymentMethod(paymentMethods[0]);
      setUserEmail('');
      setPostImage('');
      setPaymentStatus('Pending');
      setError('');
      navigate("/payments");
    } catch (error) {
      setError('Failed to create payment');
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
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create Payment</h1>
      {error && <p style={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Transaction ID:</label>
          <input
            type="text"
            value={transactionId}
            onChange={e => setTransactionId(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
            style={styles.input}
          >
            {paymentMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>User Email:</label>
          <input
            type="email"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Image URL:</label>
          <input
            type="text"
            value={postImage}
            onChange={e => setPostImage(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Payment Status:</label>
          <select
            value={paymentStatus}
            onChange={e => setPaymentStatus(e.target.value)}
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
          Create Payment
        </button>
      </form>
    </div>
  );
};

export default CreatePayment;
