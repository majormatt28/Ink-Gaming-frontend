import { useState } from "react";

function CommentForm ({comments, postId, setComments, user}) {
    const [formData, setFormData] = useState({
        user_id: user.id,
        post_id: postId,
        comment: ""
    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log({formData})
        fetch(`http://localhost:3001/comments/`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(newComment => {
            console.log({newComment})
            const updatedComments = [...comments, newComment]
            setComments(updatedComments)
        })
    }

    return (
        <div className="new-comments">
            <h2>Leave a comment here:</h2>
            <form onSubmit={handleSubmit} className="comment-form">
                <label htmlFor="comment">Comment: </label>
                <textarea 
                name="comment" 
                value={formData.content}
                onChange={handleChange}
                />
                <input type="submit"/>
            </form>
        </div>
    );
}

export default CommentForm;