import {useState} from 'react'
import Cookies from 'js-cookie'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import './index.css'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleMenu = () => setIsMobileMenuOpen(prev => !prev)
  const onLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }
  const isActive = path => location.pathname === path

  return (
    <nav className="nav-header">
      <div className="nav-content">
        {/* Mobile View */}
        <div className="nav-bar-mobile-logo-container">
          

          <div className="mobile-icons">
            <button className="hamburger-icon" onClick={toggleMenu}>
              ☰
            </button>
            <button type="button" className="nav-mobile-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link
                to="/"
                className={`nav-link ${isActive('/') ? 'active-link' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link
                to="/jobs"
                className={`nav-link ${isActive('/jobs') ? 'active-link' : ''}`}
              >
                Jobs
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link
                to="/feedback"
                className={`nav-link ${isActive('/feedback') ? 'active-link' : ''}`}
              >
                Feedback
              </Link>
            </li>
          </ul>
          <button className="logout-desktop-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="mobile-menu">
          <li className="nav-menu-item-mobile">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active-link' : ''}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link
              to="/jobs"
              className={`nav-link ${isActive('/jobs') ? 'active-link' : ''}`}
              onClick={toggleMenu}
            >
              Jobs
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link
              to="/feedback"
              className={`nav-link ${isActive('/feedback') ? 'active-link' : ''}`}
              onClick={toggleMenu}
            >
              Feedback
            </Link>
          </li>
          <li className="logout-mobile-wrapper">
            <button className="logout-mobile" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Header
