import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Jobs = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [workEnvironment, setWorkEnvironment] = useState('Office');
  const [experience, setExperience] = useState('');
  const [benefits, setBenefits] = useState('');
  const [applyDeadline, setApplyDeadline] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [salary, setSalary] = useState('');
  const [qualification, setQualification] = useState('');
  const [jobDepartment, setJobDepartment] = useState('');
  const [jobLocation, setJobLocation] = useState(''); // New field for location
  const [openingType, setOpeningType] = useState('Regular'); // Ensure spelling is "Regular"
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted

    const jobData = {
      jobTitle,
      jobDescription,
      requirements,
      workEnvironment,
      experience,
      benefits,
      applyDeadline,
      jobType,
      salary,
      qualification,
      jobDepartment,
      jobLocation, // Include jobLocation in the jobData object
      openingType
    };
    
    try {
      const response = await axios.post('https://ftfl-backend.vercel.app/api/jobs/post-job', jobData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Job posted successfully:', response.data);
      alert('Job posted successfully!');
      
      // Reset form fields after successful submission
      setJobTitle('');
      setJobDescription('');
      setRequirements('');
      setWorkEnvironment('Office');
      setExperience('');
      setBenefits('');
      setApplyDeadline('');
      setJobType('Full-time');
      setSalary('');
      setQualification('');
      setJobDepartment('');
      setJobLocation(''); // Reset jobLocation
      setOpeningType('Regular'); // Reset openingType to "Regular"
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    } finally {
      setIsLoading(false); // Set loading to false after submission is complete
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4"></h2>
      <div className="card p-4 shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input type="text" className="form-control" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Job Description</label>
            <textarea className="form-control" rows="3" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Requirements</label>
            <textarea className="form-control" rows="3" value={requirements} onChange={(e) => setRequirements(e.target.value)} required></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Work Environment</label>
            <select className="form-select" value={workEnvironment} onChange={(e) => setWorkEnvironment(e.target.value)} required>
              <option value="Office">Office</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Experience</label>
            <input type="text" className="form-control" value={experience} onChange={(e) => setExperience(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Benefits</label>
            <textarea className="form-control" rows="3" value={benefits} onChange={(e) => setBenefits(e.target.value)} required></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Application Deadline</label>
            <input type="date" className="form-control" value={applyDeadline} onChange={(e) => setApplyDeadline(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Job Type</label>
            <select className="form-select" value={jobType} onChange={(e) => setJobType(e.target.value)} required>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Salary</label>
            <input type="text" className="form-control" value={salary} onChange={(e) => setSalary(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Qualification</label>
            <input type="text" className="form-control" value={qualification} onChange={(e) => setQualification(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <input type="text" className="form-control" value={jobDepartment} onChange={(e) => setJobDepartment(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Opening Type</label>
            <select className="form-select" value={openingType} onChange={(e) => setOpeningType(e.target.value)} required>
              <option value="Regular">Regular</option> {/* Ensure spelling is "Regular" */}
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="ms-2">Posting Job...</span>
              </>
            ) : (
              'Create Job'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Jobs;