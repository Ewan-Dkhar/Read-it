import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Edit2, Trash2 } from 'lucide-react';

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                const catData = response.data.data !== undefined ? response.data.data : response.data;
                setCategories(Array.isArray(catData) ? catData : []);
            } catch (err) {
                console.error("Failed to load categories", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            await api.delete(`/categories/${id}`);
            setCategories(categories.filter(c => c.id !== id));
        } catch (err) {
            alert('Failed to delete category');
        }
    };

    if (loading) return <div>Loading categories...</div>;

    return (
        <div>
            <h2>Manage Categories</h2>
            <button className="admin-btn add" style={{marginTop: '20px'}} onClick={() => navigate('/admin/categories/add')}>+ Add Category</button>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <button className="admin-btn edit" onClick={() => navigate(`/admin/categories/edit/${category.id}`)}>
                                    <Edit2 size={16} />
                                </button>
                                <button className="admin-btn delete" onClick={() => handleDelete(category.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageCategories;