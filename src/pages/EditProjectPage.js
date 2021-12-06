import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate, Navigate } from "react-router";

const API_URL = "http://localhost:5005";

function EditProjectPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { projectId } = useParams();
  const navigate = useNavigate();

   //* This effect will run after the initial render and each time
 //* the project id coming from URL parameter `projectId` changes
 useEffect(() => {   
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects/${projectId}`);
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      } catch (error) {
        console.log(error)
      };
    }

      fetchData();
  }, [projectId]);

  const handleFormSubmit = async (event) => {    
    try {
      event.preventDefault();
      // Create an object representing the body of the PUT request
      const requestBody = { title, description };
 
      // Make a PUT request to update the project
      await axios.put(`${API_URL}/api/projects/${projectId}`, requestBody);
       
      // Once the request is resolved successfully and the project
      // is updated we navigate back to the details page
      navigate(`/projects/${projectId}`);
    } catch (error) { 
        console.log(error)
     }
  };

  const deleteProject = async () => {                       
    try {
      // Make a DELETE request to delete the project
      await axios.delete(`${API_URL}/api/projects/${projectId}`);
       
      // Once the delete request is resolved successfully
      // navigate back to the list of projects.
      navigate("/projects");
    } catch (error) { console.log(error) };
  };
  
  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>
      <button onClick={deleteProject}>Delete Project</button>  
    
    </div>
  );
}

export default EditProjectPage;
