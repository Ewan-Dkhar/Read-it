import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import api from '../api/api';
import { useCart } from '../context/CartContext';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const images = [
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    "https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/4581325/pexels-photo-4581325.jpeg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [categoriesRes, booksRes] = await Promise.all([
          api.get('/categories'),
          api.get('/books?page=0&size=10')
        ]);
        setCategories(categoriesRes.data.data || []);
        // Pageable response format often has content inside
        setBooks(booksRes.data.data?.content || booksRes.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load home page data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleAddToCart = async (e, bookId) => {
    e.stopPropagation(); // prevent navigating to product
    try {
      await addToCart(bookId, 1);
      alert('Added to cart!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (isLoading) {
    return <main><div className="flex h-[80vh] items-center justify-center">Loading books...</div></main>;
  }

  if (error) {
    return (
      <main>
        <div className="auth-error" style={{maxWidth: '600px', margin: '40px auto'}}>
           {error}
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="divider"></div>

      <div className="homecont">
        <section className="carousel-container">
          <button className="arrow left" onClick={prevSlide}>
            &#10094;
          </button>
          <img
            src={images[currentIndex]}
            className="carousel-img"
            alt="carousel"
          />
          <button className="arrow right" onClick={nextSlide}>
            &#10095;
          </button>
        </section>

        {/* <section className="categories-section" style={{marginBottom: '2rem'}}>
           <h2 className="header" style={{textAlign: 'center', marginBottom: '1rem'}}>Categories</h2>
           <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center'}}>
             {categories.map(cat => (
                <div 
                   key={cat.id} 
                   onClick={() => navigate(`/shop?category=${cat.id}`)}
                   style={{
                     padding: '1rem 2rem', background: '#f3f4f6', 
                     borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
                   }}
                >
                  {cat.name}
                </div>
             ))}
           </div>
        </section> */}
        
        <section className="popular-books">
          <h1 className="header">Popular Books</h1>

          <div className="book-grid">
            {books.map(book => (
              <div className="book-card" key={book.id} onClick={() => navigate(`/product/${book.id}`)}>
                <img
                  src={book.imageUrl || "https://emedicodiary.com/images/books/64cc1fc52646aa176937d4ae350e11fa.jpg"}
                  alt={book.title}
                />
                <div>
                  <h3>{book.title}</h3>
                  <p className="genre">{book.category?.name || 'Uncategorized'}</p>
                  <p className="desc" style={{
                      display: '-webkit-box', WebkitLineClamp: 2, 
                      WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {book.description || 'No description available.'}
                  </p>
                  <p className="price">Rs. {book.price}</p>

                  <button onClick={(e) => { 
                    e.stopPropagation(); 
                    navigate(`/checkout/${book.id}`);
                  }}>
                    Buy Now
                  </button>
                  <button className="secondary" onClick={(e) => handleAddToCart(e, book.id)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
            
            {books.length === 0 && <p style={{textAlign: 'center', gridColumn: '1 / -1'}}>No books found.</p>}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;