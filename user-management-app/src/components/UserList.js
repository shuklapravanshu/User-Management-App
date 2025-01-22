import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.username})
            <p>Email: {user.email}</p>
            <p>Department: {user.company.name}</p>
            <button onClick={() => onEdit(user)}>Edit</button>
            <button onClick={() => onDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
