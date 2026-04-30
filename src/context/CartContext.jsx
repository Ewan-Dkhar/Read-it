import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/cart');
      setCart(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cart');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (bookId, quantity = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/cart', { bookId, quantity });
      setCart(response.data.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add item to cart';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.put(`/cart/${cartItemId}`, { quantity });
      setCart(response.data.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update quantity';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (cartItemId) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/cart/${cartItemId}`);
      await fetchCart(); // Re-fetch full cart after deletion
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to remove item from cart';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setCart(null);
  }

  return (
    <CartContext.Provider value={{
      cart,
      isLoading,
      error,
      fetchCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
