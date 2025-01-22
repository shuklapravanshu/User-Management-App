import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  // Add new user
  const handleAddUser = async (user) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      const newUser = await response.json();
      setUsers([...users, newUser]);
    } catch (error) {
      setError('Failed to add user.');
    }
  };

  // Edit existing user
  const handleEditUser = async (updatedUser) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const data = await response.json();
      setUsers(users.map((user) => (user.id === data.id ? data : user)));
      setSelectedUser(null);
    } catch (error) {
      setError('Failed to update user.');
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError('Failed to delete user.');
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      {error && <p className="error">{error}</p>}
      <UserList
        users={users}
        onEdit={(user) => setSelectedUser(user)}
        onDelete={handleDeleteUser}
      />
      <UserForm
        onAdd={handleAddUser}
        onEdit={handleEditUser}
        selectedUser={selectedUser}
        onCancel={() => setSelectedUser(null)}
      />
    </div>
  );
}

export default App;
