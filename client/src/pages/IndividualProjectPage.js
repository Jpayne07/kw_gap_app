import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import ProjectComponent from "../components/ProjectComponent";

function IndividualProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null); // Initialize with `null` to handle loading state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Track user session

  // Check session on page load
  useEffect(() => {
    fetch('/check_session')
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user)); // Set user session
        } else {
          navigate('/login'); // Redirect to login if not authenticated
        }
      })
      .catch(() => {
        navigate('/login'); // If error occurs, redirect to login
      });
  }, [navigate]);

  // Fetch project data if user is authenticated
  useEffect(() => {
    if (!id) {
      setError("Project ID is undefined.");
      setIsLoading(false);
      return;
    }

    if (!user) {
      return; // Wait for user session to be checked
    }

    fetch(`/projects/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch project with ID ${id}`);
        }
        return response.json();
      })
      .then((data) => {
        setProject(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id, user]); // Add `user` to the dependency array to trigger after session check

  if (isLoading) {
    return <div>Loading project...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>No project found.</div>;
  }

  return (
    <main>
      <Nav user={user} setUser={setUser}/>
      <ProjectComponent projectID={id} project={project} />
    </main>
  );
}

export default IndividualProjectPage;
