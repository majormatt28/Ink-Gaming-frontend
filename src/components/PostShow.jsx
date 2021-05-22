import PostCard from "./PostCard"
import CommentDetail from './CommentDetail'
import CommentForm from './CommentForm'
import { useEffect, useState } from "react";
import { useParams } from "react-router";



function PostShow () {
    const [postData, setPostData] = useState([])
    // const [comments, setComments] = useState([])
    // let { id } = useParams()
    
    let { id } = useParams()

    useEffect (() => {
        fetch(`http://localhost:3001/posts/${id}`)
        .then(r => r.json())
        .then(data => {
            setPostData([data])
        })
    }, [id])

    // let commentCards
    // const commentsSorted = [...comments].sort((a,b) => b.id-a.id)
    // commentCards = commentsSorted.map(comment => <CommentDetail {...comment} key = {comment.id}/>)

    const postCards = postData.map(post => {
        return (
            <PostCard
            key={post.id}
            {...post}
            />
        );
    })

    return (
        <div>
        <div> 
        {postCards}
        </div>
        <div>
        {/* <h3>Comments</h3>
        <CommentForm setComments = {setComments} comments = {comments} postID = {id}/> */}
        </div>
        </div>
    );
}

export default PostShow;