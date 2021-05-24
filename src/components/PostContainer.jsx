import PostCard from './PostCard'
import CreatePost from './CreatePost'
import { useEffect, useState } from 'react';
// import { useParams } from 'react-router';


function PostContainer ({currentUser}) {
    const [allPosts, setAllPosts] = useState([])
    console.log(currentUser)

    console.log(allPosts)

    useEffect(() => {
        fetch(`http://localhost:3001/posts`)
        .then(r => r.json())
        .then(setAllPosts)
    }, [])

    

    const postCards = allPosts.map(post => {
        console.log(post)
        return (
            <PostCard 
            key={post.id}
            {...post}
            />
        )
    })

    return (
        <>
        <div>
            <CreatePost allPosts={allPosts} setAllPosts={setAllPosts} currentUser={currentUser}/>
        </div>
        <div className="post-cards-container">
            {postCards}
        </div>

        </>
    );
}

export default PostContainer;