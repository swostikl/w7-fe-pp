import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyContactEmail, setCompanyContactEmail] = useState("");
  const [companyContactPhone, setCompanyContactPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const addJob = async () => {
    setLoading(true);
    setError(null);

    const newJob = {
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail: companyContactEmail,
        contactPhone: companyContactPhone,
      },
    };

    try {
      const response = await fetch("http://localhost:4000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) {
        throw new Error("Failed to add job");
      }

      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("submitForm called");
    addJob();
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Job type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Company Name:</label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label>Contact Email:</label>
        <input
          type="text"
          required
          value={companyContactEmail}
          onChange={(e) => setCompanyContactEmail(e.target.value)}
        />

        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={companyContactPhone}
          onChange={(e) => setCompanyContactPhone(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Adding..." : "Add Job"}
        </button>
      </form>
    </div>
  );
};

export default AddJobPage;
