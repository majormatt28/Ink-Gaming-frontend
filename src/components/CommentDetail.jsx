import { useState } from "react";
import { Link } from "react-router-dom";

function CommentDetail ({comment, username, user_id, id}) {
    const [text, setText] = useState(comment)
    console.log("username", username)

    function handleChange (e) {
        setText(e.target.value)
    }

    return (
        <div>
            <p>Post by: {username} </p>
            <p>{text}</p>
        </div>
    );
}

export default CommentDetail;