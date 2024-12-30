import React, { useEffect, useState } from "react";
import ProjectKeywords from "./ProjectKeywords";
import AddCollaborators from "./AddCollaborators";
import { useNavigate } from "react-router-dom";
import AddProject from "./AddProject";
import "./ProjectComponent.css";
import AddKeywords from "./AddKeywords";

function ProjectComponent({ projectID }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [projectKeywords, setProjectKeywords] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //handling click to other project
  const handleClick = (id) => navigate(`/projects/${id}`);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [projectsData, usersData] = await Promise.all([
          projectID
            ? fetch(`/projects/${projectID}`).then((r) => r.json())
            : fetch("/projects").then((r) => r.json()),
          fetch("/user").then((r) => r.json()),
        ]);

        if (projectID) {
          setProjects(projectsData); // Single project object
          setProjectKeywords(projectsData.keywords || []); // Handle missing keywords
        } else {
          setProjects(projectsData); // Array of projects
        }
        setUsers(usersData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [projectID]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return projectID ? (
    <div className="project-card">
      
      <h2>{projects.brand_name}</h2>
      <ProjectKeywords
        keywords={projectKeywords}
        setProjectKeywords={setProjectKeywords}
      />
      <AddKeywords
                keywords = {projectKeywords}
                setProjectKeywords = {setProjectKeywords}
                projectID = {projectID}/>
        <br></br>
      <AddCollaborators
        projectCollaborators={projects.collaborators}
        id={projects.id}
        users={users}
      />
    </div>
  ) : (
    <div className="projects-list">
  
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          <h3 onClick={() => handleClick(project.id)}>{project.brand_name}</h3>
          <ProjectKeywords
            keywords={project.keywords || []}
            setProjectKeywords={(updatedKeywords) =>
              setProjects((prevProjects) =>
                prevProjects.map((p) =>
                  p.id === project.id
                    ? { ...p, keywords: updatedKeywords }
                    : p
                )
              )
            }
          />
        </div>
      ))}
      <AddProject />
    </div>
  );
}

export default ProjectComponent;
