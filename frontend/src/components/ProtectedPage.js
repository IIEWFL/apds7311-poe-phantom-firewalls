import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProtectedPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Retrieve token from localStorage or other secure storage
                const token = localStorage.getItem('token');

                // Make the GET request to the protected route
                const response = await axios.get('/api/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in the header
                    },
                });

                // Set the data from the response
                setData(response.data);
            } catch (err) {
                // Handle errors, such as token invalid or expired
                setError('You are not authorized to view this page.');
            }
        };

        fetchData(); // Call the function to fetch the data
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div>
            
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : data ? (
                <div>
                    <h1>Protected Page</h1>
                    <p>Only logged-in users can view this page.</p>
                    <p>{JSON.stringify(data)}</p> {/* Display fetched data */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProtectedPage;
