import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom"; 
import axios from 'axios';

const GetPayments = () => {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/posts/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPayments(response.data); 
            } catch (error) {
                setError('You are not authorized to view the payments.');
            }
        };
        fetchPayments();
    }, []);

    const styles = {
        createPaymentLink: {
            display: 'inline-block',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            textDecoration: 'none',
        },
        createPaymentLinkHover: {
            backgroundColor: '#45a049',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        thTd: {
            padding: '12px',
            border: '1px solid #ddd',
            textAlign: 'center',
        },
        th: {
            backgroundColor: '#f4f4f4',
        },
        link: {
            color: '#007bff',
            textDecoration: 'none',
        },
        linkHover: {
            textDecoration: 'underline',
        },
        errorMessage: {
            color: 'red',
            textAlign: 'center',
        }
    };

    return (
        <div>
            <h1>Payments</h1>
            <NavLink to="/create-payment" style={styles.createPaymentLink} 
                onMouseOver={(e) => e.target.style.backgroundColor = styles.createPaymentLinkHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.createPaymentLink.backgroundColor}
            >
                Create Payment
            </NavLink>
            {error ? (
                <p style={styles.errorMessage}>{error}</p>
            ) : payments.length > 0 ? (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.thTd}>Transaction ID</th>
                            <th style={styles.thTd}>Amount</th>
                            <th style={styles.thTd}>Payment Method</th>
                            <th style={styles.thTd}>Status</th>
                            <th style={styles.thTd}>Email</th>
                            <th style={styles.thTd}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.transactionId}>
                                <td style={styles.thTd}>{payment.transactionId}</td>
                                <td style={styles.thTd}>${payment.amount}</td>
                                <td style={styles.thTd}>{payment.paymentMethod}</td>
                                <td style={styles.thTd}>{payment.paymentStatus}</td>
                                <td style={styles.thTd}>{payment.userEmail}</td>
                                <td style={styles.thTd}>
                                    <NavLink to={`/edit-payment/${payment.transactionId}`} style={styles.link} 
                                        onMouseOver={(e) => e.target.style.textDecoration = styles.linkHover.textDecoration}
                                        onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                                    >
                                        Edit
                                    </NavLink> | 
                                    <NavLink to={`/payment/${payment.transactionId}`} style={styles.link} 
                                        onMouseOver={(e) => e.target.style.textDecoration = styles.linkHover.textDecoration}
                                        onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                                    >
                                        View
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No payments found.</p>
            )}
        </div>
    );
};

export default GetPayments;
