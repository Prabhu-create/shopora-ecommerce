
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import products from '../data/products'
import '../App.css'

function ProductDetails() {
  const { id } = useParams()

  const product = products.find(
    (item) => item.id === Number(id)
  )

  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || ''
  )
  const [message, setMessage] = useState('')

  if (!product) {
    return (
      <main className="details-page">
        <h1>Product Not Found</h1>
        <p>Sorry, we couldn't find that product.</p>
        <Link to="/products">Back to Products</Link>
      </main>
    )
  }

  function addToCart() {
    const savedCart = JSON.parse(
      localStorage.getItem('shopora-cart') || '[]'
    )

    const existingItem = savedCart.find(
      (item) =>
        item.id === product.id &&
        item.variant === selectedVariant
    )

    let updatedCart

    if (existingItem) {
      updatedCart = savedCart.map((item) =>
        item.id === product.id &&
        item.variant === selectedVariant
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    } else {
      updatedCart = [
        ...savedCart,
        {
          ...product,
          variant: selectedVariant,
          quantity,
        },
      ]
    }

    localStorage.setItem(
      'shopora-cart',
      JSON.stringify(updatedCart)
    )

    setMessage('Added to cart successfully!')
  }

  function addToWishlist() {
    const savedWishlist = JSON.parse(
      localStorage.getItem('shopora-wishlist') || '[]'
    )

    const alreadySaved = savedWishlist.some(
      (item) => item.id === product.id
    )

    if (alreadySaved) {
      setMessage('This product is already in your wishlist.')
      return
    }

    localStorage.setItem(
      'shopora-wishlist',
      JSON.stringify([...savedWishlist, product])
    )

    setMessage('Added to your wishlist!')
  }

  return (
    <main className="details-page">
      <nav className="details-breadcrumb">
        <Link to="/">Home</Link>
        {' / '}
        <Link to="/products">Products</Link>
        {' / '}
        <span>{product.name}</span>
      </nav>

      <section className="details-layout">
        <div className="details-image-wrap">
          <img
            className="details-image"
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="details-content">
          <span className="details-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="details-rating">
            ⭐ {product.rating} / 5
            {' · '}
            {product.reviews} reviews
          </p>

          <div className="details-price">
            <strong>
              ₹{product.price.toLocaleString('en-IN')}
            </strong>
            <del>
              ₹{product.oldPrice.toLocaleString('en-IN')}
            </del>
          </div>

          <p className="details-description">
            {product.description}
          </p>

          <div className="variant-section">
            <label htmlFor="product-variant">
              Select option
            </label>

            <select
              id="product-variant"
              value={selectedVariant}
              onChange={(event) =>
                setSelectedVariant(event.target.value)
              }
            >
              {product.variants.map((variant) => (
                <option key={variant} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          </div>

          <div className="quantity-section">
            <span>Quantity</span>

            <div className="quantity-control">
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) =>
                    Math.max(1, current - 1)
                  )
                }
                disabled={quantity === 1}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => current + 1)
                }
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <p className="details-total">
            Total: ₹
            {(product.price * quantity).toLocaleString('en-IN')}
          </p>

          <div className="details-actions">
            <button
              type="button"
              className="details-cart-btn"
              onClick={addToCart}
            >
              Add to Cart
            </button>

            <button
              type="button"
              className="details-wishlist-btn"
              onClick={addToWishlist}
            >
              ♡ Wishlist
            </button>
          </div>

          {message && (
            <p className="details-message" role="status">
              {message}
            </p>
          )}

          <Link className="continue-shopping" to="/products">
            ← Continue Shopping
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ProductDetails