import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';

const AddBook = () => {
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingBook, setFetchingBook] = useState(isEditMode);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        genre: '',
        language: '',
        price: '',
        imageUrl: '',
        inventory: '',
        categoryId: ''
    });

    useEffect(() => {
        const fetchDependencies = async () => {
            try {
                const response = await api.get('/categories');
                const catData = response.data.data !== undefined ? response.data.data : response.data;
                setCategories(Array.isArray(catData) ? catData : []);

                if (isEditMode) {
                    const bookRes = await api.get(`/books/${id}`);
                    const bookData = bookRes.data.data !== undefined ? bookRes.data.data : bookRes.data;
                    if (bookData) {
                        setFormData({
                            title: bookData.title || '',
                            author: bookData.author || '',
                            description: bookData.description || '',
                            genre: bookData.genre || '',
                            language: bookData.language || '',
                            price: bookData.price || '',
                            imageUrl: bookData.imageUrl || '',
                            inventory: bookData.inventory || bookData.stockQuantity || '', 
                            categoryId: bookData.categoryId || ''
                        });
                    }
                }
            } catch (err) {
                console.error("Failed to load setup data", err);
                setError('Failed to load required data.');
            } finally {
                if (isEditMode) setFetchingBook(false);
            }
        };
        fetchDependencies();
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Convert to appropriate types before sending
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                inventory: parseInt(formData.inventory, 10),
                categoryId: formData.categoryId ? parseInt(formData.categoryId, 10) : null
            };

            if (isEditMode) {
                await api.put(`/books/${id}`, payload);
                alert('Book updated successfully!');
            } else {
                await api.post('/books', payload);
                alert('Book added successfully!');
            }
            navigate('/admin/books');
        } catch (err) {
            console.error('Error saving book:', err);
            setError(err.response?.data?.message || 'Failed to save the book.');
        } finally {
            setLoading(false);
        }
    };

    if (fetchingBook) return <div style={{padding: '20px'}}>Loading book details...</div>;

    return (
        <div style={{ maxWidth: '600px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>{isEditMode ? 'Edit Book' : 'Add New Book'}</h2>
                <button 
                  onClick={() => navigate('/admin/books')}
                  style={{ padding: '6px 12px', background: '#e2e8f0', color: '#0f172a', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Back to Books
                </button>
            </div>

            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                </div>
                
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Author</label>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                </div>

                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', minHeight: '80px' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Genre</label>
                        <input type="text" name="genre" value={formData.genre} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                    </div>
                    
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Language</label>
                        <input type="text" name="language" value={formData.language} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Price</label>
                        <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Inventory (Stock)</label>
                        <input type="number" name="inventory" value={formData.inventory} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Image URL</label>
                    <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                </div>

                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Category</label>
                    <select name="categoryId" value={formData.categoryId} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                        <option value="" disabled>Select a Category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ marginTop: '10px', padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                >
                    {loading ? 'Saving...' : (isEditMode ? 'Update Book' : 'Add Book')}
                </button>
            </form>
        </div>
    );
};

export default AddBook;