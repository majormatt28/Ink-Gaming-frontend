import {Link, useHistory} from 'react-router-dom'

function PostCard ({ id, title, content, link, username, mediaType }) {
    const history = useHistory()
    const handleClick = () => history.push(`/posts/${id}`)

    let mediaContent 

    if (mediaType === "image") {
        mediaContent = <div><img src={link} alt={title}/></div>
    }
    else if (mediaType === "video") {
        mediaContent = <div innerHTML={{_html: link}}></div>
    }
    
    console.log(mediaContent)
    console.log(mediaType)

    return (
        <div>
        <div>
            <Link to={`/posts/${id}`}><h2>{title}</h2></Link>
        </div>
        {mediaContent}
        <p>{content}</p>
        </div>
    )
}

export default PostCard;