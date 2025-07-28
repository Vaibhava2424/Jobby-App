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
            <div className="button-container">
              <button className="find-jobs-button">Find Jobs</button>
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Home
