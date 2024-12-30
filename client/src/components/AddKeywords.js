import React, { useState } from "react";
//found in projectComponents
function FileUpload({ keywords, setProjectKeywords, projectID }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle the file upload when the button is clicked
  const handleFileUpload = () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    if (isUploading) {
      setMessage("File is already uploading...");
      return;
    }

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);
    if (projectID) {
      console.log('test');
      formData.append("project_id", projectID);
      
      // Log the formData contents using forEach
      formData.forEach((value, key) => {
        console.log(key, value);
      });
    }
    // Set uploading state to true
    setIsUploading(true);

    // Send the file to the backend using fetch
    fetch("/keyword_upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(`Error: ${data.error}`);
        } else {
          setProjectKeywords([...keywords, data.keyword]);
          setMessage("File uploaded successfully!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("An error occurred during file upload.");
      })
      .finally(() => {
        setIsUploading(false); // Reset uploading state when done
      });
  };

  return (
    <div>
      <h1>Add Keywords</h1>

      {/* File Input */}
      <input
        type="file"
        id="fileInput"
        accept=".csv"
        onChange={handleFileChange}
        disabled={isUploading} // Disable input during upload
      />

      {/* Upload Button */}
      <button onClick={handleFileUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload CSV"}
      </button>

      {/* Message */}
      <div id="message">{message}</div>
    </div>
  );
}

export default FileUpload;
