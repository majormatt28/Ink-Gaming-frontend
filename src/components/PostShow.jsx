import PostCard from "./PostCard"
import CommentDetail from './CommentDetail'
import CommentForm from './CommentForm'
import { useEffect, useState } from "react";
import { useParams } from "react-router";



function PostShow ({removePost, user}) {
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
    commentCards = sortedComments.map( comment => <CommentDetail user={user} commentUserId={comment.user_id} commentUser={comment.user} comment={comment.comment} key={comment.id} id={comment.id} commentRemoved={commentRemoved}/>)

    const postCards = postData.map(post => {
        return (
            <PostCard
            user={user}
            key={post.id}
            postUser={post.user}
            id={post.id}
            removePost={removePost}
            postTitle={post.title}
            postContent={post.content}
            postLink={post.link}
            postMediaType={post.media_type}
            postLikes={post.likes}
            />
        );
    })

    return (
        <div className="post-show">
        {errors ? <div><h1>{errors}</h1></div> :
        <div>
        <div> 
        {postCards}
        </div>
        <div className="comment-section">
            <CommentForm user={user} comments={comments} setComments={setComments} postId={id}/>
            <div>{commentCards}</div>
        </div>
        </div>}
        </div>
    );
}

export default PostShow;