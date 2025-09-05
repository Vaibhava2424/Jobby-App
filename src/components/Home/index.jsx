import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import './index.css'
import Footer from '../Footer'

const Home = () => {
  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('https://jobby-app-apis.onrender.com/api/jobs')
        if (response.ok) {
          const data = await response.json()
          // Extract unique company logos and names
          const uniqueCompanies = []
          const seen = new Set()
          data.forEach(job => {
            if (!seen.has(job.company_logo_url)) {
              seen.add(job.company_logo_url)
              uniqueCompanies.push({
                name: job.title, // you can replace with actual company name if available
                logo: job.company_logo_url
              })
            }
          })
          setCompanies(uniqueCompanies)
        }
      } catch (error) {
        console.error('Error fetching companies:', error)
      }
      setIsLoading(false)
    }

    fetchCompanies()
  }, [])

  return (
    
    <>
    <div className="bg-container">
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">
            Find the jobs that <br /> fit your life
          </h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            <br /> company reviews. Find the job that fits your abilities
            <br /> and potential
          </p>
          <Link to="/jobs">
            <div className="button-container">
              <button className="find-jobs-button">Find Jobs</button>
            </div>
          </Link>
        </div>

        
      </div>
      {/* Companies Section */}
        <div className="companies-section">
          <h1 className="companies-heading">Companies that are Hiring</h1>
          {isLoading ? (
            <p className="companies-loading">Loading companies...</p>
          ) : (
            <div className="companies-container">
              {companies.map((company, index) => (
                <div className="company-card" key={index}>
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="company-logo"
                  />
                  <p className="company-name">{company.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Home
