import React, { useState } from "react";
//found in projectComponents
function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

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

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);

    // Send the file to the Flask backend using fetch
    fetch("/keyword_upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(`Error: ${data.error}`);
        } else {
          setMessage("File uploaded successfully!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("An error occurred during file upload.");
      });
  };

  return (
    <div>
      <h1>Upload CSV</h1>

      {/* File Input */}
      <input
        type="file"
        id="fileInput"
        accept=".csv"
        onChange={handleFileChange}
      />

      {/* Upload Button */}
      <button onClick={handleFileUpload}>Upload CSV</button>

      {/* Message */}
      <div id="message">{message}</div>
    </div>
  );
}

export default FileUpload;