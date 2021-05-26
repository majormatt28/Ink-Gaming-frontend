import {Link} from 'react-router-dom'

function PostCard ({ id, postTitle, postContent, postLink, user, postMediaType, removePost, postUser}) {
    console.log("user", user)
    let mediaContent 

    if (postMediaType === "image") {
        mediaContent = <div><img src={postLink} alt={postTitle}/></div>
    }
    else if (postMediaType === "video") {
        mediaContent = <div dangerouslySetInnerHTML={{__html: postLink}}></div>
    }
    
    function handleDelete(e) {
        e.preventDefault()
        fetch(`http://localhost:3001/posts/${id}`, {
            method: 'DELETE'
        })
        removePost(id)
    }

    return (
        <div className="post-card">
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