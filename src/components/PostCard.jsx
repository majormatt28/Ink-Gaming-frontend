import { useState } from 'react'
import {Link} from 'react-router-dom'
import {YoutubePlayer} from "reactjs-media"

function PostCard ({ id, postTitle, postContent, postLink, user, postMediaType, removePost, postUser, postLikes, likesCounted}) {
    const [currentLikes, setCurrentLikes] = useState(postLikes)
    const [currentLikeCount, setCurrentLikeCount] = useState(postLikes.length)
    const [isItLiked, setIsItLiked] = useState(isAlreadyLiked())
    console.log("user", user.id)
    console.log(postUser)
    console.log("post_id",id)

    function isAlreadyLiked (){
        if(postLikes.find(like => like.user_id === user.id)){
            return true
        }  else {
            return false
        } 
    }
    
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

    function handleLike() {
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
        setIsItLiked(true)
    }

    console.log("PostCard User",postUser)
    function handleDislike() {
        const targetLikeId = currentLikes.find(like => like.user_id === user.id)
        console.log(targetLikeId)
        fetch(`http://localhost:3001/likes/${targetLikeId.id}`, {
            method: "DELETE"
        })
        setIsItLiked(false)
        setCurrentLikeCount(likeCountCurrent => likeCountCurrent - 1)
        const sortedLikes = currentLikes.filter(like => like.id !== targetLikeId.id)
        setCurrentLikes(sortedLikes)
    }

    return (
        <div className="post-card">
            <div>
                {!isItLiked ? (
                <button onClick={handleLike}>like</button>
                ) : (
                <button onClick={handleDislike}>dislike</button>
                )}
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