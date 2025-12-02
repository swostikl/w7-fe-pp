import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const JobPage = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteJob = async (id) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not delete the job");
      }

      alert("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        console.log("Fetching job with id:", id);
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error("Could not fetch a job");
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const onClickDelete = (id) => {
    const confirm = window.confirm(
      `Are you sure you want to delete job ${id}?`
    );
    if (!confirm) return;

    deleteJob(id);
    navigate("/");
  };

  return (
    <div className="job-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{job.title}</h2>
          <p>Type: {job.type}</p>
          <p>Description: {job.description}</p>
          <p>Company: {job.company.name}</p>
          <p>Email: {job.company.contactEmail}</p>
          <p>Phone: {job.company.contactPhone}</p>

          <button onClick={() => onClickDelete(job._id)}>delete</button>
          <button onClick={() => navigate(`/edit-job/${job._id}`)}>edit</button>
        </>
      )}
    </div>
  );
};

export default JobPage;
