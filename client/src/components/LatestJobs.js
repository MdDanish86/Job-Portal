import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/LatestJobs.css'

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get('http://localhost:5000/api/v1/job/get-job', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setJobs(res.data.jobs || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  if (loading) {
    return <p className='jobs-laoding'>Loading jobs...</p>;
  }

  if (jobs.length === 0) {
    return <p className='no-jobs'>No jobs available right now.</p>;
  }

  return (
    <div>
      <h2>Latest Job Postings</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id} style={{ marginBottom: '1rem' }}>
            <h3>{job.position}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location || 'Not specified'}</p>
            <p><strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestJobs;


