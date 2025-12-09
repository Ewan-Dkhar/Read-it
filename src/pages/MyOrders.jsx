import React from "react";
import "../styles/MyOrders.css";

const products = [
  {
    id: 1,
    title: "The Silent Patient",
    genre: "Horror",
    price: 499,
    image: "https://m.media-amazon.com/images/I/81JJPDNlxSL.jpg",
  },
  {
    id: 2,
    title: "The Alchemist",
    genre: "Fiction",
    price: 399,
    image: "https://static.wixstatic.com/media/8cc233_da3154cf2cdd4e979a841903fb3cf770~mv2.jpg/v1/fill/w_1585,h_2400,al_c,q_90/The%20Alchemist%20cover.jpg",
  },
  {
    id: 3,
    title: "Psychology of Money",
    genre: "Finance",
    price: 299,
    image: "https://m.media-amazon.com/images/I/71XEsXS5RlL.jpg",
  },
];

function Product() {
  return (
    <div className="product-container">
      <h1 className="heading">Books</h1>

      <div className="product-grid">
        {products.map((book) => (
          <div className="product-card" key={book.id}>
            
            <img src={book.image} alt={book.title} className="product-img" />
            
            <h3 className="product-title">{book.title}</h3>
            <p className="product-genre">{book.genre}</p>
            <p className="product-price">₹{book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
