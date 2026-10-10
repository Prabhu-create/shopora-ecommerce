
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'

function Placeholder({ title }) {
  return (
    <main style={{ padding: '40px 20px' }}>
      <h1>{title}</h1>
      <p>This page will be implemented in the next step.</p>
    </main>
  )
}

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/products" element={<Products />} />

      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/cart"
        element={<Cart />}
      />

      <Route
        path="/wishlist"
        element={<Wishlist />}
      />

      <Route
        path="/checkout"
        element={<Checkout />}
      />

      <Route
        path="/orders"
        element={<Orders />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="*"
        element={<Placeholder title="Page Not Found" />}
      />
    </Routes>
    </>
  )
}

export default App