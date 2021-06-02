import PostCard from './PostCard'
import CreatePost from './CreatePost'
import { useState } from 'react'
import React from 'react';
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

function PostContainer ({user, allPosts, setAllPosts, removePost}) {
    // console.log(allPosts)
    // const [form, setForm] = useState(false)
    const [open, setOpen] = useState(false)

    // function toggleForm () {
    //     setForm(true)
    // }
    const handleOpen = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }
    const classes = useStyles()

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
        <div className="outside-post-card">
            <button onClick={handleOpen} className="toggle-post-btn">Create a Post</button>
            <Modal
                    aria-labelledby="add-more-clothing"
                    aria-describedby="addtl-clothing-form"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 500, }}>
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">Post Creation</h2>
                            <CreatePost allPosts={allPosts} setAllPosts={setAllPosts} user={user} onClose={handleClose} />
                        </div>
                    </Fade>
                </Modal>
            {/* <CreatePost allPosts={allPosts} setAllPosts={setAllPosts} user={user} setForm={setForm}/> */}
        </div>
        <div className="post-container">
            {postCards}
        </div>

        </>
    );
}

export default PostContainer;