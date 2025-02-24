import React, { useEffect, useState } from 'react';
import { Spinner, Button, Card, Container, Row, Col } from 'react-bootstrap';

const JobsPosted = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingJobId, setDeletingJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://ftfl-backend.vercel.app/api/jobs/all-jobs/');
        const data = await response.json();
        if (data.jobs && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else {
          console.error('Unexpected API response format:', data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId) => {
    setDeletingJobId(jobId);
    try {
      const response = await fetch(`https://ftfl-backend.vercel.app/api/jobs/delete-job/${jobId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setJobs(jobs.filter(job => job._id !== jobId));
      } else {
        alert('Failed to delete the job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    } finally {
      setDeletingJobId(null);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4"></h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job) => (
              <Col key={job._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{job.jobTitle}</Card.Title>
                    <Card.Text><strong>Location:</strong> {job.workEnvironment}</Card.Text>
                    <Card.Text><strong>Deadline:</strong> {new Date(job.applyDeadline).toLocaleDateString()}</Card.Text>
                    <Card.Text><strong>Posted Date:</strong> {new Date(job.postDate).toLocaleDateString()}</Card.Text>
                    <Button 
                      variant="danger" 
                      onClick={() => handleDeleteJob(job._id)}
                      disabled={deletingJobId === job._id}
                    >
                      {deletingJobId === job._id ? <Spinner as="span" animation="border" size="sm" /> : 'Delete Job'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No jobs found or data is invalid.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default JobsPosted;