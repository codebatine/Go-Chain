import { useEffect, useState } from 'react';
import { getCurrentUser } from '../utilities/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Assume token is stored in localStorage
        const response = await getCurrentUser(token);
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
