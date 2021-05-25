import { useState } from "react";
import { Link } from "react-router-dom";

function CommentDetail ({comment, currentUser, commentRemoved, id}) {
    const [text, setText] = useState(comment)
    console.log("username", currentUser)

    function handleChange (e) {
        setText(e.target.value)
    }

    function handleDelete() {
        fetch(`http://localhost:3001/comments/${id}`, {
            method: 'DELETE'
        })
        commentRemoved(id)
    }

    return (
        <div>
            <p>Comment by: {currentUser.username} </p>
            <p>{text}</p>
            <div>
                <button onClick = {handleDelete}>Delete</button>
                <button>Edit</button>
            </div>
        </div>
    );
}

export default CommentDetail;