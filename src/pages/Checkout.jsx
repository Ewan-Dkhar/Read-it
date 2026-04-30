import React, { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import '../styles/Checkout.css'
import api from '../api/api'
import { useCart } from '../context/CartContext'

const Checkout = () => {

  const { id } = useParams()  // 'cart' for cart checkout, or book ID for direct checkout
  const location = useLocation()
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()

  const queryParams = new URLSearchParams(location.search)
  const quantity = parseInt(queryParams.get('quantity')) || 1

  const [shipping, setShipping] = useState("free")
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    country: 'India'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const [checkoutItems, setCheckoutItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    const fetchDirectBook = async (bookId) => {
      try {
        const response = await api.get(`/books/${bookId}`)
        const book = response.data.data
        const price = book.price || 0
        setCheckoutItems([{
           id: book.id,
           title: book.title,
           author: book.author,
           imageUrl: book.imageUrl,
           price: price,
           quantity: quantity
        }])
        setSubtotal(price * quantity)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load book details for checkout')
      }
    }
  
    if (id === 'cart') {
      console.log(cart)
       if (cart && cart.length > 0) {
          const items = cart.map(item => ({
             id: item.bookId,
             title: item.bookTitle,
            //  author: item.bookAuthor,
             imageUrl: item.bookImageUrl,
             price: item.bookPrice,
             quantity: item.quantity
          }))
          setCheckoutItems(items)
          const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          setSubtotal(total)
          setError(null)
       } else {
         setError('Your cart is empty.')
       }
    } else if (id) {
       fetchDirectBook(id)
    }
  }, [id, cart, quantity])

  const shippingCost = shipping === "express" ? 500 : 0
  const taxes = subtotal * 0.05 // 5% tax flat
  const total = subtotal + shippingCost + taxes

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
       const orderData = {
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`,
          totalAmount: total,
          // Backend expects an order to be generated. For a direct purchase, we pass items. For Cart, we just hit a checkout endpoint Usually.
          // This requires mapping to the backend's OrderRequestDTO.
          items: checkoutItems.map(item => ({
             bookId: item.id,
             quantity: item.quantity,
             price: item.price
          }))
       }

       await api.post('/orders', orderData)
       
       if (id === 'cart') {
          // If we checked out from cart, we might want to clear the cart endpoint or context
          await api.delete('/cart/clear').catch(() => {}) // Assuming there's a clear endpoint
          clearCart()
       }

       alert('Order placed successfully!')
       navigate('/account/orders')

    } catch (err) {
       setError(err.response?.data?.message || 'Failed to place order. Please try again.')
    } finally {
       setIsSubmitting(false)
    }
  }

  return (
    <div className="checkout-card">
      <form onSubmit={handleSubmitOrder} className="checkout-left">
        <h1 className="checkout-title">Shipping Address</h1>
        
        {error && <div style={{color: 'red', padding: '10px', background: '#ffebee', marginBottom: '15px'}}>{error}</div>}

        <div className="checkout-row">
          <div className="field-group">
             <label>Full Address*</label>
             <input type="text" name="address" required value={formData.address} onChange={handleInputChange} placeholder="123 Main St" />
          </div>
          <div className="field-group">
            <label>Phone number*</label>
            <input type="text" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+91 987654xxxx" />
          </div>
        </div>

        <div className="checkout-row">
          <div className="field-group">
            <label>City*</label>
            <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="City" />
          </div>
          <div className="field-group">
            <label>State*</label>
            <input type="text" name="state" required value={formData.state} onChange={handleInputChange} placeholder="State" />
          </div>
          <div className="field-group">
            <label>Zip Code*</label>
            <input type="text" name="zipCode" required value={formData.zipCode} onChange={handleInputChange} placeholder="560021" />
          </div>
        </div>

        <h2 className="section-heading">Shipping Method</h2>
        <div className="shipping-box">
          <div className={shipping === "free" ? "shipping-option active" : "shipping-option"} onClick={() => setShipping("free")}>
            <div>
              <div className="shipping-title">Standard Shipping</div>
              <div className="shipping-sub">5–7 Days</div>
            </div>
            <div className="shipping-price">Rs. 0</div>
          </div>
          <div className={shipping === "express" ? "shipping-option active" : "shipping-option"} onClick={() => setShipping("express")}>
            <div>
              <div className="shipping-title">Express Shipping</div>
              <div className="shipping-sub">1–2 Days</div>
            </div>
            <div className="shipping-price">Rs. 500</div>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting || checkoutItems.length === 0} style={{marginTop: '20px', padding: '15px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%', fontSize: '16px', fontWeight: 'bold'}}>
          {isSubmitting ? 'Processing...' : 'Place Order securely'}
        </button>
      </form>

      <div className="checkout-right">
        <h2 className="cart-title">Your Item{checkoutItems.length > 1 ? 's' : ''}</h2>
        
        {checkoutItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.imageUrl || "https://m.media-amazon.com/images/I/51AHZGhzZEL._SL500_.jpg"} alt={item.title} />
            <div className="cart-info">
              <div className="cart-badge">{item.quantity}</div>
              <div className="cart-name">{item.title}</div>
              <div className="cart-sub">{item.author || "Unknown"}</div>
            </div>
            <div className="cart-price">Rs. {item.price * item.quantity}</div>
          </div>
        ))}

        <div className="summary-row" style={{marginTop: '20px'}}>
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Rs. {shippingCost.toFixed(2)}</span>
        </div>
        <div className="summary-row border-t-2" style={{borderTop: '1px solid #eee', paddingTop: '10px', marginTop: '10px'}}>
          <span>Taxes</span>
          <span>Rs. {taxes.toFixed(2)}</span>
        </div>
        <div className="summary-row summary-total border-t-2" style={{borderTop: '2px solid #ccc', paddingTop: '15px', marginTop: '10px', fontWeight: 'bold', fontSize: '1.2rem', color: '#111'}}>
          <span>Total</span>
          <span>Rs. {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default Checkout
