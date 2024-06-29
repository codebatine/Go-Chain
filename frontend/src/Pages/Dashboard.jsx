import { useEffect, useState } from 'react';
import { getCurrentUser } from '../utilities/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // If no token is present, show alert and redirect
          alert('Please login.');
          window.location.href = '/login';
          return;
        }
        const response = await getCurrentUser(token);
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');

    // Show alert message
    alert('You are logged out.');

    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      {error && <p>{error}</p>}
      {user ? (
        <div className="dashboard-content">
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button> {/* Logout button */}
          {/* Placeholder for blockchain-specific information */}
          <div className="blockchain-info">
            <h2>Blockchain Information</h2>
            {/* Placeholder for blockchain status, latest blocks, etc. */}
            <p>Blockchain Status: Connected</p>
            {/* Example: Display latest blocks */}
            <div className="latest-blocks">
              <h3>Latest Blocks</h3>
              {/* Display latest blocks here */}
              {/* Example block */}
              <div className="block">
                <p>Block #12345</p>
                <p>Timestamp: 2024-06-28 12:00:00</p>
                <p>Hash: abcdef1234567890</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
