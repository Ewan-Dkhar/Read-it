import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, BookOpen, Tags, Users, LogOut } from 'lucide-react';
import '../styles/AdminLayout.css';

const AdminLayout = () => {
    const { logout } = useAuth();

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <h2>Read-It Admin</h2>
                </div>
                <nav className="admin-sidebar-nav">
                    <NavLink to="/admin" end className={({isActive}) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
                        <LayoutDashboard /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/books" className={({isActive}) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
                        <BookOpen /> Manage Books
                    </NavLink>
                    <NavLink to="/admin/categories" className={({isActive}) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
                        <Tags /> Categories
                    </NavLink>
                    <NavLink to="/admin/users" className={({isActive}) => isActive ? "admin-nav-link active" : "admin-nav-link"}>
                        <Users /> Users
                    </NavLink>
                </nav>
            </aside>
            <main className="admin-main">
                <header className="admin-header">
                    <h1>Administrator Panel</h1>
                    <div className="admin-header-actions">
                        <button className="admin-btn" style={{background: 'transparent', color: '#ef4444'}} onClick={() => logout()}>
                            <LogOut size={20} /> Logout
                        </button>
                    </div>
                </header>
                <div className="admin-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
