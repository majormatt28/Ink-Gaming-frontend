import {Link} from 'react-router-dom'

function PostCard ({ id, title, content, link, currentUser, media_type, removePost}) {
    console.log(media_type)
    let mediaContent 

    if (media_type === "image") {
        mediaContent = <div><img src={link} alt={title}/></div>
    }
    else if (media_type === "video") {
        mediaContent = <div dangerouslySetInnerHTML={{__html: link}}></div>
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
            <p><strong>Post by: {currentUser.username}</strong></p>
            <Link to={`/posts/${id}`}><h2>{title}</h2></Link>
        </div>
        {mediaContent}
        <p>{content}</p>
        </div>
    )
}

export default PostCard;