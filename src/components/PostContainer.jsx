import PostCard from './PostCard'
import CreatePost from './CreatePost'

// import { useParams } from 'react-router';

function PostContainer ({user, allPosts, setAllPosts, removePost}) {
    console.log(allPosts)
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
            <CreatePost allPosts={allPosts} setAllPosts={setAllPosts} user={user}/>
        </div>
        <div className="post-container">
            {postCards}
        </div>

        </>
    );
}

export default PostContainer;