import { Link } from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  return (
    <div className="bg-container">
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Find the jobs that 
            <br/>fits your life</h1>
          
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            <br/> company reviews. Find the job that fits your abilities 
            <br/> and potential
          </p>
          <Link to="/jobs">
            <button type="button" className="shop-now-button">
              Find Jobs
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Home
