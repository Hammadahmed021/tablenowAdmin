import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../utils/localDB';
import { UserTable } from '../component';

const App = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers();
        setUsers(result);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <UserTable data={users} />
    </div>
  );
};

export default App;
