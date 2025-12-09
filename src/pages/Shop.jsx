import React, { useState, useMemo } from "react";
import "../styles/Shop.css";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const BOOKS = [
    {
      id: 1,
      title: "Harry Potter And The Cursed Child",
      author: "J.K. Rowling",
      languages: ["English", "Spanish"],
      genre: "Fiction",
      price: 500,
      cover:
        "https://productimages.worldofbooks.com/0751565369.jpg",
      deliveryDate: "Thursday 12th, 2025",
    },
    {
      id: 2,
      title: "Harry Potter And The Chamber Of Secrets",
      author: "J.K. Rowling",
      languages: ["English"],
      genre: "Fiction",
      price: 750,
      cover:
        "https://booksy.lk/wp-content/uploads/2021/08/Harry-Potter-and-the-Chamber-of-Secrets-1-600x916.jpg",
      deliveryDate: "Thursday 13th, 2025",
    },
    {
      id: 3,
      title: "Harry Potter And The Prisoner Of Azkaban",
      author: "J.K. Rowling",
      languages: ["English"],
      genre: "Fiction",
      price: 200,
      cover:
        "https://booksy.lk/wp-content/uploads/2021/08/Harry-Potter-and-the-Prisoner-of-Azkaban-1-600x928.jpg",
      deliveryDate: "Thursday 13th, 2025",
    },
  ];

  const GENRES = ["Fiction", "Horror", "Romcom"];
  const LANGUAGES = ["English", "French", "Spanish"];

  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState(["Fiction"]);
  const [selectedLanguages, setSelectedLanguages] = useState(["English"]);
  const [maxPrice, setMaxPrice] = useState(900);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const toggleLanguage = (lang) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      const matchesSearch =
        search === "" ||
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());

      const matchesGenre =
        selectedGenres.length === 0 || selectedGenres.includes(book.genre);

      const matchesLanguage =
        selectedLanguages.length === 0 ||
        book.languages.some((l) => selectedLanguages.includes(l));

      const matchesPrice = book.price <= maxPrice;

      return matchesSearch && matchesGenre && matchesLanguage && matchesPrice;
    });
  }, [search, selectedGenres, selectedLanguages, maxPrice]);

  const navigate = useNavigate()

  return (
    <div className="shop-page">

      <h1 className="shop-title">Shop</h1>

      {/* MAIN LAYOUT */}
      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="filter-group">
            <h3>Genre</h3>
            {GENRES.map((g) => (
              <label key={g} className="option">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(g)}
                  onChange={() => toggleGenre(g)}
                />
                {g}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>Price</h3>
            <div className="price-range-labels">
              <span>Rs. 200</span>
              <span>Rs. 900</span>
            </div>

            <input
              type="range"
              min="200"
              max="900"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-range"
            />

            <p className="price-value">Up to Rs. {maxPrice}</p>
          </div>

          <div className="filter-group">
            <h3>Language</h3>
            {LANGUAGES.map((lang) => (
              <label key={lang} className="option">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(lang)}
                  onChange={() => toggleLanguage(lang)}
                />
                {lang}
              </label>
            ))}
          </div>
        </aside>

        {/* PRODUCTS */}
        <section className="products">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card" onClick={() => {navigate(`/product/${book.id}`)}}>
              <img src={book.cover} alt={book.title} className="book-cover" />

              <div className="book-info">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">{book.author}</p>
                <p className="book-langs">{book.languages.join(" | ")}</p>
                <p className="book-price">Rs. {book.price}</p>
                <p className="book-delivery">
                  Free delivery on <strong>{book.deliveryDate}</strong>
                </p>
                <button className="add-btn">Add to Cart</button>
              </div>
            </div>
          ))}

          {filteredBooks.length === 0 && (
            <p className="no-results">No books match your filters.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Shop;