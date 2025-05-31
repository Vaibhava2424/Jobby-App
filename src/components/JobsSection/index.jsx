import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import BeatLoader from 'react-spinners/BeatLoader'
import JobsCard from '../JobsCard'
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

  // Filter jobs based on search input
  const filteredJobs = jobsList.filter(job => {
    // Search filter
    const matchesSearch = job.title.toLowerCase().includes(searchInput.toLowerCase());

    // Employment type filter
    const matchesEmployment =
      selectedEmploymentTypes.length === 0 ||
      selectedEmploymentTypes.includes(job.employmentType);

    // Salary filter (assumes job.packagePerAnnum is like "21 LPA")
    let matchesSalary = true;
    if (selectedSalary) {
      const jobSalary = parseInt(job.packagePerAnnum);
      matchesSalary = jobSalary >= parseInt(selectedSalary);
    }

    return matchesSearch && matchesEmployment && matchesSalary;
  });

  const renderJobsList = () => (
    <div className="jobs-section-main">
      <div className="sidebar-column">
        <div className="profile-sidebar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/male-avatar-img.png"
            alt="profile"
            className="profile-image"
          />
          <h2 className="profile-name">{username}</h2>
          <p className="profile-bio">Lead Software Developer and AI-ML expert</p>
        </div>
        <div className="filters-container">
  <div className="filter-group">
    <h4 className="filter-title">Type of Employment</h4>
    <div>
      <label>
        <input
          type="checkbox"
          value="Full Time"
          checked={selectedEmploymentTypes.includes('Full Time')}
          onChange={e => {
            const { value, checked } = e.target;
            setSelectedEmploymentTypes(prev =>
              checked ? [...prev, value] : prev.filter(type => type !== value)
            ) 
          }}
        /> Full Time
      </label>
    </div>
    <div>
      <label>
        <input
          type="checkbox"
          value="Part Time"
          checked={selectedEmploymentTypes.includes('Part Time')}
          onChange={e => {
            const { value, checked } = e.target;
            setSelectedEmploymentTypes(prev =>
              checked ? [...prev, value] : prev.filter(type => type !== value)
            );
          }}
        /> Part Time
      </label>
    </div>
    <div>
      <label>
        <input
          type="checkbox"
          value="Freelance"
          checked={selectedEmploymentTypes.includes('Freelance')}
          onChange={e => {
            const { value, checked } = e.target;
            setSelectedEmploymentTypes(prev =>
              checked ? [...prev, value] : prev.filter(type => type !== value)
            );
          }}
        /> Freelance
      </label>
    </div>
    <div>
      <label>
        <input
          type="checkbox"
          value="Internship"
          checked={selectedEmploymentTypes.includes('Internship')}
          onChange={e => {
            const { value, checked } = e.target;
            setSelectedEmploymentTypes(prev =>
              checked ? [...prev, value] : prev.filter(type => type !== value)
            );
          }}
        /> Internship
      </label>
    </div>
  </div>
  <hr className="filter-divider" />
  <div className="filter-group">
    <h4 className="filter-title">Salary Range</h4>
    <div>
      <label>
        <input
          type="radio"
          name="salary"
          value="10"
          checked={selectedSalary === '10'}
          onChange={e => setSelectedSalary(e.target.value)}
        /> 10 LPA and above
      </label>
    </div>
    <div>
      <label>
        <input
          type="radio"
          name="salary"
          value="20"
          checked={selectedSalary === '20'}
          onChange={e => setSelectedSalary(e.target.value)}
        /> 20 LPA and above
      </label>
    </div>
    <div>
      <label>
        <input
          type="radio"
          name="salary"
          value="30"
          checked={selectedSalary === '30'}
          onChange={e => setSelectedSalary(e.target.value)}
        /> 30 LPA and above
      </label>
    </div>
    <div>
      <label>
        <input
          type="radio"
          name="salary"
          value="40"
          checked={selectedSalary === '40'}
          onChange={e => setSelectedSalary(e.target.value)}
        /> 40 LPA and above
      </label>
    </div>
  </div>
      </div>
    </div>
    <ul className="products-list">
      {filteredJobs.map(job => (
        <JobsCard jobsData={job} key={job.id} />
      ))}
    </ul>
  </div>
)

  const renderLoader = () => (
    <div className="loading-container">
      <BeatLoader color="red" />
    </div>
  )

const username = localStorage.getItem('loggedInUser') || 'User'
  return (
    <>
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search jobs by title"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">
          {/* You can use an SVG or an image */}
          <svg width="18" height="18" fill="#888" viewBox="0 0 24 24">
            <path d="M21.53 20.47l-4.8-4.8A7.92 7.92 0 0018 10a8 8 0 10-8 8 7.92 7.92 0 005.67-2.27l4.8 4.8a1 1 0 001.41-1.41zM4 10a6 6 0 1112 0 6 6 0 01-12 0z"/>
          </svg>
        </span>
      </div>
      
      {isLoading ? renderLoader() : renderJobsList()}
    </>
  )
}

export default JobsSection
