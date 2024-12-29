import React, {useEffect, useState} from "react";

import { useNavigate } from 'react-router-dom';
// import TestComponent from "../components/TestComponent";

function ProjectAggregate({user}){
  const navigate = useNavigate()
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //handle the click to view project
  const handleClick = (id) => {
      navigate(`/projects/${id}`); // Navigate to a different route
    };
  //handle the fetch of assets to pass to children
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [projectsData, collaboratorsData, usersData] = await Promise.all([
          fetch('/projects').then((r) => r.json()),
          fetch('/project_collaborators').then((r) => r.json()),
          fetch('/user').then((r) => r.json())
        ]);
        setProjects(projectsData);
        setAllCollaborators(collaboratorsData);
        setUsers(usersData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);
    


    return (
      <div>
          {projects.map((project) => (
              
              <div key={project.id}>
                  <h2 style={{ color: 'blue' }} onClick={() => handleClick(project.id)}>
                  {project.brand_name}
                  </h2>
                  {/* <TestComponent 
                    projectCollaborators={project.collaborators}
                    id = {project.id} 
                    users = {users}/>
                  <ProjectKeywords keywords={project.keywords} /> */}
                  <AddCollaborators projectCollaborators={project.collaborators} 
                  id = {project.id} users = {users} />
                  <AddKeywords />
              </div>
          ))}
      </div>
  );
}

export default ProjectAggregate

