import { useState, useEffect } from 'react'
import JobsCard from '../JobsCard'
import { Link } from 'react-router-dom'
import './index.css'
import JobCardSkeleton from '../JobCardSkeleton'

const JobsSection = () => {
  const [jobsList, setJobsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([])
  const [selectedSalary, setSelectedSalary] = useState('')

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch('https://jobby-app-apis.onrender.com/api/jobs')
        if (!response.ok) throw new Error('Failed to fetch jobs')

        const data = await response.json()
        // Format your jobs to match JobsCard props
        const formattedData = data.map(job => ({
          id: job._id,
          title: job.title,
          companyLogoUrl: job.company_logo_url,
          rating: job.rating,
          description: job.job_description,
          location: job.location,
          employmentType: job.employment_type,
          packagePerAnnum: job.package_per_annum,
        }))

        setJobsList(formattedData)
      } catch (err) {
        console.error(err)
      } finally {
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

  return isLoading ? (
  <ul className="products-list">
    {[...Array(5)].map((_, index) => (
      <JobCardSkeleton key={index} />
    ))}
  </ul>
) : (
  <>
    <div className="search-bar-wrapper desktop-only">
      <input
        type="text"
        placeholder="Search jobs by title"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        className="search-input"
      />
    </div>
    {renderJobsList()}
  </>
)
}

export default JobsSection
