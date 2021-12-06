import { useState } from "react";
import axios from "axios";

function AddProject({refreshProjects}) {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const handleTitle = (e) => {setTitle(e.target.value)};
    const handleDescription = (e) => setDescription(e.target.value);

    const handleSubmit = async(event) => {
        try {
            event.preventDefault();
            
            const requestBody = { title, description }; 
            await axios.post('http://localhost:5005/api/projects', requestBody);
    
            setTitle("");
            setDescription("");
            refreshProjects(); // Calls the function from the parent component to refresh the list    
        } catch (error) {
            
        }
    };

    return ( 
    <div className="AddProject">
        <h3>Add Project</h3>
        <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input type="text" name="title" value={title} onChange={handleTitle} />

        <label>Description: </label>
        <input type="text" name="description" value={description} onChange={handleDescription} />

        <button type="submit">Submit</button>
        </form>
    </div> );
}

export default AddProject;