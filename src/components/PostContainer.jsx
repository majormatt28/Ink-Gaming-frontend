import PostCard from './PostCard'
import CreatePost from './CreatePost'
import { useState } from 'react'

// import { useParams } from 'react-router';

function PostContainer ({user, allPosts, setAllPosts, removePost}) {
    // console.log(allPosts)
    const [form, setForm] = useState(false)

    function toggleForm () {
        setForm(form => !form)
    }

    const postCards = allPosts.map(post => {
        console.log(post)
        return (
            <PostCard
            user={user} 
            key={post.id}
            postUser={post.user}
            id={post.id}
            postTitle={post.title}
            postContent={post.content}
            postLink={post.link}
            postMediaType={post.media_type}
            removePost={removePost}
            postLikes={post.likes}
            />
        )
    })

    return (
        <>
        <div>
            {form ? (
                <>
            <CreatePost allPosts={allPosts} setAllPosts={setAllPosts} user={user}/>
            <button onClick={toggleForm}>Undo</button>
            </>
            ) : (
                <button onClick={toggleForm}>Creat a Post</button>
            )}
        </div>
        <div className="post-container">
            {postCards}
        </div>

        </>
    );
}

export default PostContainer;