import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import '../App.css'

function Checkout() {
  const navigate = useNavigate()

  const [cart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('shopora-cart')) || []
    } catch {
      return []
    }
  })

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  })

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')
  const [error, setError] = useState('')
  const [placedOrder, setPlacedOrder] = useState(null)

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 50
  const total = subtotal + shipping

  const handleChange = (event) => {
    const { name, value } = event.target

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (cart.length === 0) {
      setError('Your cart is empty. Add a product before checkout.')
      return
    }

    if (
      !customer.name.trim() ||
      !customer.email.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim() ||
      !customer.city.trim() ||
      !customer.postalCode.trim()
    ) {
      setError('Please complete all delivery details.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!/^[0-9+\-\s()]{7,15}$/.test(customer.phone)) {
      setError('Please enter a valid phone number.')
      return
    }

    const order = {
      orderId: `SH-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customer,
      items: cart,
      paymentMethod,
      subtotal,
      shipping,
      total,
      status: 'Confirmed',
    }

    try {
      const previousOrders = JSON.parse(
        localStorage.getItem('shopora-orders') || '[]'
      )

      localStorage.setItem(
        'shopora-orders',
        JSON.stringify([order, ...previousOrders])
      )

      localStorage.setItem('shopora-cart', '[]')
      setPlacedOrder(order)
    } catch {
      setError('Could not save your order. Please try again.')
    }
  }

  if (placedOrder) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <div className="checkout-success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for shopping with Shopora.</p>

          <div className="checkout-order-number">
            <span>Order number</span>
            <strong>{placedOrder.orderId}</strong>
          </div>

          <p>
            <strong>Total:</strong>{' '}
            ₹{placedOrder.total.toLocaleString('en-IN')}
          </p>
          <p>
            <strong>Payment:</strong> {placedOrder.paymentMethod}
          </p>

          <p className="checkout-demo-note">
            Demo checkout only. No real payment was taken.
          </p>

          <div className="checkout-success-actions">
            <Link to="/orders" className="checkout-submit">
              View My Orders
            </Link>
            <Link to="/products" className="checkout-back-link">
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    )
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <h1>Your cart is empty</h1>
          <p>Add some products before proceeding to checkout.</p>
          <Link to="/products" className="checkout-submit">
            Browse Products
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="checkout-heading">
        <h1>Checkout</h1>
        <p>Enter your details to complete your order.</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="checkout-section">
            <h2>Delivery Information</h2>

            <label htmlFor="customer-name">Full Name</label>
            <input
              id="customer-name"
              name="name"
              value={customer.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />

            <label htmlFor="customer-email">Email Address</label>
            <input
              id="customer-email"
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <label htmlFor="customer-phone">Phone Number</label>
            <input
              id="customer-phone"
              type="tel"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              autoComplete="tel"
              required
            />

            <label htmlFor="customer-address">Street Address</label>
            <textarea
              id="customer-address"
              name="address"
              value={customer.address}
              onChange={handleChange}
              placeholder="House number, street, area"
              autoComplete="street-address"
              rows={3}
              required
            />

            <div className="checkout-field-row">
              <div>
                <label htmlFor="customer-city">City</label>
                <input
                  id="customer-city"
                  name="city"
                  value={customer.city}
                  onChange={handleChange}
                  placeholder="City"
                  autoComplete="address-level2"
                  required
                />
              </div>

              <div>
                <label htmlFor="customer-postal">Postal Code</label>
                <input
                  id="customer-postal"
                  name="postalCode"
                  value={customer.postalCode}
                  onChange={handleChange}
                  placeholder="Postal code"
                  autoComplete="postal-code"
                  required
                />
              </div>
            </div>
          </section>

          <section className="checkout-section">
            <h2>Payment Method</h2>

            <label className="checkout-payment-option">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={(event) => setPaymentMethod(event.target.value)}
              />
              Cash on Delivery
            </label>

            <label className="checkout-payment-option">
              <input
                type="radio"
                name="payment"
                value="Demo Online Payment"
                checked={paymentMethod === 'Demo Online Payment'}
                onChange={(event) => setPaymentMethod(event.target.value)}
              />
              Demo Online Payment
            </label>

            {paymentMethod === 'Demo Online Payment' && (
              <p className="checkout-demo-note">
                This is a demonstration only. No card details or real
                payments are processed.
              </p>
            )}
          </section>

          {error && (
            <p className="checkout-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="checkout-submit">
            Place Order · ₹{total.toLocaleString('en-IN')}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              className="checkout-summary-item"
              key={`${item.id}-${item.variant}`}
            >
              <img src={item.image} alt={item.name} />

              <div>
                <p>{item.name}</p>
                <span>
                  {item.variant} · Qty {item.quantity}
                </span>
              </div>

              <strong>
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </strong>
            </div>
          ))}

          <div className="checkout-total-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="checkout-total-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
          </div>

          <div className="checkout-total-row checkout-grand-total">
            <span>Total</span>
            <strong>₹{total.toLocaleString('en-IN')}</strong>
          </div>

          <Link to="/cart" className="checkout-back-link">
            ← Return to Cart
          </Link>
        </aside>
      </div>
    </main>
  )
}

export default Checkout