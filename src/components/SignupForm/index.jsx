import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const SignUpForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false) // loading state
  const navigate = useNavigate()

  const onChangeUsername = event => setUsername(event.target.value)
  const onChangeEmail = event => setEmail(event.target.value)
  const onChangePassword = event => setPassword(event.target.value)

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_taoken', jwtToken, { expires: 30 })
    localStorage.setItem('loggedInUser', username)
    localStorage.setItem('loggedInUserEmail', email)
    navigate('/', { replace: true })
  }

  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const submitForm = async event => {
    event.preventDefault()
    setIsSubmitting(true)
    setShowSubmitError(false)

    const userDetails = { username, email, password }
    const url = 'https://jobby-app-apis.onrender.com/signup'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      })
      const data = await response.json()

      if (response.ok) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onSubmitFailure(data.error_msg || 'Sign up failed')
      }
    } catch (err) {
      onSubmitFailure('Network error. Please try again.',err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken) return <Navigate to="/" />

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
          <label className="input-label" htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            className="username-input-field"
            value={email}
            onChange={onChangeEmail}
            placeholder="Email"
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
          Sign Up
        </button>

        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>

      {/* Full-screen loader */}
      {isSubmitting && (
        <div className="loader-overlay">
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Signing up...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUpForm
