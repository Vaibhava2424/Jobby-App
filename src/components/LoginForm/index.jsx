import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false) // 👈 loading state
  const navigate = useNavigate()

  const onChangeUsername = event => setUsername(event.target.value)
  const onChangePassword = event => setPassword(event.target.value)

  const submitForm = async event => {
    event.preventDefault()
    setIsSubmitting(true)
    setShowSubmitError(false)

    const userDetails = { username, password }

    try {
      const response = await fetch('https://jobby-app-apis.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      })

      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, { expires: 7 })
        localStorage.setItem('loggedInUser', username)
        navigate('/', { replace: true })
      } else {
        setShowSubmitError(true)
        setErrorMsg(data.error || 'Login failed')
      }
    } catch (err) {
      setShowSubmitError(true)
      setErrorMsg('Network error. Try again.')
      console.error('Fetch error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />

        <div className="input-container">
          <label className="input-label" htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            className="username-input-field"
            value={username}
            onChange={onChangeUsername}
            placeholder="Username"
            required
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="login-button" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <button
          type="button"
          className="login-button"
          onClick={() => navigate('/signup')}
          disabled={isSubmitting}
        >
          Sign Up
        </button>

        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>

      {/* Full-screen loader */}
      {isSubmitting && (
        <div className="loader-overlay">
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Logging in...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginForm
