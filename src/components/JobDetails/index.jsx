import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'
import './index.css'
import { DNA } from 'react-loader-spinner'

const JobDetails = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [similarJobs, setSimilarJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJobDetails = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      if (response.ok) {
        const data = await response.json()
        setJob(data.job_details)
        setSimilarJobs(data.similar_jobs)
      }
      setIsLoading(false)
    }
    fetchJobDetails()
  }, [id])

  if (isLoading) {
    return (
      <div className="loader-container">
        <DNA />
      </div>
    )
  }

  if (!job) {
    return <div className="job-details-error">Job not found</div>
  }

  return (
    <>
      <Header />
      <div className="job-details-main">
        <div className="job-details-card">
          <div className="job-details-header">
            <img src={job.company_logo_url} alt="company logo" className="job-details-logo" />
            <div>
              <h1 className="job-details-title">{job.title}</h1>
              <div className="job-details-rating">
                <span>★</span> {job.rating}
              </div>
            </div>
          </div>
          <div className="job-details-info">
            <span>📍 {job.location}</span>
            <span>💼 {job.employment_type}</span>
            <span className="job-details-salary">{job.package_per_annum}</span>
          </div>
          <hr />
          <div className="job-details-description-header">
            <h2>Description</h2>
            <a href={job.company_website_url} target="_blank" rel="noopener noreferrer" className="job-details-visit">
              Visit <span style={{ fontSize: '14px' }}>↗</span>
            </a>
          </div>
          <p>{job.job_description}</p>

          <h2 className="LifeAtCompany">Skills</h2>
          <div className="job-details-skills">
            {job.skills.map(skill => (
              <div className="job-details-skill" key={skill.name}>
                <img src={skill.image_url} alt={skill.name} className="job-details-skill-img" />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>

          <h2 className="LifeAtCompany">Life at Company</h2>
          <div className="job-details-life">
            <p className="LifeAtCompany">{job.life_at_company.description}</p>
            <img
              src={job.life_at_company.image_url}
              alt="life at company"
              className="job-details-life-img image"
            />
          </div>
        </div>

        <hr className="similar-jobs-divider" />
        <h2 className="similar-jobs-title">Similar Jobs</h2>

        <div className="similar-jobs-container">
          {similarJobs.map(similar => (
            <div className="similar-job-card" key={similar.id}>
              <div className="job-details-header">
                <img src={similar.company_logo_url} alt="company logo" className="job-details-logo" />
                <div>
                  <h3 className="job-details-title">{similar.title}</h3>
                  <div className="job-details-rating">
                    <span>★</span> {similar.rating}
                  </div>
                </div>
              </div>
              <div className="job-details-info">
                <span>📍 {similar.location}</span>
                <span>💼 {similar.employment_type}</span>
              </div>
              <h4>Description</h4>
              <p>{similar.job_description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default JobDetails
