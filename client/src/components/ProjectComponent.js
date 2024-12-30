import React, {useEffect, useState} from "react";
import ProjectKeywords from "./ProjectKeywords";
import AddKeywords from "./AddKeywords";
import AddCollaborators from "./AddCollaborators";
import { useNavigate } from 'react-router-dom';
import AddProject from "./AddProject";


function ProjectComponent({projectID}){
const navigate = useNavigate()
const [projects, setProjects] = useState([]);
const [projectKeywords, setProjectKeywords] = useState([])
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
        projectID?fetch(`/projects/${projectID}`).then((r) => r.json()):fetch('/projects').then((r) => r.json()),
          fetch('/project_collaborators').then((r) => r.json()),
          fetch('/user').then((r) => r.json())
        ]);
        setProjects(projectsData);
        setProjectKeywords(projectsData.keywords);
        setUsers(usersData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);
  console.log(projects.keywords)
   //starts with ternary to validate singular vs multiple project page
    return (
        projectID ? <div>
            <ProjectKeywords keywords={projectKeywords} />
            <AddCollaborators
            projectCollaborators={projects.collaborators} 
            id = {projects.id} 
            users = {users} />
            <AddKeywords />
        </div>
        : 
        <div>
            {projects.map(project => (
                <div key={project.id}>
                <h3 onClick={() => handleClick(project.id)}>{project.brand_name}</h3>
                <ProjectKeywords keywords={project.keywords} />
                </div>
            ))}
            <AddProject />
            </div>
    
    )
}

export default ProjectComponent