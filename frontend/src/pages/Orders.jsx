import { useState } from 'react'
import { Link } from 'react-router'
import '../App.css'

function Orders() {
  const [orders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('shopora-orders')) || []
    } catch {
      return []
    }
  })

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString('en-IN')}`

  const formatDate = (date) => {
    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Date unavailable'
    }

    return parsedDate.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <main className="orders-page">
      <div className="orders-heading">
        <h1>My Orders</h1>
        <p>Track and review your Shopora purchases.</p>
      </div>

      {orders.length === 0 ? (
        <section className="orders-empty">
          <div className="orders-empty-icon">📦</div>
          <h2>No orders yet</h2>
          <p>
            Your purchases will appear here after you place an order.
          </p>
          <Link to="/products" className="orders-shop-btn">
            Start Shopping
          </Link>
        </section>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.orderId}>
              <div className="order-card-header">
                <div>
                  <span className="order-label">Order number</span>
                  <strong>{order.orderId}</strong>
                </div>

                <span className="order-status">
                  {order.status || 'Confirmed'}
                </span>
              </div>

              <div className="order-meta">
                <div>
                  <span className="order-label">Order date</span>
                  <p>{formatDate(order.createdAt)}</p>
                </div>

                <div>
                  <span className="order-label">Payment method</span>
                  <p>{order.paymentMethod || 'Not specified'}</p>
                </div>

                <div>
                  <span className="order-label">Items</span>
                  <p>
                    {(order.items || []).reduce(
                      (sum, item) => sum + Number(item.quantity || 0),
                      0
                    )}{' '}
                    item(s)
                  </p>
                </div>
              </div>

              <div className="order-items">
                {(order.items || []).map((item, index) => (
                  <div
                    className="order-item"
                    key={`${order.orderId}-${item.id}-${item.variant}-${index}`}
                  >
                    <img src={item.image} alt={item.name} />

                    <div className="order-item-info">
                      <strong>{item.name}</strong>
                      <span>Variant: {item.variant || 'Standard'}</span>
                      <span>Quantity: {item.quantity}</span>
                    </div>

                    <strong className="order-item-price">
                      {formatPrice(
                        Number(item.price) * Number(item.quantity)
                      )}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="order-card-footer">
                <span>Total paid / payable</span>
                <strong>{formatPrice(order.total)}</strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

export default Orders