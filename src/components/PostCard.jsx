import {useHistory} from 'react-router-dom'

function PostCard ({id, title, content, link, username}) {
    const history = useHistory()
    const handleClick = () => history.push(`/posts/${id}`)

    return (
        <div>
            <p><strong>{username}</strong></p>
            <h2>{title}</h2>
            
            <p>{content}</p>
        </div>
    )
}

export default PostCard;