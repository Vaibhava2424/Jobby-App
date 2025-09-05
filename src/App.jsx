import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignupForm'
import Jobs from './components/Jobs'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import JobDetails from './components/JobDetails'
import Footer from './components/Footer'
import Feedback from './components/Feedback'

import './App.css'

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />   {/* 👈 signup route */}
        <Route path="/footer" element={<Footer />} />
        <Route path="/feedback" element={<Feedback />} />   {/* 👈 feedback route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />  
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
