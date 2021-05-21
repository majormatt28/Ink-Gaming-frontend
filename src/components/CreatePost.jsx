import { useState } from "react";

function CreatePost () {
    const [formData, setFormData] = useState({
        title: "",
        link: "",
        media_type: "null",
        content: ""
    })

    function handleSubmit(e) {
        e.preventDefault()
        
        fetch(`http://localhost:3001/posts`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then (r => r.json())
        .then (newPost => {
            setFormData(newPost)
        })
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>Title: </label><br/>
            <input type="text" name="title"/><br/>
            <label>Post Type: </label><br/>
            <select>
                <option value="video">Video</option>
                <option value="image">Image</option>
                <option value="text">Text</option>
            </select><br/>
            <label>Link: </label>
            <input type="text" name="link" /><br/>
            <label>Description: </label>
            <textarea /><br/>
            <input type="submit"/>
        </form>
        </div>
    );
}

export default CreatePost;