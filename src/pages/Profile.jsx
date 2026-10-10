import { useState } from 'react'
import { Link } from 'react-router'
import '../App.css'

const emptyProfile = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
}

function Profile() {
  const [profile, setProfile] = useState(() => {
    try {
      return {
        ...emptyProfile,
        ...JSON.parse(localStorage.getItem('shopora-profile') || '{}'),
      }
    } catch {
      return emptyProfile
    }
  })

  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }))

    setMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!profile.name.trim() || !profile.email.trim()) {
      setMessage('Please enter your name and email address.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      setMessage('Please enter a valid email address.')
      return
    }

    try {
      localStorage.setItem('shopora-profile', JSON.stringify(profile))
      setMessage('Your profile has been saved successfully!')
    } catch {
      setMessage('Could not save your profile. Please try again.')
    }
  }

  const handleClear = () => {
    setProfile(emptyProfile)
    localStorage.removeItem('shopora-profile')
    setMessage('Profile information cleared.')
  }

  return (
    <main className="profile-page">
      <div className="profile-heading">
        <h1>My Profile</h1>
        <p>Manage your personal and delivery information.</p>
      </div>

      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-avatar">
            {profile.name.trim()
              ? profile.name.trim().charAt(0).toUpperCase()
              : 'U'}
          </div>

          <h2>{profile.name || 'Your Name'}</h2>
          <p>{profile.email || 'Your email address'}</p>

          <div className="profile-sidebar-links">
            <Link to="/orders">📦 My Orders</Link>
            <Link to="/wishlist">♡ My Wishlist</Link>
            <Link to="/cart">🛒 My Cart</Link>
          </div>
        </aside>

        <form className="profile-form" onSubmit={handleSubmit}>
          <h2>Personal Information</h2>

          <label htmlFor="profile-name">Full Name *</label>
          <input
            id="profile-name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />

          <label htmlFor="profile-email">Email Address *</label>
          <input
            id="profile-email"
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <label htmlFor="profile-phone">Phone Number</label>
          <input
            id="profile-phone"
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            autoComplete="tel"
          />

          <h2 className="profile-address-heading">Delivery Address</h2>

          <label htmlFor="profile-address">Street Address</label>
          <textarea
            id="profile-address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="House number, street, area"
            autoComplete="street-address"
            rows={3}
          />

          <div className="profile-field-row">
            <div>
              <label htmlFor="profile-city">City</label>
              <input
                id="profile-city"
                name="city"
                value={profile.city}
                onChange={handleChange}
                placeholder="City"
                autoComplete="address-level2"
              />
            </div>

            <div>
              <label htmlFor="profile-postal">Postal Code</label>
              <input
                id="profile-postal"
                name="postalCode"
                value={profile.postalCode}
                onChange={handleChange}
                placeholder="Postal code"
                autoComplete="postal-code"
              />
            </div>
          </div>

          {message && (
            <p className="profile-message" role="status">
              {message}
            </p>
          )}

          <div className="profile-actions">
            <button type="submit" className="profile-save-btn">
              Save Profile
            </button>

            <button
              type="button"
              className="profile-clear-btn"
              onClick={handleClear}
            >
              Clear Information
            </button>
          </div>

          <p className="profile-note">
            This demo saves profile information in this browser only.
            It does not use an account or server.
          </p>
        </form>
      </div>
    </main>
  )
}

export default Profile