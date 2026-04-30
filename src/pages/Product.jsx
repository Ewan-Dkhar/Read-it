import React, { useEffect, useState } from "react";
import "../styles/Product.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { useCart } from "../context/CartContext";

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [relatedBooks, setRelatedBooks] = useState([
    {
      img: "https://i.pinimg.com/736x/eb/65/17/eb6517718b619d7fb1766c7ccd54376f.jpg",
      title: "The Beginning After The End",
      genre: "Fantasy and Action",
      price: "Rs. 399",
    },
    {
      img: "https://m.media-amazon.com/images/I/91+2OXQMXSL._UF1000,1000_QL80_.jpg",
      title: "One Piece - Egg Head Arc",
      genre: "Shonen",
      price: "Rs. 449",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5SDk9PZtwIXGQk_Dbf835ZIXK9wGgn8fyjQ&s",
      title: "JoJo's Bizarre Adventure,Steel Ball Run",
      genre: "Bizarre",
      price: "Rs. 499",
    },
    {
      img: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1704917687i/186074.jpg",
      title: "The Name Of The Wind",
      genre: "Fantasy and horror",
      price: "Rs. 599",
    },
    {
      img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1711665394i/60714999._UX160_.jpg",
      title: "The Serpent And The Wind Night",
      genre: "Fantasy-Romance",
      price: "Rs. 649",
    },
  ]);

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load book details.');
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchBook();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(id, quantity);
      alert('Added to cart successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (isLoading) {
    return <div className="product-page" style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading book details...</div>;
  }

  if (error || !book) {
    return (
      <div className="product-page" style={{minHeight: '80vh', padding: '40px'}}>
        <div style={{background: '#fef2f2', color: '#b91c1c', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #ef4444'}}>
          {error || 'Book not found.'}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="product-page">
        <section className="main-section">
          <div className="image-box">
            <img
              src={book.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0SupMsyxh84UHuq4Cuo32MClNv0AHylmWzMH91UluruTIMFG1gllqUjrXdYo1-yRRos3X0ckLvro2RGNPCksyMIYDWAJ8JqzBuBCIEQ&s=10"}
              alt={book.title}
            />
          </div>

          <div className="details">
            <h1>{book.title}</h1>
            <br />
            <p className="author">{book.author || 'Unknown Author'}</p>
            <p className="lang">{book.category?.name || 'Uncategorized'}</p>

            <p className="description">
              {book.description || 'No description available for this book.'}
            </p>
            
            <p style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '20px 0'}}>Rs. {book.price}</p>

            <div style={{marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
               <label htmlFor="quantity">Quantity:</label>
               <input 
                  type="number" 
                  id="quantity" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{padding: '5px', width: '60px', borderRadius: '4px', border: '1px solid #ccc'}}
                  min="1"
               />
            </div>

            <div className="buttons">
              <button className="btn-solid" onClick={() => navigate(`/checkout/${id}?quantity=${quantity}`)}>Buy now</button>
              <button className="btn-outline" onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </section>
        <section className="related">
          <h3>Related products</h3>

          <div className="related-grid">
            {relatedBooks.map((book, i) => (
              <div className="product-card" key={i} onClick={() => {navigate(`/product/${i}`)}}>
                <img src={book.img} alt={book.title} />
                <h4 style={{ marginTop: "12px" }}>{book.title}</h4>
                <p className="genre">{book.genre}</p>
                <p className="price">{book.price}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Product;
