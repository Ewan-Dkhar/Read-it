import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get('/books');
                const booksData = response.data.data?.content || response.data.data || [];
                setBooks(booksData);
            } catch (err) {
                console.error("Failed to load books", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;
        try {
            await api.delete(`/books/${id}`);
            setBooks(books.filter(b => b.id !== id));
        } catch (err) {
            alert('Failed to delete book');
        }
    };

    if (loading) return <div>Loading books...</div>;

    return (
        <div>
            <div className="admin-page-header">
                <h2>Manage Books</h2>
                <button className="admin-btn add" onClick={() => navigate('/admin/books/add')}>
                    <Plus size={18} /> Add New Book
                </button>
            </div>
            
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Preview</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>
                                    <div style={{width: '40px', height: '60px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#f3f4f6'}}>
                                        {book.imageUrl && <img src={book.imageUrl} alt="cover" width="100%" height="100%" style={{objectFit: 'cover'}}/>}
                                    </div>
                                </td>
                                <td style={{fontWeight: '500', color: '#111827'}}>{book.title}</td>
                                <td style={{color: '#6b7280'}}>{book.author}</td>
                                <td style={{fontWeight: '500'}}>Rs. {book.price}</td>
                                <td>
                                    <span style={{
                                        padding: '0.25rem 0.75rem', 
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        backgroundColor: book.stockQuantity > 0 ? '#d1fae5' : '#fee2e2',
                                        color: book.stockQuantity > 0 ? '#065f46' : '#991b1b'
                                    }}>
                                        {book.stockQuantity}
                                    </span>
                                </td>
                                <td>
                                    <button className="admin-btn edit" onClick={() => navigate(`/admin/books/edit/${book.id}`)} title="Edit">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="admin-btn delete" onClick={() => handleDelete(book.id)} title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {books.length === 0 && (
                            <tr>
                                <td colSpan="7" style={{textAlign: 'center', padding: '3rem', color: '#6b7280'}}>No books found. Add one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBooks;
