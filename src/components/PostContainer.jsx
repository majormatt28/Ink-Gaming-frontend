import PostCard from './PostCard'
import CreatePost from './CreatePost'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';


function PostContainer () {
    const [allPosts, setAllPosts] = useState([])


    // console.log(allPosts)

    useEffect(() => {
        fetch(`http://localhost:3001/posts`)
        .then(r => r.json())
        .then(setAllPosts)
    }, [])

    

    const postCards = allPosts.map(post => {
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
            <CreatePost />
        </div>
        <div className="post-cards-container">
            {postCards}
        </div>

        </>
    );
}

export default PostContainer;