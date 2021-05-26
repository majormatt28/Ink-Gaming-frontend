import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';


function UpdatePostForm ({removePost, currentUser, allPosts, setAllPosts}) {
    // let history =useHistory()
    const { id } = useParams()
  
    const [formData, setFormData] = useState({
        title: "",
        link: "",
        media_type: "null",
        content: "",
        user_id: currentUser.id
    })

    useEffect(() => {
        fetch(`http://localhost:3001/posts/${id}`)
        .then(resp => resp.json())
        .then(data => {
            setFormData(data)
        })
    }, [id])

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function updateAllPosts(id, updatedPost) {
        const index = allPosts.find(post => post.id === id)
        const updatedPosts = [...allPosts]
        updatedPosts.splice(index, 1, updatedPost)
        setAllPosts(updatedPosts)
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3001/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(postUpdate => {
            updateAllPosts(id,postUpdate)
            // console.log(postUpdate)
        })
    }

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

export default UpdatePostForm;