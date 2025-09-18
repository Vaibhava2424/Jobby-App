import React from "react"
import "./JobCardSkeleton.css"

const JobCardSkeleton = () => {
  return (
    <li className="job-card-wrapper skeleton">
      <div className="job-card">
        {/* Logo + Title */}
        <div className="job-card-header">
          <div className="skeleton-logo"></div>
          <div className="skeleton-text-group">
            <div className="skeleton-text title"></div>
            <div className="skeleton-text small"></div>
          </div>
        </div>

        {/* Description */}
        <div className="skeleton-text full"></div>
        <div className="skeleton-text full"></div>

        {/* Footer Info */}
        <div className="skeleton-details">
          <div className="skeleton-text small"></div>
          <div className="skeleton-text small"></div>
          <div className="skeleton-text small"></div>
        </div>
      </div>
    </li>
  )
}

export default JobCardSkeleton
