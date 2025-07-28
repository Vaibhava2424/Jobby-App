import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Jobs from './components/Jobs'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import JobDetails from './components/JobDetails'

import './App.css'

function App() {
  return (
    <BrowserRouter basename="/Jobby-App">
      <Routes>
        <Route 
          path="/login" 
          element={<LoginForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />  
            </ProtectedRoute>
          }
        />
        <Route
          path="/Jobs"
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
