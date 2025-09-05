import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie' // ✅ Capital C
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const onChangeUsername = event => setUsername(event.target.value)
  const onChangePassword = event => setPassword(event.target.value)

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = { username, password }

    try {
      const response = await fetch('https://jobby-app-apis.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      })

      const data = await response.json()

      if (response.ok) {
        // Store JWT in cookies for ProtectedRoute
        Cookies.set('jwt_token', data.jwt_token, { expires: 7 })
        // Optional: store username locally
        localStorage.setItem('loggedInUser', username)
        navigate('/', { replace: true }) // navigate after login
      } else {
        setShowSubmitError(true)
        setErrorMsg(data.error || 'Login failed')
      }
    } catch (err) {
      setShowSubmitError(true)
      setErrorMsg('Network error. Try again.')
      console.error('Fetch error:', err)
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
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <button
          type="button"
          className="login-button"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginForm
