import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';

const AddCategory = () => {
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        const fetchCategory = async () => {
            if (isEditMode) {
                try {
                    const response = await api.get(`/categories/${id}`);
                    const catData = response.data.data !== undefined ? response.data.data : response.data;
                    if (catData) {
                        setFormData({
                            name: catData.name || '',
                            description: catData.description || ''
                        });
                    }
                } catch (err) {
                    console.error("Failed to load category data", err);
                    setError('Failed to load category data.');
                } finally {
                    setFetching(false);
                }
            }
        };
        fetchCategory();
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEditMode) {
                await api.put(`/categories/${id}`, formData);
                alert('Category updated successfully!');
            } else {
                await api.post('/categories', formData);
                alert('Category added successfully!');
            }
            navigate('/admin/categories');
        } catch (err) {
            console.error('Error saving category:', err);
            setError(err.response?.data?.message || 'Failed to save the category.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div style={{padding: '20px'}}>Loading category details...</div>;

    return (
        <div style={{ maxWidth: '600px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>{isEditMode ? 'Edit Category' : 'Add New Category'}</h2>
                <button 
                  onClick={() => navigate('/admin/categories')}
                  style={{ padding: '6px 12px', background: '#e2e8f0', color: '#0f172a', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Back to Categories
                </button>
            </div>

            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                </div>
                
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', minHeight: '80px' }} />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ marginTop: '10px', padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                >
                    {loading ? 'Saving...' : (isEditMode ? 'Update Category' : 'Add Category')}
                </button>
            </form>
        </div>
    );
};

export default AddCategory;