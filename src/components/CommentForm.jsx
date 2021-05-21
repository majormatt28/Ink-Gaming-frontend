import { useState } from "react";

function CommentForm () {
    const [comment, setComment] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setComment("")

        
    }

    return (
        <div>
            <h2>Leave a comment here:</h2>
            <form>
                <label htmlFor="comment">Comment: </label>
                <input 

                />
            </form>
        </div>
    );
}

export default CommentForm;