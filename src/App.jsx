import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Jobs from './components/Jobs'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/jobs" element={<Jobs />} />
      {/* <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App
