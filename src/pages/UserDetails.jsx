import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../utils/localDB';

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User Details</h2>
      {user && (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
          {/* Add other user fields as needed */}
        </div>
      )}
    </div>
  );
};

export default UserDetail;
