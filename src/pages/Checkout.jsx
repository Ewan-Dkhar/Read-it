import React, { useState } from "react"
import { useParams } from 'react-router-dom'
import '../styles/Checkout.css'

const Checkout = () => {

  const { id } = useParams()  // to get ID from URL

  const [shipping, setShipping] = useState("free")

  const subtotal = 2199
  const shippingCost = shipping === "express" ? 500 : 0
  const taxes = 5
  const total = subtotal + shippingCost + taxes

  return (
    // <div className="checkout-container">
      
    //   {/* SHOW ID (optional) */}
    //   {/* <p className="checkout-id">Order ID: {id}</p> */}

    // </div>
      <div className="checkout-card">

        {/* LEFT SIDE */}
        <div className="checkout-left">

          {/* <div className="checkout-breadcrumb">
            Cart &gt; <span>Shipping</span> &gt; Payment
          </div> */}

          <h1 className="checkout-title">Shipping Address</h1>

          <div className="checkout-row">
            <div className="field-group">
              <label>First Name*</label>
              <input type="text" placeholder="First name" />
            </div>
            <div className="field-group">
              <label>Last Name*</label>
              <input type="text" placeholder="Last name" />
            </div>
          </div>

          <div className="checkout-row">
            <div className="field-group">
              <label>Email*</label>
              <input type="email" placeholder="name@example.com" />
            </div>
            <div className="field-group">
              <label>Phone number*</label>
              <input type="text" placeholder="+91 987654xxxx" />
            </div>
          </div>

          <div className="checkout-row">
            <div className="field-group">
              <label>City*</label>
              <input type="text" placeholder="City" />
            </div>
            <div className="field-group">
              <label>State*</label>
              <input type="text" placeholder="State" />
            </div>
            <div className="field-group">
              <label>Zip Code*</label>
              <input type="text" placeholder="560021" />
            </div>
          </div>

          <div className="field-group">
            <label>Description</label>
            <textarea rows="3" placeholder="Enter a description / landmark" />
          </div>

          {/* SHIPPING */}
          <h2 className="section-heading">Shipping Method</h2>

          <div className="shipping-box">

            <div
              className={shipping === "free" ? "shipping-option active" : "shipping-option"}
              onClick={() => setShipping("free")}
            >
              <div>
                <div className="shipping-title">Free Shipping</div>
                <div className="shipping-sub">5–7 Days</div>
              </div>
              <div className="shipping-price">₹0</div>
            </div>

            <div
              className={shipping === "express" ? "shipping-option active" : "shipping-option"}
              onClick={() => setShipping("express")}
            >
              <div>
                <div className="shipping-title">Express Shipping</div>
                <div className="shipping-sub">1–2 Days</div>
              </div>
              <div className="shipping-price">₹500</div>
            </div>

            <p className="shipping-result">
              Selected Shipping Cost: <b>₹{shippingCost}</b>
            </p>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">

          <h2 className="cart-title">Your Cart</h2>

          <div className="cart-item">
            <img src="/images/Atomic_habit.jpg" />
            <div className="cart-info">
              <div className="cart-badge">1</div>
              <div className="cart-name">Atomic Habits</div>
              <div className="cart-sub">James Clear</div>
            </div>
            <div className="cart-price">₹999.00</div>
          </div>

          <div className="cart-item">
            <img src="/images/The_silent_patient.png" alt="Book 2" />
            <div className="cart-info">
              <div className="cart-badge">1</div>
              <div className="cart-name">The Silent Patient</div>
              <div className="cart-sub">Alex Michaelides</div>
            </div>
            <div className="cart-price">₹1200.00</div>
          </div>

          <div className="discount-row">
            <input type="text" placeholder="Discount code" />
            <button type="button">Apply</button>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>₹{shippingCost}</span>
          </div>

          <div className="summary-row">
            <span>Estimated taxes</span>
            <span>₹{taxes}</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="pay-btn">Continue to Payment</button>

        </div>
      </div>
  )
}

export default Checkout
