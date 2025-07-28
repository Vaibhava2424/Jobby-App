import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import BeatLoader from 'react-spinners/BeatLoader'
import JobsCard from '../JobsCard'
import { Link } from 'react-router-dom'
import './index.css'

const JobsSection = () => {
  const [jobsList, setJobsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([])
  const [selectedSalary, setSelectedSalary] = useState('')

  useEffect(() => {
    const getJobs = async () => {
      const apiUrl = 'https://apis.ccbp.in/jobs'
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      if (response.ok === true) {
        const fetchedData = await response.json()
        const formattedData = fetchedData.jobs.map(job => ({
          id: job.id,
          title: job.title,
          companyLogoUrl: job.company_logo_url,
          rating: job.rating,
          description: job.job_description,
          location: job.location,
          employmentType: job.employment_type,
          packagePerAnnum: job.package_per_annum,
        }))
        setJobsList(formattedData)
        setIsLoading(false)
      }
    }
    getJobs()
  }, [])

  const filteredJobs = jobsList.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchInput.toLowerCase())
    const matchesEmployment =
      selectedEmploymentTypes.length === 0 ||
      selectedEmploymentTypes.includes(job.employmentType)
    let matchesSalary = true
    if (selectedSalary) {
      const jobSalary = parseInt(job.packagePerAnnum)
      matchesSalary = jobSalary >= parseInt(selectedSalary)
    }
    return matchesSearch && matchesEmployment && matchesSalary
  })

  // ✅ Username capitalization logic
  const rawUsername = (localStorage.getItem('loggedInUser') || 'User').trim()
  const username = rawUsername.charAt(0).toUpperCase() + rawUsername.slice(1).toLowerCase()
  const firstLetter = username.length > 0 ? username[0].toUpperCase() : 'U'

  const renderJobsList = () => (
    <div className="jobs-section-main">
      <div className="sidebar-column">
        <div className="profile-sidebar">
          <div className="profile-avatar">{firstLetter}</div>
          <h2 className="profile-name">{username}</h2>
          <p className="profile-bio">Lead Software Developer and AI-ML expert</p>
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <h4 className="filter-title">Type of Employment</h4>
            {['Full Time', 'Part Time', 'Freelance', 'Internship'].map(type => (
              <div key={type}>
                <label>
                  <input
                    type="checkbox"
                    value={type}
                    checked={selectedEmploymentTypes.includes(type)}
                    onChange={e => {
                      const { value, checked } = e.target
                      setSelectedEmploymentTypes(prev =>
                        checked ? [...prev, value] : prev.filter(t => t !== value)
                      )
                    }}
                  />{' '}
                  {type}
                </label>
              </div>
            ))}
          </div>

          <hr className="filter-divider" />

          <div className="filter-group">
            <h4 className="filter-title">Salary Range</h4>
            {[10, 20, 30, 40].map(salary => (
              <div key={salary}>
                <label>
                  <input
                    type="radio"
                    name="salary"
                    value={salary}
                    checked={selectedSalary === String(salary)}
                    onChange={e => setSelectedSalary(e.target.value)}
                  />{' '}
                  {salary} LPA and above
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="search-bar-wrapper mobile-only">
        <input
          type="text"
          placeholder="Search jobs by title"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">
          <svg width="18" height="18" fill="#888" viewBox="0 0 24 24">
            <path d="M21.53 20.47l-4.8-4.8A7.92 7.92 0 0018 10a8 8 0 10-8 8 7.92 7.92 0 005.67-2.27l4.8 4.8a1 1 0 001.41-1.41zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" />
          </svg>
        </span>
      </div>

      <ul className="products-list">
        {filteredJobs.map(job => (
          <Link
            to={`/jobs/${job.id}`}
            className="job-link"
            style={{ textDecoration: 'none', color: 'inherit' }}
            key={job.id}
          >
            <JobsCard jobsData={job} />
          </Link>
        ))}
      </ul>
    </div>
  )

  const renderLoader = () => (
    <div className="loading-container">
      <BeatLoader color="red" />
    </div>
  )

  return (
    <>
      <div className="search-bar-wrapper desktop-only">
        <input
          type="text"
          placeholder="Search jobs by title"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">
          <svg width="18" height="18" fill="#888" viewBox="0 0 24 24">
            <path d="M21.53 20.47l-4.8-4.8A7.92 7.92 0 0018 10a8 8 0 10-8 8 7.92 7.92 0 005.67-2.27l4.8 4.8a1 1 0 001.41-1.41zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" />
          </svg>
        </span>
      </div>

      {isLoading ? renderLoader() : renderJobsList()}
    </>
  )
}

export default JobsSection
