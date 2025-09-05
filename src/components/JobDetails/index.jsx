import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../Header'
import './index.css'

const JobDetails = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [similarJobs, setSimilarJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://jobby-app-apis.onrender.com/api/jobs/${id}`)
        if (response.ok) {
          const data = await response.json()

          // ✅ Main job details
          setJob({
            id: data._id,
            title: data.title,
            companyLogoUrl: data.company_logo_url,
            rating: data.rating,
            description: data.job_description,
            location: data.location,
            employmentType: data.employment_type,
            packagePerAnnum: data.package_per_annum,
            companyWebsiteUrl: data.company_website_url,
            skills: data.skills?.map(skill => ({
              name: skill.name,
              imageUrl: skill.image_url
            })),
            lifeAtCompany: {
              description: data.life_at_company?.description,
              imageUrl: data.life_at_company?.image_url
            }
          })

          // ✅ Build similar jobs list (filtering out current job)
          if (data.similar_jobs) {
            setSimilarJobs(
              data.similar_jobs.map(job => ({
                id: job._id,
                title: job.title,
                companyLogoUrl: job.company_logo_url,
                rating: job.rating,
                description: job.job_description,
                location: job.location,
                employmentType: job.employment_type
              }))
            )
          }
        } else {
          setJob(null)
        }
      } catch (error) {
        console.error('Error fetching job:', error)
        setJob(null)
      }
      setIsLoading(false)
    }

    fetchJobDetails()
  }, [id])

  if (isLoading) {
  return (
    <div className="loader-container">
      <div className="job-details-loader">Loading...</div>
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
          {/* Job Header */}
          <div className="job-details-header">
            <img src={job.companyLogoUrl} alt="company logo" className="job-details-logo" />
            <div>
              <h1 className="job-details-title">{job.title}</h1>
              <div className="job-details-rating">
                <span>★</span> {job.rating}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="job-details-info">
            <span>📍 {job.location}</span>
            <span>💼 {job.employmentType}</span>
            <span className="job-details-salary">{job.packagePerAnnum}</span>
          </div>

          <hr />
          {/* Description */}
          <div className="job-details-description-header">
            <h2>Description</h2>
            {job.companyWebsiteUrl && (
              <a
                href={job.companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="job-details-visit"
              >
                Visit <span style={{ fontSize: '14px' }}>↗</span>
              </a>
            )}
          </div>
          <p>{job.description}</p>

          {/* Skills */}
          {job.skills && job.skills.length > 0 && (
            <>
              <h2 className="LifeAtCompany">Skills</h2>
              <div className="job-details-skills">
                {job.skills.map(skill => (
                  <div className="job-details-skill" key={skill.name}>
                    <img
                      src={skill.imageUrl}
                      alt={skill.name}
                      className="job-details-skill-img"
                    />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Life at Company */}
          {job.lifeAtCompany && (
            <>
              <h2 className="LifeAtCompany">Life at Company</h2>
              <div className="job-details-life">
                <p className="LifeAtCompany">{job.lifeAtCompany.description}</p>
                <img
                  src={job.lifeAtCompany.imageUrl}
                  alt="life at company"
                  className="job-details-life-img image"
                />
              </div>
            </>
          )}

          <hr className="similar-jobs-divider" />

          {/* Similar Jobs */}
          {similarJobs.length > 0 && (
            <>
              <h2 className="similar-jobs-title">Similar Jobs</h2>
              <div className="similar-jobs-container">
                {similarJobs.map(similar => (
                  <div className="similar-job-card" key={similar.id}>
                    <div className="job-details-header">
                      <img
                        src={similar.companyLogoUrl}
                        alt="company logo"
                        className="job-details-logo"
                      />
                      <div>
                        <h3 className="job-details-title">{similar.title}</h3>
                        <div className="job-details-rating">
                          <span>★</span> {similar.rating}
                        </div>
                      </div>
                    </div>
                    <div className="job-details-info">
                      <span>📍 {similar.location}</span>
                      <span>💼 {similar.employmentType}</span>
                    </div>
                    <h4>Description</h4>
                    <p>{similar.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default JobDetails
