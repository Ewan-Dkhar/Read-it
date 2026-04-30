import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

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
            <h2>Manage Books</h2>
            <button className="admin-btn add" style={{marginTop: '20px'}} onClick={() => navigate('/admin/books/add')}>
                + Add New Book
            </button>
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
                            <td><img src={book.imageUrl} alt="cover" width="40" height="60" style={{objectFit: 'cover'}}/></td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>Rs. {book.price}</td>
                            <td>{book.stockQuantity}</td>
                            <td>
                                <button className="admin-btn edit" onClick={() => navigate(`/admin/books/edit/${book.id}`)}>Edit</button>
                                <button className="admin-btn delete" onClick={() => handleDelete(book.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBooks;