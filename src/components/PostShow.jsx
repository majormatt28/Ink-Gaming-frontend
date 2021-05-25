import PostCard from "./PostCard"
import CommentDetail from './CommentDetail'
import CommentForm from './CommentForm'
import { useEffect, useState } from "react";
import { useParams } from "react-router";



function PostShow ({removePost, currentUser}) {
    const [postData, setPostData] = useState([])
    const [comments, setComments] = useState([])
    const [errors, setErrors] = useState("")
    let { id } = useParams()

    useEffect (() => {
        fetch(`http://localhost:3001/posts/${id}`)
        .then(r => r.json())
        .then(data => {
            if (data.error) {
                setErrors(data.error)
            } else {
            setPostData([data])
            setComments(data.comments)
            }
        })
    }, [id])

    function commentRemoved(id) {
        const filterComments = comments.filter(comment => comment.id !== id)
        setComments(filterComments)
    }

    let commentCards
    const sortedComments = [...comments].sort((a,b) => b.id-a.id)
    commentCards = sortedComments.map( comment => <CommentDetail currentUser={currentUser} {...comment} key={comment.id} commentRemoved={commentRemoved}/>)

    const postCards = postData.map(post => {
        return (
            <PostCard
            currentUser={currentUser}
            key={post.id}
            removePost={removePost}
            {...post}
            />
        );
    })

    return (
        <>
        {errors ? <div><h1>{errors}</h1></div> :
        <div>
        <div> 
        {postCards}
        </div>
        <div>
            <h3>Comment Section:</h3>
            <CommentForm currentUser={currentUser} comments={comments} setComments={setComments} postId={id}/>
            <div>{commentCards}</div>
        </div>
        </div>}
        </>
    );
}

export default PostShow;