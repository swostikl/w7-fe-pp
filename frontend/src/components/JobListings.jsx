import JobListing from "./JobListing";
import { Link } from "react-router-dom";

const JobListings = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id}>
            <JobListing job={job} />
            <Link to={`/jobs/${job.id}`}>View Job</Link>
          </div>
        ))
      )}
    </div>
  );
};
 
export default JobListings;
