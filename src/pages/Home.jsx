import React, { useState } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const images = [
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    "https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/4581325/pexels-photo-4581325.jpeg"
  ];

  const navigate = useNavigate()

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

        
        <section className="popular-books">
          <h1 className="header">Popular Books</h1>

          <div className="book-grid">
            {/* BOOK 1 */}
            <div className="book-card" onClick={() => {navigate(`/product/1`)}}>
              <img
                src="https://emedicodiary.com/images/books/64cc1fc52646aa176937d4ae350e11fa.jpg"
                className="b1"
                alt="The Silent Patient"
              />
              <div>
                <h3>The Silent Patient</h3>
                <p className="genre">Horror</p>
                <p className="desc">
                  The night comfort in the stillness of the late hours...
                </p>
                <p className="price">Rs. 499</p>

                <button onClick={() => {navigate(`/checkout/1`)}}>Buy Now</button>
                <button className="secondary">Add to Cart</button>
              </div>
            </div>

            {/* BOOK 2 */}
            <div className="book-card" onClick={() => {navigate(`/product/1`)}}>
              <img src="https://m.media-amazon.com/images/I/81wgcld4wxL.jpg" />
              <div>
                <h3>Atomic Habits</h3>
                <p className="genre">Self Help</p>
                <p className="desc">
                  Consistent changes lead to big improvements...
                </p>
                <p className="price">Rs. 599</p>

                <button onClick={() => {navigate(`/checkout/1`)}}>Buy Now</button>
                <button className="secondary">Add to Cart</button>
              </div>
            </div>

            {/* BOOK 3 */}
            <div className="book-card" onClick={() => {navigate(`/product/1`)}}>
              <img
                src="https://covers.shakespeareandcompany.com/97805527/9780552779739.jpg"
                className="b3"
                alt="The Book Thief"
              />
              <div>
                <h3>The Book Thief</h3>
                <p className="genre">Historical</p>
                <p className="desc">
                  Follows Liesel, a young girl in Nazi Germany...
                </p>
                <p className="price">Rs. 449</p>

                <button onClick={() => {navigate(`/checkout/1`)}}>Buy Now</button>
                <button className="secondary">Add to Cart</button>
              </div>
            </div>

            {/* BOOK 4 */}
            <div className="book-card" onClick={() => {navigate(`/product/1`)}}>
              <img
                src="https://m.media-amazon.com/images/I/91OINeHnJGL._AC_UF1000,1000_QL80_.jpg"
                className="b4"
                alt="Harry Potter"
              />
              <div>
                <h3>Harry Potter</h3>
                <p className="genre">Horror</p>
                <p className="desc">Harry discovers the magical world...</p>
                <p className="price">Rs. 399</p>

                <button onClick={() => {navigate(`/checkout/1`)}}>Buy Now</button>
                <button className="secondary">Add to Cart</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;