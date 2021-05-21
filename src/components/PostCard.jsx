import {useHistory} from 'react-router-dom'

function PostCard ({id, title, content, link, username}) {
    const history = useHistory()
    const handleClick = () => history.push(`/posts/${id}`)

    return (
        <div>
            <p><strong>{username}</strong></p>
            <h2>{title}</h2>
            <iframe width="2544" height="1160" src={link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>{content}</p>
        </div>
    )
}

export default PostCard;