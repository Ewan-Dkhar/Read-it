import React, { useEffect } from "react";
import "../styles/Cart.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, isLoading, error, updateQuantity, removeFromCart, fetchCart } = useCart();
  const navigate = useNavigate();

  // Explicitly fetch the cart data every time the Cart page is opened
  // to guarantee we have the absolute freshest data from the server.
  useEffect(() => {
    fetchCart();
  }, []);

  const handleIncrease = async (cartItemId, currentQuantity) => {
    try {
      await updateQuantity(cartItemId, currentQuantity + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecrease = async (cartItemId, currentQuantity) => {
    if (currentQuantity <= 1) return;
    try {
      await updateQuantity(cartItemId, currentQuantity - 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading && !cart) {
    return <div className="cart-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh'}}>Loading your cart...</div>;
  }

  if (error && !cart) {
     return <div className="cart-container"><div style={{color: 'red', padding: '20px', background: '#ffebee', borderRadius: '8px'}}>{error}</div></div>;
  }

  // The backend might return an array of items directly, or an object with an items array.
  // We need to handle both cases so it doesn't appear empty unnecessarily.
  const cartItems = [];
  if (cart) {
    if (Array.isArray(cart)) {
      cartItems.push(...cart);
    } else if (Array.isArray(cart.cartItems)) {
      cartItems.push(...cart.cartItems);
    } else if (Array.isArray(cart.items)) {
      cartItems.push(...cart.items);
    }
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice = item.bookPrice ?? 0;
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-heading">My Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-msg">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => {
              const title = item.bookTitle || 'Unknown Title';
              const imageUrl = item.bookImageUrl || "https://m.media-amazon.com/images/I/51AHZGhzZEL._SL500_.jpg";
              // const category = item.bookCategory?.name || item.category || item.categoryName || item.genre || 'Uncategorized';
              const price = item.bookPrice ?? 0;

              return (
                <div className="cart-item" key={item.id}>
                  <img
                    src={imageUrl}
                    alt={title}
                    className="cart-img"
                    style={{objectFit: 'cover'}}
                  />

                  <div className="cart-info">
                    <h3 className="cart-title">{title}</h3>
                    {/* <p className="cart-genre">{category}</p> */}
                    <p className="cart-price">Rs. {price}</p>
                  </div>

                  <div className="cart-actions">
                    <div className="qty-controls">
                      <button
                        onClick={() => handleDecrease(item.id, item.quantity)}
                        className="qty-btn"
                        disabled={isLoading || item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.id, item.quantity)}
                        className="qty-btn"
                        disabled={isLoading}
                      >
                        +
                      </button>
                    </div>
                    <p className="item-total" style={{fontWeight: 'bold'}}>
                      Rs. {price * item.quantity}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="remove-btn"
                      disabled={isLoading}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
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
            <span>Rs. {totalPrice}</span>
          </div>
          <button 
            className="checkout-btn" 
            disabled={cartItems.length === 0 || isLoading}
            onClick={() => navigate('/checkout/cart')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
