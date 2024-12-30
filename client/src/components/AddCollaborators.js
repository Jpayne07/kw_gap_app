import React, { useEffect, useState } from "react";
function AddCollaborators({projectCollaborators, id, users}) {
    const [usernameFilter, setUsernameFilter] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");
    const [role, setRole] =  useState([])
    const handleRole = ['Owner','Viewer','Editor']
    
  const handleSubmit = async () => {
    try {
      const existingIds = projectCollaborators.map(collab => collab.user_id);
      console.log(users)
      const handleOptions = users.filter(collaborator => !existingIds.includes(collaborator.id));
      
      setUsernameFilter(handleOptions);
      setShowOptions(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  async function handleCollaboratorAddition() {
    try {
      // Await the fetch call to ensure the request completes
      const response = await fetch("/project_collaborators", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: id, // Assuming `id` is the project ID passed as a prop
          user_id: users.filter(user => user.username === selectedUser)[0].id,
          role: role // Assuming `role` is defined somewhere in your component
        }),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Await the response to be converted to JSON
      const data = await response.json();
      console.log("User added successfully:", data);
  
      // Optional: Update state or trigger a re-render if needed
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }
  const handleAddUser = () => {
    if (selectedUser) {
      console.log(`Adding user: ${selectedUser}`);
      handleCollaboratorAddition()
    } else {
      console.log("No user selected");
    }
  };

  const RenderOptions = () => (
    <div>
      <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
        <option value="" disabled>
          Select a user
        </option>
        {usernameFilter.map(user => (
          <option key={user.username} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="" disabled>
          Select a role
        </option>
        {handleRole.map(role => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <button onClick={handleAddUser}>Add User</button>
      
    </div>
  );

  useEffect(() => {
    // console.log("Filtered usernames:", usernameFilter);
  }, [usernameFilter]);

  useEffect(() => {
    if (showOptions) {
    //   console.log("Rendering options:", usernameFilter);
    } else {
    //   console.log("Options not shown");
    }
  }, [showOptions]);

  return (
    <div>
      <h1>Add Collaborators</h1>
      <button onClick={handleSubmit}>Add Collaborators</button>
      {showOptions && <RenderOptions />}
    </div>
  );
}

export default AddCollaborators;
