import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import {YoutubePlayer} from "reactjs-media"
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
// import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { purple } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import { useParams } from 'react-router';
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    body: {
        color: "white",
        fontSize: '17px'
    },
    title: {
        fontSize: "2rem",
        color: "white"
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: purple[500],
    },
    button: {
        margin: theme.spacing(1),
      },
  }));

function PostCard ({ id, postTitle, postContent, postLink, user, postMediaType, removePost, postUser, postLikes}) {
    const [currentLikes, setCurrentLikes] = useState(postLikes)
    const [currentLikeCount, setCurrentLikeCount] = useState(postLikes.length)
    const [isItLiked, setIsItLiked] = useState(isAlreadyLiked())
    const classes = useStyles();
    const history = useHistory()
    // console.log("user", user.id)
    // console.log(postUser)
    // console.log("post_id",id)
    
    function isAlreadyLiked (){
        if(postLikes.find(like => like.user_id === user.id)){
            return true
        }  else {
            return false
        } 
    }
    
    let mediaContent 
    
    if (postMediaType === "image") {
            mediaContent = <div><img src={postLink} alt={postTitle}/></div>
        }
        else if (postMediaType === "video") {
                mediaContent = 
                <div>
                    <YoutubePlayer
                        src={postLink} // Reqiured
                        width={1000}
                        height={600}
                    />
                </div>   
                // <div dangerouslySetInnerHTML={{__html: postLink}}></div>
            }
            
    
    function handleDelete(e) {
        e.preventDefault()
        fetch(`http://localhost:3001/posts/${id}`, {
            method: 'DELETE'
        })
        removePost(id)
    }

    function handleLike() {
        fetch('http://localhost:3001/likes', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({post_id: id, user_id: user.id})
        })
        .then(resp => resp.json())
        .then(data => setCurrentLikes([...currentLikes, data]))
        setCurrentLikeCount(currentLikeCount => currentLikeCount + 1)
        setIsItLiked(true)
    }
    // console.log("PostCard User",postUser)
    function handleDislike() {
        const targetLikeId = currentLikes.find(like => like.user_id === user.id)
        console.log(targetLikeId)
        fetch(`http://localhost:3001/likes/${targetLikeId.id}`, {
            method: "DELETE"
        })
        setIsItLiked(false)
        setCurrentLikeCount(likeCountCurrent => likeCountCurrent - 1)
        const sortedLikes = currentLikes.filter(like => like.id !== targetLikeId.id)
        setCurrentLikes(sortedLikes)
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const seePostShow = () => {
        history.push(`/posts/${id}`) 
    }

    const editPostCard = () => {
        history.push(`/posts/${id}/edit`)
    }


    console.log("Post Card", postLikes)
    return (
        <div className="post-card">
            <div className={classes.title}>
            <CardHeader
            className={classes.title}
            // onClick={seePostShow}
             avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {postUser.username.substring(0,2)}
          </Avatar>
        }
        action={
            <div>
          <IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="primary">
            <MoreVertIcon />
          </IconButton>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem variant="contained" color="default" className={classes.button} onClick={editPostCard}>Edit</MenuItem>
          <MenuItem variant="contained" color="secondary" className={classes.button} startIcon={<DeleteIcon  />} onClick={handleDelete}>Delete</MenuItem>
        </Menu>
        </div>
        }
      />
      <div className="post-title" onClick={seePostShow}>
        {postTitle}
      </div>
        <br/>
        <div className="post-by">
        Post by: {postUser.username}
        </div>
        <div className="media-content">
        {mediaContent}
        </div>
        <CardContent>
        <Typography className={classes.body} variant="body2" color="textSecondary" component="p">
        {postContent}
        </Typography>
      </CardContent>
        </div>
        <CardActions disableSpacing>
        <IconButton aria-label="Likes">
        {!isItLiked ? (
                    <FavoriteIcon variant="contained" color="primary" onClick={handleLike}/>
                ) : (
                    <FavoriteIcon onClick={handleDislike} color="secondary"/>
                )}
                    <p>{currentLikeCount}</p>
        </IconButton>
        </CardActions>
        </div>
    )
}

export default PostCard;