import { useParams } from 'react-router-dom'

const JobDetails = () => {
  const { id } = useParams()
  return (
    <div>
      <h1>Job Details for ID: {id}</h1>
    </div>
  )
}

export default JobDetails