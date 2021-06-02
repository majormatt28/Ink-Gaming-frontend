import { useState } from "react";
// import { Link } from "react-router-dom";

function CommentDetail ({comment, user, commentUserId, commentUser, commentRemoved, id}) {
    const [text, setText] = useState(comment)
    const [editComment, setEditComment] = useState(false)
    // const token = localStorage.getItem("token")
    console.log("username", commentUser)

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
            <p>Comment by: {commentUser.username} </p>
            {!editComment ? (
                <p>{text}</p>
                
            ) : (
                <form onSubmit={handleSubmit}>
                    <textarea name="comment" value= {text} onChange={handleChange}></textarea>
                    <input type="submit"/>
                </form>
            )}
            <div>
                {commentUserId === user.id ? (
                    <>
                    <button onClick ={handleDelete}>Delete</button>
                    <button onClick ={handleClick}>Edit</button>
                    </>
                ): null}
            </div>
        </div>
    );
}

export default CommentDetail;