
import { Link } from 'react-router'
import '../App.css'

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link
        to={`/products/${product.id}`}
        className="product-card-link"
      >
        <img
          className="product-photo"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        <div className="product-info">
          <span className="product-category">
            {product.category}
          </span>

          <h3>{product.name}</h3>

          <p className="product-rating">
            ⭐ {product.rating} ({product.reviews} reviews)
          </p>

          <div className="product-prices">
            <strong>
              ₹{product.price.toLocaleString('en-IN')}
            </strong>

            <del>
              ₹{product.oldPrice.toLocaleString('en-IN')}
            </del>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard