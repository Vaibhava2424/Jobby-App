import './index.css'

const JobsCard = props => {
  const {jobsData} = props
  const {
    title,
    companyLogoUrl,
    rating,
    description,
    location,
    employmentType,
    packagePerAnnum,
  } = jobsData

  return (
    <li className="job-card">
      <div className="job-card-header">
        <img src={companyLogoUrl} alt="company logo" className="job-logo" />
        <div>
          <h1 className="job-title">{title}</h1>
          <div className="job-rating">
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
            <span>{rating}</span>
          </div>
        </div>
      </div>
      <p className="job-description">{description}</p>
      <div className="job-details">
        <span className="job-location">{location}</span>
        <span className="job-type">{employmentType}</span>
        <span className="job-package">{packagePerAnnum}</span>
      </div>
    </li>
  )
}

export default JobsCard
