import { useState } from "react";

function CreatePost ({allPosts, setAllPosts, user}) {
    console.log("createPost",user)
    const [formData, setFormData] = useState({
        title: "",
        link: "",
        media_type: "null",
        content: "",
        user_id: user.id
    })
    const [errors, setErrors] = useState([])
    // console.log(window.localStorage.getItem("currentUserId"))
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setFormData("")
        console.log(formData)
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
            if(newPost.id) {
                setAllPosts([newPost, ...allPosts])
                setFormData({
                    title: "",
                    link: "",
                    media_type: "null",
                    content: "",
                    user_id: user.id
                })
                setErrors([])
            } else {
                setErrors(newPost)
            }
        })
    }
    console.log(handleSubmit)

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>Title: </label><br/>
            <input type="text" name="title" onChange={handleChange}/><br/>
            <label>Post Type: </label><br/>
            <select name="media_type" onChange={handleChange}>
                <option value="video">Video</option>
                <option value="image">Image</option>
                <option value="text">Text</option>
            </select><br/>
            <label>Link: </label>
            <textarea 
            type="text" 
            name="link" 
            value={formData.link}
            onChange={handleChange}
            />
            <br/>
            <label>Content: </label>
            <textarea 
            name="content"
            value={formData.content}
            onChange={handleChange}
            />
            <br/>
            <input type="submit"/>
        </form>
        </div>
    );
}

export default CreatePost;