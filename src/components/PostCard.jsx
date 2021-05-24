import {Link} from 'react-router-dom'

function PostCard ({ id, title, content, link, username, media_type, user_id }) {
    
    console.log(media_type)
    let mediaContent 

    if (media_type === "image") {
        mediaContent = <div><img src={link} alt={title}/></div>
    }
    else if (media_type === "video") {
        mediaContent = <div dangerouslySetInnerHTML={{__html: link}}></div>
    }
    
    console.log(mediaContent)
    console.log(media_type)

    return (
        <div>
        <div>
            <p><Link to ={`/users/${user_id}`}><strong>{username}</strong></Link></p>
            <Link to={`/posts/${id}`}><h2>{title}</h2></Link>
        </div>
        {mediaContent}
        <p>{content}</p>
        </div>
    )
}

export default PostCard;