import { useState } from 'react'
import { Link } from 'react-router'
import '../App.css'

function Wishlist() {
const [wishlist, setWishlist] = useState(() => {
try {
return JSON.parse(localStorage.getItem('shopora-wishlist')) || []
} catch {
return []
}
})

const removeFromWishlist = (id) => {
const updatedWishlist = wishlist.filter(
(product) => product.id !== id
)

setWishlist(updatedWishlist)
localStorage.setItem(
  'shopora-wishlist',
  JSON.stringify(updatedWishlist)
)

}

const moveToCart = (product) => {
const savedCart = JSON.parse(
localStorage.getItem('shopora-cart') || '[]'
)

const variant = product.variants?.[0] || 'Standard'
const existingItem = savedCart.find(
  (item) => item.id === product.id && item.variant === variant
)

let updatedCart

if (existingItem) {
  updatedCart = savedCart.map((item) =>
    item.id === product.id && item.variant === variant
      ? { ...item, quantity: item.quantity + 1 }
      : item
  )
} else {
  updatedCart = [
    ...savedCart,
    { ...product, variant, quantity: 1 },
  ]
}

localStorage.setItem('shopora-cart', JSON.stringify(updatedCart))
removeFromWishlist(product.id)
alert('Product added to your cart!')

}

return ( <main className="wishlist-page"> <div className="wishlist-heading"> <h1>My Wishlist ❤️</h1> <p>Your favourite products, all in one place.</p> </div>

  {wishlist.length === 0 ? (
    <div className="wishlist-empty">
      <div className="wishlist-empty-icon">♡</div>
      <h2>Your wishlist is empty</h2>
      <p>Explore our store and save products you love.</p>
      <Link to="/products" className="wishlist-shop-btn">
        Explore Products
      </Link>
    </div>
  ) : (
    <div className="wishlist-grid">
      {wishlist.map((product) => (
        <article className="wishlist-card" key={product.id}>
          <Link to={`/products/${product.id}`}>
            <img src={product.image} alt={product.name} />
          </Link>

          <div className="wishlist-card-content">
            <span className="wishlist-category">
              {product.category}
            </span>

            <Link
              to={`/products/${product.id}`}
              className="wishlist-product-name"
            >
              {product.name}
            </Link>

            <p className="wishlist-price">
              ₹{product.price.toLocaleString('en-IN')}
            </p>

            <button
              className="wishlist-cart-btn"
              onClick={() => moveToCart(product)}
            >
              Add to Cart
            </button>

            <button
              className="wishlist-remove-btn"
              onClick={() => removeFromWishlist(product.id)}
            >
              Remove ♡
            </button>
          </div>
        </article>
      ))}
    </div>
  )}
</main>

)
}

export default Wishlist
