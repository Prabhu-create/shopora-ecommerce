import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import '../App.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/products' },
    { label: 'Wishlist', path: '/wishlist' },
    { label: 'My Orders', path: '/orders' },
    { label: 'Profile', path: '/profile' },
  ]

  return (
    <header className="shopora-navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          Shopora<span>.</span>
        </Link>

        <button
          className="navbar-menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`navbar-links ${menuOpen ? 'navbar-links-open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={closeMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'navbar-link-active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <NavLink
            to="/cart"
            onClick={closeMenu}
            className={({ isActive }) =>
              `navbar-cart ${isActive ? 'navbar-link-active' : ''}`
            }
          >
            🛒 Cart
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar