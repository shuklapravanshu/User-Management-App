import React, { useState, useEffect } from 'react';

const UserForm = ({ onAdd, onEdit, selectedUser, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    company: { name: '' },
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({ ...selectedUser });
    }
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      onEdit(formData);
    } else {
      onAdd(formData);
    }
    setFormData({
      name: '',
      username: '',
      email: '',
      company: { name: '' },
    });
  };

  return (
    <div className="user-form">
      <h2>{selectedUser ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Department</label>
          <input
            type="text"
            name="company.name"
            value={formData.company.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{selectedUser ? 'Update' : 'Add'} User</button>
        {selectedUser && <button onClick={onCancel}>Cancel</button>}
      </form>
    </div>
  );
};

export default UserForm;
