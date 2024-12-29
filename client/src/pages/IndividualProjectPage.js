import React, { useEffect, useState } from "react";
import ProjectKeywords from "../components/ProjectKeywords";
import AddKeywords from "../components/AddKeywords";
import { useParams } from "react-router-dom";
import HandleAddProject from "../components/AddProject";

function IndividualProjectPage(){
    const { id } = useParams();
    const [project, setProject] = useState(null); // Initialize with `null` to handle loading state
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (!id) {
            setError("Project ID is undefined.");
            setIsLoading(false);
            return;
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
    }, [id]);

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
        <div>
            <h2 style={{ color: "blue" }}>{project.brand_name}</h2>
            <ProjectKeywords keywords={project.keywords} />
            <AddKeywords />
            <HandleAddProject />
        </div>
    );
}

export default IndividualProjectPage;
