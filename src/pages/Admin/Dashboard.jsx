import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Book, Users, Tags, FileText } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        books: 0,
        users: 0,
        categories: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [booksRes, usersRes, catRes] = await Promise.all([
                    api.get('/books'),
                    api.get('/users'),
                    api.get('/categories')
                ]);
                
                setStats({
                    books: booksRes.data.data?.totalElements || booksRes.data.data?.length || 0,
                    users: usersRes.data.data?.totalElements || usersRes.data.data?.length || 0,
                    categories: catRes.data.data?.length || 0
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
            <div className="admin-page-header">
                <h2>Overview</h2>
            </div>
            <div className="dashboard-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#4f46e5' }}>
                        <Book />
                    </div>
                    <div className="stat-details">
                        <h3>Total Books</h3>
                        <p>{stats.books}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#10b981' }}>
                        <Users />
                    </div>
                    <div className="stat-details">
                        <h3>Registered Users</h3>
                        <p>{stats.users}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#f59e0b' }}>
                        <Tags />
                    </div>
                    <div className="stat-details">
                        <h3>Categories</h3>
                        <p>{stats.categories}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#ec4899' }}>
                        <FileText />
                    </div>
                    <div className="stat-details">
                        <h3>System Logs</h3>
                        <p>12</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
