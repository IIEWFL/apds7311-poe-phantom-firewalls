import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5008/api/auth/login', {
                username,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/transactions');
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred. Please try again.');
        }
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f7f7f7',
        },
        form: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '20px',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '5px',
            display: 'block',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
        },
        inputFocus: {
            borderColor: '#007bff',
            outline: 'none',
        },
        errorMessage: {
            color: 'red',
            fontSize: '14px',
            marginTop: '10px',
            textAlign: 'center',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                {error && <p style={styles.errorMessage}>{error}</p>}
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

export default Login;
