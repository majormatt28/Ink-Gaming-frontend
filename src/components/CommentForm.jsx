import { useState } from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button } from "@material-ui/core";

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
            setFormData("")
        })
    }

    return (
        <div className="new-comments">
            <h2>Leave a comment here:</h2>
            <form onSubmit={handleSubmit} className="comment-form">
                {/* <label htmlFor="comment">Comment: </label> */}
                <TextareaAutosize
                name="comment" 
                label="Comment"
                value={formData.content}
                onChange={handleChange}
                rowsMin={3}
                placeholder="What are your thoughts..."
                style={{    
                    height: "166px",
                    margin: "0px",
                    width: "432px",
                }}
                />
                <br/>
                <Button style={{borderRadius: "40px"}} variant="contained" type="submit">Submit</Button>
            </form>
        </div>
    );
}

export default CommentForm;