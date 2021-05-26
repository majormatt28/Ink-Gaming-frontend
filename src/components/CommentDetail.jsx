import { useState } from "react";
import { Link } from "react-router-dom";

function CommentDetail ({comment, currentUser, commentRemoved, id}) {
    const [text, setText] = useState(comment)
    const [editComment, setEditComment] = useState(false)

    console.log("username", currentUser)

    function handleChange (e) {
        setText(e.target.value)
    }

    function handleDelete() {
        fetch(`http://localhost:3001/comments/${id}`, {
            method: 'DELETE'
        })
        setEditComment(false)
        commentRemoved(id)
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3001/comments/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({comment: text})
        })
        setEditComment(false)
    }

    function handleClick() {
        setEditComment(true)
    }

    console.log(handleClick)

    return (
        <div>
            <p>Comment by: {currentUser.username} </p>
            {!editComment ? (
                <p>{text}</p>
                
            ) : (
                <form onSubmit={handleSubmit}>
                    <textarea name="comment" value= {text} onChange={handleChange}></textarea>
                    <input type="submit"/>
                </form>
            )}
            <div>
                <button onClick ={handleDelete}>Delete</button>
                <button onClick ={handleClick}>Edit</button>
            </div>
        </div>
    );
}

export default CommentDetail;