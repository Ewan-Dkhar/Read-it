import React, { useEffect, useState } from "react";
import "../styles/Product.css";
import { useNavigate, useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams()
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

  const navigate = useNavigate()

  return (
    <>
      <div className="product-page">
        <section className="main-section">
          <div className="image-box">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0SupMsyxh84UHuq4Cuo32MClNv0AHylmWzMH91UluruTIMFG1gllqUjrXdYo1-yRRos3X0ckLvro2RGNPCksyMIYDWAJ8JqzBuBCIEQ&s=10"
              alt="Harry Potter Book"
            />
          </div>

          <div className="details">
            <h1>Harry Potter And The Cursed Child</h1>
            <br />
            <p className="author">J.K. Rowling</p>
            <p className="lang">English | Spanish</p>

            <p className="description">
              Harry Potter and the Cursed Child is a play written by Jack Thorne
              from an original story by Thorne, J. K. Rowling, and John Tiffany.
              T he plot occurs nineteen years after the events of Rowling's
              novel Harry Potter and the Deathly Hallows. It follows Albus
              Severus Potter, the second son of Harry Potter, who is now Head of
              the Department of Magical Law Enforcement at the Ministry of
              Magic.
            </p>

            <div className="buttons">
              <button className="btn-solid" onClick={() => {navigate(`/checkout/${id}`)}}>Buy now</button>
              <button className="btn-outline">Add to Cart</button>
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
