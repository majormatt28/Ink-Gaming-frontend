import PostCard from "./PostCard"
import CommentDetail from './CommentDetail'
import CommentForm from './CommentForm'
import { useEffect, useState } from "react";
import { useParams } from "react-router";



function PostShow () {
    const [postData, setPostData] = useState([])
   
    
    let { id } = useParams()

    useEffect (() => {
        fetch(`http://localhost:3001/posts/${id}`)
        .then(r => r.json())
        .then(data => {
            setPostData([data])
        })
    }, [id])

   

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
        
        </div>
        </div>
    );
}

export default PostShow;