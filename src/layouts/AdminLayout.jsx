import React from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminLayout.css';

const AdminLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.role !== 'ADMIN') return <Navigate to="/" />;

  return (
    <div className='admin-layout' style={{display: 'flex', gap: '20px', minHeight: '70vh', padding: '20px'}}>
        <div className="admin-side-nav" style={{width: '250px', background: '#1e293b', color: 'white', borderRadius: '8px', padding: '20px'}}>
            <h3 style={{marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '10px'}}>Admin Panel</h3>
            <ul style={{listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <Link to='/admin' style={{textDecoration: 'none', color: 'white'}}>
                  <li style={{padding: '10px', background: '#334155', borderRadius: '5px', fontWeight: 'bold'}}>Dashboard</li>
                </Link>
                <Link to='/admin/books' style={{textDecoration: 'none', color: 'white'}}>
                   <li style={{padding: '10px', background: '#334155', borderRadius: '5px', fontWeight: 'bold'}}>Manage Books</li>
                </Link>
                <Link to='/admin/users' style={{textDecoration: 'none', color: 'white'}}>
                   <li style={{padding: '10px', background: '#334155', borderRadius: '5px', fontWeight: 'bold'}}>Manage Users</li>
                </Link>
                <Link to='/admin/categories' style={{textDecoration: 'none', color: 'white'}}>
                   <li style={{padding: '10px', background: '#334155', borderRadius: '5px', fontWeight: 'bold'}}>Manage Categories</li>
                </Link>
                <button 
                  onClick={logout} 
                  style={{marginTop: '30px', padding: '10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}
                >
                  Logout
                </button>
            </ul>
        </div>
        <div className="admin-content" style={{flex: 1, background: '#f8fafc', padding: '20px', borderRadius: '8px', overflowY: 'auto'}}>
           <Outlet />
        </div>
    </div>
  );
};

export default AdminLayout;