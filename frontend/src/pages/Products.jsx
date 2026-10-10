
import { useMemo, useState } from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import '../App.css'

const ITEMS_PER_PAGE = 6

function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')
  const [page, setPage] = useState(1)

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase())

      const matchesCategory =
        category === 'All' || product.category === category

      return matchesSearch && matchesCategory
    })

    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [search, category, sort])

  const totalPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE
  )

  const currentPage = Math.min(page, Math.max(1, totalPages))

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  function changeSearch(value) {
    setSearch(value)
    setPage(1)
  }

  function changeCategory(value) {
    setCategory(value)
    setPage(1)
  }

  function changeSort(value) {
    setSort(value)
    setPage(1)
  }

  return (
    <main className="listing-page">
      <div className="listing-heading">
        <p className="eyebrow">SHOPORA COLLECTION</p>
        <h1>All Products</h1>
        <p>Find something you'll love.</p>
      </div>

      <div className="listing-controls">
        <input
          type="search"
          aria-label="Search products"
          placeholder="Search products..."
          value={search}
          onChange={(event) => changeSearch(event.target.value)}
        />

        <select
          aria-label="Filter by category"
          value={category}
          onChange={(event) => changeCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === 'All' ? 'All Categories' : item}
            </option>
          ))}
        </select>

        <select
          aria-label="Sort products"
          value={sort}
          onChange={(event) => changeSort(event.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <p className="results-count">
        {filteredProducts.length} products found
      </p>

      {visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-products">
          <h2>No products found</h2>
          <p>Try another search or category.</p>
          <button
            onClick={() => {
              changeSearch('')
              changeCategory('All')
              changeSort('featured')
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <nav className="pagination" aria-label="Product pages">
          <button
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((number) => (
            <button
              key={number}
              className={
                currentPage === number ? 'active' : ''
              }
              aria-current={
                currentPage === number ? 'page' : undefined
              }
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Next
          </button>
        </nav>
      )}
    </main>
  )
}

export default Products