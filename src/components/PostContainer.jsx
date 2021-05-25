import PostCard from './PostCard'
import CreatePost from './CreatePost'

// import { useParams } from 'react-router';

function PostContainer ({currentUser, allPosts, setAllPosts, removePost}) {
    console.log(allPosts)
    const postCards = allPosts.map(post => {
        console.log(post)
        return (
            <PostCard
            currentUser={currentUser} 
            key={post.id}
            removePost={removePost}
            {...post}
            />
        )
    })

    return (
        <>
        <div>
            <CreatePost allPosts={allPosts} setAllPosts={setAllPosts} currentUser={currentUser}/>
        </div>
        <div className="post-container">
            {postCards}
        </div>

        </>
    );
}

export default PostContainer;