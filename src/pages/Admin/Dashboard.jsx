import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const Dashboard = () => {
    const [stats, setStats] = useState({ users: 0, books: 0, orders: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // You can add distinct aggregation endpoints or fetch arrays and length them
                const [booksRes, ordersRes, usersRes] = await Promise.all([
                    api.get('/books'),
                    api.get('/orders'),
                    api.get('/users')
                ]);
                setStats({
                    books: booksRes.data.data?.content?.length || booksRes.data.data?.length || 0,
                    orders: ordersRes.data.data?.length || 0,
                    users: usersRes.data.data?.length || 0
                });
            } catch (err) {
                console.error("Failed to load dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div className="admin-dashboard-cards">
                <div className="admin-card">
                    <h3>Total Users</h3>
                    <p>{stats.users}</p>
                </div>
                <div className="admin-card">
                    <h3>Total Books</h3>
                    <p>{stats.books}</p>
                </div>
                <div className="admin-card">
                    <h3>Total Orders</h3>
                    <p>{stats.orders}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;