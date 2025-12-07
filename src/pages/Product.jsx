import React from 'react'


const Product = () => {
  return (
   <>
      <style>{`
        .product-page {
          font-family: Arial, sans-serif;
          background: #fff;
          color: #222;
        }
        .main-section {
          display: flex;
          gap: 40px;
          padding: 40px;
        }

        .image-box img {
          width: 260px;
          border-radius: 8px;
          box-shadow: 0px 4px 10px #aaa;
        }

        .details h2 {
          font-size: 28px;
          font-weight: bold;
        }

        .author {
          font-weight: bold;
          margin-top: 8px;
        }

        .lang {
          color: gray;
          margin-bottom: 20px;
        }

        .description {
          line-height: 1.6;
          max-width: 450px;
          margin-bottom: 25px;
        }

        .buttons {
          display: flex;
          gap: 15px;
        }

        .btn-outline {
          padding: 10px 20px;
          border-radius: 25px;
          border: 1px solid #000;
          background: white;
          cursor: pointer;
        }

        .btn-solid {
          padding: 10px 20px;
          border-radius: 25px;
          border: none;
          background: black;
          color: white;
          cursor: pointer;
        }

        .related {
          padding: 40px;
        }

        .related h3 {
          font-size: 20px;
          margin-bottom: 20px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 25px;
        }

        .card {
          text-align: center;
        }

        .card img {
          width: 150px;
          display: block;
          margin: 0 auto;
          border-radius: 6px;
          box-shadow: 0px 4px 10px #aaa;
        }

        .genre {
          color: gray;
          font-size: 14px;
        }

        .price {
          font-weight: bold;
          margin-top: 5px;
        }
      `}</style>

      <div className="product-page">


        <section className="main-section">
          <div className="image-box">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0SupMsyxh84UHuq4Cuo32MClNv0AHylmWzMH91UluruTIMFG1gllqUjrXdYo1-yRRos3X0ckLvro2RGNPCksyMIYDWAJ8JqzBuBCIEQ&s=10" alt="Harry Potter Book" />
          </div>

          <div className="details">
            <h1>Harry Potter And The Cursed Child</h1><br />
            <p className="author">J.K. Rowling</p>
            <p className="lang">English | Spanish</p>

            <p className="description">
              Harry Potter and the Cursed Child is a play written by Jack Thorne from an original story by Thorne, J. K. Rowling, and John Tiffany. T
              he plot occurs nineteen years after the events of Rowling's novel Harry Potter and the Deathly Hallows. 
              It follows Albus Severus Potter, the second son of Harry Potter, who is now Head of the Department of Magical Law Enforcement at the Ministry of Magic. 
              
            </p>

            <div className="buttons">
              <button className="btn-solid">Buy now</button>
              <button className="btn-outline">Add to Cart</button>
            </div>
          </div>
        </section>
        <section className="related">
          <h3>Related products</h3>

          <div className="related-grid">
            {[
              {
                img: "https://i.pinimg.com/736x/eb/65/17/eb6517718b619d7fb1766c7ccd54376f.jpg",
                title: "The Beginning After The End",
                genre: "Fantasy",
                price: "Rs. 399"
              },
              {
                img: "https://m.media-amazon.com/images/I/91+2OXQMXSL._UF1000,1000_QL80_.jpg",
                title: "One Piece - Egg Head Arc",
                genre: "shonen",
                price: "Rs. 449"
              },
              {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5SDk9PZtwIXGQk_Dbf835ZIXK9wGgn8fyjQ&s",
                title: "JoJo's Bizarre Adventure,Steel Ball Run",
                genre: "fantasy and action",
                price: "Rs. 499"
              },
              {
                img: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1704917687i/186074.jpg",
                title: "The Name Of The Wind",
                genre: "Fantasy and horror",
                price: "Rs. 599"
              },
              {
                img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1711665394i/60714999._UX160_.jpg",
                title: "The Serpent And The Wind Night",
                genre: "Fantasy-Romance",
                price: "Rs. 649"
              }
            ].map((book, i) => (
              <div className="card" key={i}>
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
 

  )
}

export default Product