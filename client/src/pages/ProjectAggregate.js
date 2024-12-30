import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ProjectComponent from "../components/ProjectComponent";
import Nav from "../components/Nav";  // Assuming you have a Nav component

function ProjectAggregate() {
  const navigate = useNavigate();

  // Session check effect
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
    }, [navigate]);  // Dependency on navigate to ensure it runs once when the component mounts

  return (
    <main>
      <Nav user={user} setUser={setUser} />
      <h1>Your Projects</h1>
      <ProjectComponent />
    </main>
  );
}

export default ProjectAggregate;
