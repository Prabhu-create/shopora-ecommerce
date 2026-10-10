
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import '../App.css'

function readCart() {
  try {
    return JSON.parse(localStorage.getItem('shopora-cart') || '[]')
  } catch {
    return []
  }
}

function Cart() {
  const [cart, setCart] = useState(readCart)
  const [coupon, setCoupon] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(false)
  const [couponMessage, setCouponMessage] = useState('')

  useEffect(() => {
    localStorage.setItem('shopora-cart', JSON.stringify(cart))
  }, [cart])

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const discount = appliedCoupon ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - discount

  function updateQuantity(id, variant, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id && item.variant === variant
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + change),
              }
            : item
        )
    )
  }

  function removeItem(id, variant) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => !(item.id === id && item.variant === variant)
      )
    )
  }

  function applyCoupon(event) {
    event.preventDefault()

    if (coupon.trim().toUpperCase() === 'SHOPORA10') {
      setAppliedCoupon(true)
      setCouponMessage('10% discount applied!')
    } else {
      setAppliedCoupon(false)
      setCouponMessage('Invalid coupon. Try SHOPORA10.')
    }
  }

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛍️</div>
          <h1>Your cart is empty</h1>
          <p>Looks like you haven't added anything yet.</p>
          <Link className="cart-primary-btn" to="/products">
            Explore Products
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <p className="eyebrow">YOUR SHOPPING BAG</p>
        <h1>Shopping Cart</h1>
        <p>{cart.length} item type(s) in your cart</p>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cart.map((item) => (
            <article
              className="cart-product"
              key={`${item.id}-${item.variant || ''}`}
            >
              <Link to={`/products/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>

              <div className="cart-product-info">
                <Link
                  className="cart-product-name"
                  to={`/products/${item.id}`}
                >
                  {item.name}
                </Link>

                {item.variant && (
                  <p className="cart-variant">
                    Option: {item.variant}
                  </p>
                )}

                <p className="cart-unit-price">
                  ₹{item.price.toLocaleString('en-IN')} each
                </p>

                <div className="cart-quantity">
                  <button
                    aria-label={`Decrease ${item.name} quantity`}
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      updateQuantity(item.id, item.variant, -1)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() =>
                      updateQuantity(item.id, item.variant, 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-product-end">
                <strong>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </strong>

                <button
                  className="cart-remove"
                  onClick={() => removeItem(item.id, item.variant)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}

          <Link className="cart-continue" to="/products">
            ← Continue Shopping
          </Link>
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>

          <form className="cart-coupon" onSubmit={applyCoupon}>
            <label htmlFor="coupon">Discount coupon</label>

            <div>
              <input
                id="coupon"
                value={coupon}
                onChange={(event) => setCoupon(event.target.value)}
                placeholder="Enter coupon code"
              />

              <button type="submit">Apply</button>
            </div>

            {couponMessage && (
              <p className={appliedCoupon ? 'coupon-success' : 'coupon-error'}>
                {couponMessage}
              </p>
            )}
          </form>

          <div className="cart-summary-row">
            <span>Discount</span>
            <span>-₹{discount.toLocaleString('en-IN')}</span>
          </div>

          <div className="cart-summary-total">
            <span>Total</span>
            <strong>₹{total.toLocaleString('en-IN')}</strong>
          </div>

          <Link className="cart-primary-btn" to="/checkout">
            Proceed to Checkout
          </Link>

          <p className="cart-demo-note">
            Demo coupon: SHOPORA10 gives 10% off your subtotal.
          </p>
        </aside>
      </div>
    </main>
  )
}

export default Cart