import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Adjust if your UserController has a different endpoint for fetching all users
                const response = await api.get('/users');
                const userData = response.data.data !== undefined ? response.data.data : response.data;
                setUsers(Array.isArray(userData) ? userData : []);
            } catch (err) {
                console.error("Failed to load users", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleRoleChange = async (id, currentRole) => {
        const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
        if (!window.confirm(`Are you sure you want to change this user to ${newRole}?`)) return;
        try {
            // Maps to PUT /api/users/{id}/role
            await api.put(`/users/${id}/role?role=${newRole}`);
            setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
        } catch (err) {
            alert('Failed to change user role');
        }
    };

    if (loading) return <div>Loading users...</div>;

    return (
        <div>
            <h2>Manage Users</h2>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.fullName}</td>
                            <td>
                                <span style={{
                                    background: user.role === 'ADMIN' ? '#fee2e2' : '#e0e7ff',
                                    color: user.role === 'ADMIN' ? '#ef4444' : '#3730a3',
                                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'
                                }}>
                                    {user.role}
                                </span>
                            </td>
                            <td>
                                <button className="admin-btn edit" onClick={() => handleRoleChange(user.id, user.role)}>Toggle Role</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;