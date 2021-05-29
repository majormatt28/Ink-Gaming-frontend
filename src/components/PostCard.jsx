import { useState } from 'react'
import {Link} from 'react-router-dom'
import {YoutubePlayer} from "reactjs-media"

function PostCard ({ id, postTitle, postContent, postLink, user, postMediaType, removePost, postUser, postLikes, likesCounted}) {
    console.log("user", user)
    const [currentLikes, setCurrentLikes] = useState(postLikes)
    const [currentLikeCount, setCurrentLikeCount] = useState(likesCounted)
    

    let mediaContent 

    if (postMediaType === "image") {
        mediaContent = <div><img src={postLink} alt={postTitle}/></div>
    }
    else if (postMediaType === "video") {
        mediaContent = 
        <div>
            <YoutubePlayer
                src={postLink} // Reqiured
                width={650}
                height={600}
            />
        </div>   
        // <div dangerouslySetInnerHTML={{__html: postLink}}></div>
    }
    
    function handleDelete(e) {
        e.preventDefault()
        fetch(`http://localhost:3001/posts/${id}`, {
            method: 'DELETE'
        })
        removePost(id)
    }

    function handleLike(e) {
        fetch('http://localhost:3001/likes', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({post_id: id, user_id: user.id})
        })
        .then(resp => resp.json())
        .then(data => setCurrentLikes([...currentLikes, data]))
        setCurrentLikeCount(currentLikeCount => currentLikeCount + 1)

    }

    function handleDislike(e) {
        const targetLikeId = currentLikes.find(like => like.user.id === postUser)
        console.log("PostCard User",user)
        fetch(`http://localhost:3001/likes/${targetLikeId}`, {
            method: "DELETE"
        })
        
    }

    return (
        <div className="post-card">
            <div>
                <button onClick={handleLike}>like</button>
                <button onClick={handleDislike}>dislike</button>
                <p>Likes:</p>
                <p>{currentLikeCount}</p>
            </div>
            <div>
                <Link to={`/posts/${id}/edit`}><button>Edit</button></Link>
                <button onClick={handleDelete}>Delete</button>
            </div>
        <div>
            <p><strong>Post by: {postUser.username}</strong></p>
            <Link to={`/posts/${id}`}><h2>{postTitle}</h2></Link>
        </div>
        {mediaContent}
        <p>{postContent}</p>
        </div>
    )
}

export default PostCard;