import { useMemo, useState } from 'react'
import '../App.css'

const products = [
{
id: 1,
name: 'Wireless Bluetooth Headphones',
category: 'Electronics',
price: 1499,
oldPrice: 2499,
rating: 4.5,
image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
},
{
id: 2,
name: 'Smart Watch with Fitness Tracker',
category: 'Electronics',
price: 1999,
oldPrice: 3499,
rating: 4.2,
image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
},
{
id: 3,
name: 'Everyday Casual Sneakers',
category: 'Fashion',
price: 1299,
oldPrice: 1999,
rating: 4.3,
image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
},
{
id: 4,
name: 'Portable Wireless Speaker',
category: 'Electronics',
price: 999,
oldPrice: 1599,
rating: 4.1,
image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
},
{
id: 5,
name: 'Classic Travel Backpack',
category: 'Fashion',
price: 899,
oldPrice: 1499,
rating: 4.4,
image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
},
{
id: 6,
name: 'Stainless Steel Water Bottle',
category: 'Home',
price: 399,
oldPrice: 699,
rating: 4.0,
image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
},
{
id: 7,
name: 'Premium Skincare Set',
category: 'Beauty',
price: 799,
oldPrice: 1199,
rating: 4.2,
image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
},
{
id: 8,
name: 'Minimal Desk Lamp',
category: 'Home',
price: 699,
oldPrice: 999,
rating: 4.3,
image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
},
]


const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty']

function Home() {
const [search, setSearch] = useState('')
const [category, setCategory] = useState('All')
const [cart, setCart] = useState([])
const [cartOpen, setCartOpen] = useState(false)
const [selectedProduct, setSelectedProduct] = useState(null)
const [showCheckout, setShowCheckout] = useState(false)
const [orderPlaced, setOrderPlaced] = useState(false)

const filteredProducts = useMemo(() => {
return products.filter((product) => {
const matchesCategory =
category === 'All' || product.category === category
const matchesSearch = product.name
.toLowerCase()
.includes(search.toLowerCase())
return matchesCategory && matchesSearch
})
}, [search, category])

const addToCart = (product) => {
setCart((current) => {
const existing = current.find((item) => item.id === product.id)
if (existing) {
return current.map((item) =>
item.id === product.id
? { ...item, quantity: item.quantity + 1 }
: item
)
}
return [...current, { ...product, quantity: 1 }]
})
}

const changeQuantity = (id, amount) => {
setCart((current) =>
current
.map((item) =>
item.id === id
? { ...item, quantity: item.quantity + amount }
: item
)
.filter((item) => item.quantity > 0)
)
}

const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
const subtotal = cart.reduce(
(total, item) => total + item.price * item.quantity,
0
)

return ( <div className="app"> <header className="top-header"> <a className="brand" href="#" aria-label="Shopora home">
shopora<span>.</span> </a>


    <div className="delivery">
      <span className="delivery-icon">⌖</span>
      <span><small>Deliver to</small><strong>India</strong></span>
    </div>

    <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
      <select
        aria-label="Product category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        {categories.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      <input
        aria-label="Search products"
        placeholder="Search Shopora..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button aria-label="Search" type="submit">⌕</button>
    </form>

    <button className="header-link account-link">
      <small>Hello, welcome</small>
      <strong>Your Account</strong>
    </button>

    <button className="header-link orders-link">
      <small>Returns</small>
      <strong>& Orders</strong>
    </button>

    <button className="cart-button" onClick={() => setCartOpen(!cartOpen)}>
      <span className="cart-icon">🛒</span>
      <span>Cart <b>{cartCount}</b></span>
    </button>
  </header>

  <nav className="category-nav">
    <span className="nav-menu">☰ All</span>
    <a href="#products">Today's Deals</a>
    <a href="#products">Best Sellers</a>
    <a href="#products">New Arrivals</a>
    <a href="#products">Customer Service</a>
    <span className="nav-promo">Great deals. Every day.</span>
  </nav>

  <main>
    <section className="hero">
      <div className="hero-copy">
        <span className="hero-label">THE EVERYDAY SALE</span>
        <h1>Good finds.<br />Great prices.</h1>
        <p>Discover your next favourite thing from our handpicked collection of everyday essentials.</p>
        <a className="hero-cta" href="#products">Shop now <span>→</span></a>
        <div className="hero-note">✓ Great value &nbsp; ✓ Everyday essentials</div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="hero-circle"></div>
        <div className="hero-product product-one">🎧</div>
        <div className="hero-product product-two">⌚</div>
        <div className="hero-product product-three">👟</div>
        <div className="hero-product product-four">🎒</div>
        <div className="floating-tag">Deals up to <strong>40% OFF</strong></div>
      </div>
    </section>

    <section className="benefits">
      <div><span>🚚</span><p><strong>Convenient shopping</strong><small>Browse from anywhere</small></p></div>
      <div><span>💳</span><p><strong>Easy checkout</strong><small>Simple, clear pricing</small></p></div>
      <div><span>🎁</span><p><strong>Deals worth finding</strong><small>Discover something new</small></p></div>
      <div><span>↩</span><p><strong>Customer first</strong><small>Support when you need it</small></p></div>
    </section>

    <section className="products-section" id="products">
      <div className="section-heading">
        <div>
          <span className="eyebrow">MADE FOR YOUR EVERYDAY</span>
          <h2>Popular picks</h2>
          <p>Useful things, lovely prices.</p>
        </div>
        <div className="category-pills">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? 'pill active' : 'pill'}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div
    className="product-card"
    key={product.id}
    onClick={() => setSelectedProduct(product)}
  >
            <div className={`product-image product-bg-${product.id}`}>
              <span className="discount">
                {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
              </span>
              <img
  className="product-photo"
  src={product.image}
  alt={product.name}
  loading="lazy"
/>
              <button
                className="wishlist"
                aria-label={`Add ${product.name} to wishlist`}
                onClick={(event) => {
                  event.currentTarget.classList.toggle('liked')
                }}
              >♡</button>
            </div>
            <div className="product-info">
              <span className="product-category">{product.category}</span>
              <h3>{product.name}</h3>
              <div className="rating"><span>★ ★ ★ ★</span><span className="rating-last">★</span> <small>{product.rating}</small></div>
              <div className="price-row">
                <strong>₹{product.price.toLocaleString('en-IN')}</strong>
                <del>₹{product.oldPrice.toLocaleString('en-IN')}</del>
              </div>
              <p className="delivery-note">FREE delivery on eligible orders</p>
              <button className="add-button" onClick={() => addToCart(product)}>
                Add to Cart <span>+</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <span>🔎</span>
          <h3>No products found</h3>
          <p>Try a different search or category.</p>
          <button className="add-button" onClick={() => { setSearch(''); setCategory('All') }}>
            Show all products
          </button>
        </div>
      )}
    </section>

    <section className="newsletter">
      <div><span className="eyebrow">A LITTLE SOMETHING FOR YOU</span><h2>Good things are just around the corner.</h2><p>Explore the collection and find something you’ll love.</p></div>
      <a href="#products">Explore products →</a>
    </section>
  </main>

  <footer className="footer">
    <a className="brand" href="#">shopora<span>.</span></a>
    <p>Your everyday marketplace. Built for easy shopping.</p>
    <small>© 2026 Shopora. Demo storefront for learning.</small>
  </footer>

  {cartOpen && (
    <div className="cart-overlay" onClick={() => setCartOpen(false)}>
      <aside className="cart-panel" onClick={(event) => event.stopPropagation()}>
        <div className="cart-heading">
          <div><span className="eyebrow">YOUR SHOPPING BAG</span><h2>Your Cart ({cartCount})</h2></div>
          <button className="close-cart" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart"><span>🛒</span><h3>Your cart is waiting</h3><p>Add something you love to get started.</p><button className="add-button" onClick={() => setCartOpen(false)}>Continue shopping</button></div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className={`cart-item-image product-bg-${item.id}`}>
  <img src={item.image} alt={item.name} />
</div>
                  <div className="cart-item-info"><h3>{item.name}</h3><strong>₹{item.price.toLocaleString('en-IN')}</strong><div className="quantity"><button onClick={() => changeQuantity(item.id, -1)}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)}>+</button></div></div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Subtotal</span>
              <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
              </div>
              <small>Shipping and taxes are calculated at checkout.</small>
              <button className="checkout-button" onClick={() => {
  setShowCheckout(true)
  setOrderPlaced(false)
}}>
                Proceed to Checkout →
                </button>
                </div>
          </>
        )}
      </aside>
    </div>
  )}

  {selectedProduct && (
  <div className="product-details-overlay">
    <div className="product-details">
      <button
        className="details-close"
        onClick={() => setSelectedProduct(null)}
      >
        ✕
      </button>

      <img
        src={selectedProduct.image}
        alt={selectedProduct.name}
      />

      <div>
        <p>{selectedProduct.category}</p>
        <h2>{selectedProduct.name}</h2>
        <p>⭐ {selectedProduct.rating} / 5</p>

        <h2>₹{selectedProduct.price.toLocaleString('en-IN')}</h2>

        <p>
          Discover this product at Shopora. Add it to your
          cart when you're ready to shop.
        </p>

        <button
          className="add-to-cart-btn"
          onClick={() => {
            addToCart(selectedProduct)
            setSelectedProduct(null)
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
)}

{showCheckout && (
  <div className="checkout-overlay">
    <div className="checkout-panel">
      <button
        className="details-close"
        onClick={() => setShowCheckout(false)}
      >
        ✕
      </button>

      {orderPlaced ? (
        <div className="order-success">
          <h2>🎉 Order placed!</h2>
          <p>Thank you for shopping with Shopora.</p>
          <button
            className="add-to-cart-btn"
            onClick={() => {
              setShowCheckout(false)
              setOrderPlaced(false)
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <h2>Checkout</h2>
          <p>Please enter your delivery details.</p>

          <div className="checkout-summary">
            <h3>Order Summary</h3>
            {cart.map((item) => (
              <p key={item.id}>
                {item.name} × {item.quantity}
                <span>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </p>
            ))}
            <h3>
              Total: ₹
              {cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              ).toLocaleString('en-IN')}
            </h3>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              setOrderPlaced(true)
            }}
            className="checkout-form"
          >
            <label>
              Full Name
              <input name="fullName" required />
            </label>

            <label>
              Phone Number
              <input
                name="phone"
                type="tel"
                pattern="[0-9]{10}"
                title="Enter a 10-digit phone number"
                required
              />
            </label>

            <label>
              Delivery Address
              <textarea name="address" rows="3" required />
            </label>

            <label>
              Payment Method
              <select name="payment" defaultValue="cod">
                <option value="cod">Cash on Delivery (Demo)</option>
              </select>
            </label>

            <button type="submit" className="add-to-cart-btn">
              Place Order
            </button>
          </form>

          <p className="checkout-note">
            Demo only: this does not submit a real order or process payment.
          </p>
        </>
      )}
    </div>
  </div>
)}

</div>

)
}

export default Home
