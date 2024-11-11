import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/navbar'; // Navbar component
import Login from './components/auth/Login'; // Login component
import Register from './components/auth/Register'; // Register component
import CreatePayment from './components/post/CreatePayment'; // CreatePayment component
import EditPayment from './components/post/EditPayment'; // EditPayment component
import DeleteTransaction from './components/post/DeleteTransaction'; // DeleteTransaction component
import GetPayments from './components/post/GetPayments'; // GetPayments component
import ProtectedPage from './components/ProtectedPage'; // ProtectedPage component

// This will be a placeholder for your /transactions route
function Transactions() {
  return (
    <div style={styles.transactionsContainer}>
      <h2>Transactions</h2>
      <p>Welcome to the transactions section. Choose an operation:</p>

      {/* Buttons for Create, Edit, Delete, and Get */}
      <div style={styles.operationsButtons}>
        <Link to="create">
          <button style={styles.operationButton}>Create Payment</button>
        </Link>
        <Link to="edit/1"> {/* Replace '1' with actual ID */}
          <button style={styles.operationButton}>Edit Payment</button>
        </Link>
        <Link to="delete/1"> {/* Replace '1' with actual ID */}
          <button style={styles.operationButton}>Delete Payment</button>
        </Link>
        <Link to="get">
          <button style={styles.operationButton}>View Payments</button>
        </Link>
      </div>

      {/* Nested Routes for operations */}
      <Routes>
        <Route path="create" element={<CreatePayment />} />
        <Route path="edit/:id" element={<EditPayment />} />
        <Route path="delete/:id" element={<DeleteTransaction />} />
        <Route path="get" element={<GetPayments />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Transactions Route with nested routes */}
          <Route path="/transactions/*" element={<Transactions />} />
          <Route path="/protected" element={<ProtectedPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Home Page with background image
function Home() {
  return (
    <div style={styles.homeContainer}>
      <h1>Welcome to Our Website!</h1>
      <p>Enjoy exploring our platform.</p>
    </div>
  );
}

export default App;

// Styling inside the App.js file
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'White',
    fontWeight: 'bold',
    fontSize: '16px',
    borderRadius: '5px',
    marginBottom: '20px'
  },
  navbarLinks: {
    textDecoration: 'none',
    color: 'white'
  },
  operationButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    margin: '10px',
    textAlign: 'center',
    width: '200px'
  },
  operationButtonHover: {
    backgroundColor: '#0056b3'
  },
  transactionsContainer: {
    padding: '20px',
    textAlign: 'center'
  },
  operationsButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px'
  },
  homeContainer: {
    height: '100vh',
    background: 'url(https://wallpapers.com/images/hd/bank-background-3m2869ucap3327qs.jpg) no-repeat center center fixed',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'Black',
    textAlign: 'center',
  }
};
