import React, { useState } from "react";
import "../styles/Cart.css";

const initialCart = [
  {
    id: 1,
    title: "Rich Dad Poor Dad",
    genre: "Finance",
    price: 499,
    image: "https://m.media-amazon.com/images/I/51AHZGhzZEL._SL500_.jpg",
    quantity: 1,
  },
  {
    id: 2,
    title: "The Subtle Art of Not Giving a F*ck",
    genre: "Self-Help",
    price: 399,
    image:
      "https://imgv2-1-f.scribdassets.com/img/word_document/322011391/original/532491aef0/1?v=1",
    quantity: 1,
  },
  {
    id: 3,
    title: "Ikigai",
    genre: "Self-Help",
    price: 299,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzih2enEwymWHvPbI8O2GR9HBtVl80-lMvWw&s",
    quantity: 1,
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState(initialCart);

  const handleIncrease = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-heading">My Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-msg">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-img"
                />

                <div className="cart-info">
                  <h3 className="cart-title">{item.title}</h3>
                  <p className="cart-genre">{item.genre}</p>
                  <p className="cart-price">₹{item.price}</p>
                </div>

                <div className="cart-actions">
                  <div className="qty-controls">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  <p className="item-total">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h2 className="summary-heading">Order Summary</h2>
          <div className="summary-row">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="summary-row">
            <span>Total Amount</span>
            <span>₹{totalPrice}</span>
          </div>
          <button className="checkout-btn" disabled={cartItems.length === 0}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
